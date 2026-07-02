import type { Metadata } from "next";
import {
	IBM_Plex_Mono,
	IBM_Plex_Sans,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const interSans = IBM_Plex_Sans({
	variable: "--font-inter-sans",
	subsets: ["latin"],
});

const IBMMono = IBM_Plex_Mono({
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
	title: "Ruchiket Borse — React Developer",
	description:
		"Full stack developer and designer. Building elegant software solutions and captivating user interfaces with React, Next.js, and TypeScript.",
	openGraph: {
		title: "Ruchiket Borse — React Developer",
		description:
			"Full stack developer and designer. Building elegant software solutions and captivating user interfaces.",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="scroll-smooth" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: `
							(function() {
								try {
									var saved = localStorage.getItem('portfolio-theme');
									var themes = {
										"light": { "colors": { "bg": "#ffffff", "text": "#000000", "textMuted": "#71717a", "border": "#d4d4d8", "borderDashed": "#d4d4d8", "pattern": "rgba(9, 9, 11, 0.04)", "accent": "#1db954" } },
										"dark": { "colors": { "bg": "#09090b", "text": "#f4f4f5", "textMuted": "#a1a1aa", "border": "#3f3f46", "borderDashed": "#3f3f46", "pattern": "rgba(244, 244, 245, 0.05)", "accent": "#1db954" } },
										"solarized-dark": { "colors": { "bg": "#002b36", "text": "#839496", "textMuted": "#586e75", "border": "#0a4c5e", "borderDashed": "#0a4c5e", "pattern": "rgba(4, 52, 65, 0.2)", "accent": "#268bd2" } },
										"solarized-light": { "colors": { "bg": "#fdf6e3", "text": "#586e75", "textMuted": "#93a1a1", "border": "#eee8d5", "borderDashed": "#eee8d5", "pattern": "rgba(147, 161, 161, 0.15)", "accent": "#268bd2" } },
										"hacker-dark": { "colors": { "bg": "#000000", "text": "#39ff14", "textMuted": "#00aa00", "border": "#007700", "borderDashed": "#007700", "pattern": "rgba(0, 255, 0, 0.07)", "accent": "#39ff14" } }
									};
									var theme = saved;
									if (!theme || !themes[theme]) {
										var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
										theme = prefersDark ? 'dark' : 'light';
									}
									document.documentElement.classList.add('theme-' + theme);
									if (theme === 'dark' || theme === 'hacker-dark' || theme === 'solarized-dark') {
										document.documentElement.classList.add('dark');
									} else {
										document.documentElement.classList.remove('dark');
									}
									var colors = themes[theme].colors;
									for (var key in colors) {
										if (colors.hasOwnProperty(key)) {
											var cssKey = '--theme-' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
											document.documentElement.style.setProperty(cssKey, colors[key]);
										}
									}
								} catch (e) {}
							})();
						`,
					}}
				/>
			</head>
			<body
				className={`${IBMMono.variable} ${interSans.variable} antialiased`}
			>
				<ThemeProvider>
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
