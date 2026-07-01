"use client";

import { useEffect, useState } from "react";

interface SongData {
	isPlaying: boolean;
	title?: string;
	artist?: string;
	albumImageUrl?: string;
	songUrl?: string;
	isMock?: boolean;
}

export default function SpotifyNowPlaying() {
	const [song, setSong] = useState<SongData>({ isPlaying: false });
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchNowPlaying() {
			try {
				const res = await fetch("/api/spotify/now-playing");
				if (res.ok) {
					const data = await res.json();
					setSong(data);
				}
			} catch (error) {
				console.error("Error fetching Spotify data:", error);
			} finally {
				setLoading(false);
			}
		}

		fetchNowPlaying();

		// Refresh status every 30 seconds
		const interval = setInterval(fetchNowPlaying, 30000);
		return () => clearInterval(interval);
	}, []);

	if (loading) {
		return (
			<div className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono border border-gray-300 dark:border-zinc-700 bg-white/50 dark:bg-black/50 backdrop-blur-[1px] select-none text-gray-500 w-fit">
				<div className="w-3 h-3 border border-current border-t-transparent animate-spin"></div>
				<span className="hidden sm:inline">Connecting Spotify...</span>
			</div>
		);
	}

	if (!song.isPlaying) {
		return (
			<div className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono border border-gray-300 dark:border-zinc-700 bg-white/50 dark:bg-black/50 backdrop-blur-[1px] select-none text-gray-500 w-fit">
				{/* Spotify Icon */}
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="text-gray-400"
				>
					<path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-.982-.336.076-.67-.135-.746-.47-.077-.337.135-.67.472-.747 3.847-.877 7.143-.5 9.815 1.135.295.18.387.563.206.857zm1.226-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.076-1.183-.412.125-.85-.107-.975-.52-.125-.41.108-.85.52-.975 3.664-1.11 8.232-.573 11.344 1.343.368.226.488.707.26 1.075zm.107-2.82c-.27.443-.85.588-1.294.317-3.118-1.854-8.27-2.024-11.272-1.112-.5.15-1.025-.13-1.177-.63-.15-.5.13-1.026.63-1.178 3.567-1.082 9.243-.888 12.8 1.226.44.262.585.842.313 1.288z" />
				</svg>
				<span className="hidden sm:inline">Offline</span>
			</div>
		);
	}

	return (
		<a
			href={song.songUrl || "#"}
			target="_blank"
			rel="noopener noreferrer"
			className="group flex items-center gap-2.5 px-2.5 py-1.5 text-xs font-mono border border-gray-300 dark:border-zinc-700 bg-white/70 dark:bg-black/70 backdrop-blur-[1px] hover:border-black dark:hover:border-white transition-all select-none w-fit max-w-[200px] sm:max-w-xs cursor-pointer"
		>
			<style>{`
				@keyframes eq-bar-1 { 0%, 100% { transform: scaleY(0.2); } 50% { transform: scaleY(1); } }
				@keyframes eq-bar-2 { 0%, 100% { transform: scaleY(0.4); } 50% { transform: scaleY(1.2); } }
				@keyframes eq-bar-3 { 0%, 100% { transform: scaleY(0.1); } 50% { transform: scaleY(0.9); } }
				.eq-bar { transform-origin: bottom; }
				.eq-bar-1 { animation: eq-bar-1 0.8s ease-in-out infinite; }
				.eq-bar-2 { animation: eq-bar-2 0.6s ease-in-out infinite; }
				.eq-bar-3 { animation: eq-bar-3 0.7s ease-in-out infinite; }
			`}</style>

			{/* Album Art Cover */}
			<div className="relative w-5 h-5 shrink-0 overflow-hidden border border-gray-200 dark:border-zinc-800">
				{song.albumImageUrl ? (
					<img
						src={song.albumImageUrl}
						alt={song.title}
						className="w-full h-full object-cover animate-[spin_10s_linear_infinite]"
					/>
				) : (
					<div className="w-full h-full bg-gray-200 dark:bg-zinc-800"></div>
				)}
			</div>

			{/* Song Metadata */}
			<div className="flex flex-col min-w-0">
				<span className="font-semibold text-black dark:text-white truncate max-w-[90px] sm:max-w-[140px] group-hover:underline">
					{song.title}
				</span>
				<span className="text-[10px] text-gray-500 truncate max-w-[90px] sm:max-w-[140px]">
					{song.artist}
				</span>
			</div>

			{/* Live Equalizer Animation */}
			<div className="flex items-end gap-[2px] h-3 w-3 shrink-0 text-emerald-500">
				<span
					className="eq-bar eq-bar-1 w-[2px] h-3 bg-current"
					style={{ animationDelay: "0.1s" }}
				/>
				<span
					className="eq-bar eq-bar-2 w-[2px] h-3 bg-current"
					style={{ animationDelay: "0.3s" }}
				/>
				<span
					className="eq-bar eq-bar-3 w-[2px] h-3 bg-current"
					style={{ animationDelay: "0s" }}
				/>
			</div>

			{/* Mock Label (Optional, shown in corner or skipped) */}
			{song.isMock && (
				<span className="absolute -top-2.5 -right-1 text-[8px] bg-gray-100 dark:bg-zinc-800 text-gray-400 px-1 border border-gray-300 dark:border-zinc-700 pointer-events-none uppercase scale-90">
					Demo
				</span>
			)}
		</a>
	);
}
