import type { Metadata } from "next";
import {
	IBM_Plex_Mono,
	IBM_Plex_Sans,
} from "next/font/google";
import "./globals.css";

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
		<html lang="en" className="scroll-smooth">
			<body
				className={`${IBMMono.variable} ${interSans.variable} antialiased`}
			>
				{children}
			</body>
		</html>
	);
}
