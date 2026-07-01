import { getNowPlayingData } from "@/lib/spotify";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
	try {
		const song = await getNowPlayingData();

		// Graceful fallback if credentials are not configured
		if (song === null) {
			return NextResponse.json({
				isPlaying: true,
				title: "Starboy",
				artist: "The Weeknd",
				albumImageUrl: "https://i.scdn.co/image/ab67616d0000b2734718dec409e5877cbb226725",
				songUrl: "https://open.spotify.com/track/7MXVkk50yNN5yR458ZKWcc",
				isMock: true,
			});
		}

		if (!song || !song.item) {
			return NextResponse.json({ isPlaying: false });
		}

		const isPlaying = song.is_playing;
		const title = song.item.name;
		const artist = song.item.artists.map((_artist: { name: string }) => _artist.name).join(", ");
		const albumImageUrl = song.item.album.images[0].url;
		const songUrl = song.item.external_urls.spotify;

		return NextResponse.json(
			{
				isPlaying,
				title,
				artist,
				albumImageUrl,
				songUrl,
			},
			{
				headers: {
					"Cache-Control": "public, s-maxage=1, stale-while-revalidate=9",
				},
			}
		);
	} catch (error) {
		console.error("Error in Spotify GET:", error);
		// Graceful fallback on API error
		return NextResponse.json({ isPlaying: false });
	}
}
