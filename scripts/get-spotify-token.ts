import readline from "readline";

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

if (!client_id || !client_secret) {
	console.error(
		"Error: Please set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET in your environment or .env.local before running this script."
	);
	console.log("\nUsage:\nSPOTIFY_CLIENT_ID=xxx SPOTIFY_CLIENT_SECRET=yyy npx tsx scripts/get-spotify-token.ts");
	process.exit(1);
}

const REDIRECT_URI = "http://localhost:3000";
const scope = "user-read-currently-playing";

const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(
	REDIRECT_URI
)}&scope=${scope}`;

console.log("\n=== Spotify Refresh Token Generator ===");
console.log("\n1. Open the following URL in your web browser:\n");
console.log(authUrl);
console.log("\n2. Log in to Spotify (if prompted) and authorize the application.");
console.log("3. You will be redirected to http://localhost:3000 (it will show a page load error, which is expected).");
console.log("4. Copy the entire redirect URL from the browser's address bar (containing 'code=...').");

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

rl.question("\nPaste the redirect URL or the 'code' parameter here: ", async (urlOrCode) => {
	rl.close();
	let code = urlOrCode.trim();
	if (code.includes("code=")) {
		try {
			const urlObj = new URL(code);
			code = urlObj.searchParams.get("code") || code;
		} catch {
			// fallback if it's not a full valid URL format but contains code=
			const match = code.match(/code=([^&]+)/);
			if (match) code = match[1];
		}
	}

	if (!code) {
		console.error("Invalid URL or code parameter.");
		process.exit(1);
	}

	const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

	try {
		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				Authorization: `Basic ${basic}`,
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: new URLSearchParams({
				grant_type: "authorization_code",
				code,
				redirect_uri: REDIRECT_URI,
			}),
		});

		if (!response.ok) {
			const errText = await response.text();
			throw new Error(`Failed to request token: ${response.statusText} - ${errText}`);
		}

		const data = await response.json();
		console.log("\n=== Success! ===");
		console.log("\nAdd the following line to your .env.local file:\n");
		console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);
		console.log("\n================\n");
	} catch (err: any) {
		console.error("\nError retrieving refresh token:", err.message);
	}
});
