const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

async function getAccessToken() {
	if (!client_id || !client_secret || !refresh_token) {
		throw new Error("Missing Spotify credentials");
	}

	const response = await fetch(TOKEN_ENDPOINT, {
		method: "POST",
		headers: {
			Authorization: `Basic ${basic}`,
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			grant_type: "refresh_token",
			refresh_token,
		}),
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error(`Failed to get Spotify access token: ${response.statusText}`);
	}

	return response.json();
}

export async function getNowPlayingData() {
	if (!client_id || !client_secret || !refresh_token) {
		return null; // Return null so route can fall back to mock data
	}

	try {
		const { access_token } = await getAccessToken();

		const response = await fetch(NOW_PLAYING_ENDPOINT, {
			headers: {
				Authorization: `Bearer ${access_token}`,
			},
			cache: "no-store",
		});

		if (response.status === 204 || response.status > 400) {
			return { isPlaying: false };
		}

		const song = await response.json();
		return song;
	} catch (error) {
		console.error("Error in getNowPlayingData:", error);
		return { isPlaying: false };
	}
}
