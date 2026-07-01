"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "./transition-link";
import SpotifyNowPlaying from "./spotify-now-playing";

interface NavbarProps {
	isBlogPage?: boolean;
}

export default function Navbar({ isBlogPage = false }: NavbarProps) {
	const pathname = usePathname();
	const [activeSection, setActiveSection] = useState<string>("");

	useEffect(() => {
		if (pathname.startsWith("/blog")) {
			setActiveSection("blog");
			return;
		}

		if (pathname !== "/") {
			setActiveSection("");
			return;
		}

		const sections = ["about", "projects", "contact"];
		const sectionElements = sections.map((id) => document.getElementById(id));

		const observerOptions = {
			root: null,
			rootMargin: "-25% 0px -55% 0px",
			threshold: 0,
		};

		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setActiveSection(entry.target.id);
				}
			});
		}, observerOptions);

		sectionElements.forEach((el) => {
			if (el) observer.observe(el);
		});

		const handleScroll = () => {
			if (window.scrollY < 150) {
				setActiveSection("");
			}
		};
		window.addEventListener("scroll", handleScroll);

		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", handleScroll);
		};
	}, [pathname]);

	const getLinkClassName = (sectionId: string) => {
		const isActive = activeSection === sectionId;
		return `hover:underline underline-offset-4 transition-colors duration-200 ${
			isActive
				? "underline font-bold text-black dark:text-white"
				: "text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
		}`;
	};

	return (
		<nav
			className={`flex items-center justify-between gap-4 px-4 py-3 ${
				isBlogPage ? "border-b border-b-(--pattern-fg)" : ""
			}`}
		>
			<SpotifyNowPlaying />

			<div className="flex items-center gap-6">
				<ul className="flex gap-4 items-center font-medium text-sm">
					<li>
						<a
							href={isBlogPage ? "/#about" : "#about"}
							className={getLinkClassName("about")}
						>
							About
						</a>
					</li>
					<li>
						<a
							href={isBlogPage ? "/#projects" : "#projects"}
							className={getLinkClassName("projects")}
						>
							Projects
						</a>
					</li>
					<li>
						<TransitionLink
							href="/blog"
							className={getLinkClassName("blog")}
						>
							Blog
						</TransitionLink>
					</li>
					<li>
						<a
							href={isBlogPage ? "/#contact" : "#contact"}
							className={getLinkClassName("contact")}
						>
							Contact
						</a>
					</li>
				</ul>
				<div className="flex items-center gap-4">
					<button className="p-1 border text-gray-500 border-gray-300 cursor-pointer">
						<svg
							width="20px"
							height="20px"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							color="currentColor"
						>
							<path
								d="M3 22L3 2"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
							<path
								d="M21 22V2"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
							<path
								d="M15 16H9C7.89543 16 7 15.1046 7 14V10C7 8.89543 7.89543 8 9 8H15C16.1046 8 17 8.89543 17 10V14C17 15.1046 16.1046 16 15 16Z"
								stroke="currentColor"
								strokeWidth="1.5"
							></path>
						</svg>
					</button>
					<a
						href="https://github.com/Ruchiket100"
						target="_blank"
						rel="noopener noreferrer"
						className="p-1 border text-gray-500 border-gray-300 cursor-pointer"
					>
						<svg
							width="20px"
							height="20px"
							strokeWidth="1.5"
							viewBox="0 0 24 24"
							fill="white"
							xmlns="http://www.w3.org/2000/svg"
							color="currentColor"
						>
							<path
								d="M16 22.0268V19.1568C16.0375 18.68 15.9731 18.2006 15.811 17.7506C15.6489 17.3006 15.3929 16.8902 15.06 16.5468C18.2 16.1968 21.5 15.0068 21.5 9.54679C21.4997 8.15062 20.9627 6.80799 20 5.79679C20.4558 4.5753 20.4236 3.22514 19.91 2.02679C19.91 2.02679 18.73 1.67679 16 3.50679C13.708 2.88561 11.292 2.88561 8.99999 3.50679C6.26999 1.67679 5.08999 2.02679 5.08999 2.02679C4.57636 3.22514 4.54413 4.5753 4.99999 5.79679C4.03011 6.81549 3.49251 8.17026 3.49999 9.57679C3.49999 14.9968 6.79998 16.1868 9.93998 16.5768C9.61098 16.9168 9.35725 17.3222 9.19529 17.7667C9.03334 18.2112 8.96679 18.6849 8.99999 19.1568V22.0268"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
							<path
								d="M9 20.0267C6 20.9999 3.5 20.0267 2 17.0267"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</svg>
					</a>
					<button className="p-1 border text-gray-500 border-gray-300 cursor-pointer">
						<svg
							width="20px"
							height="20px"
							strokeWidth="1.5"
							viewBox="0 0 24 24"
							fill="white"
							xmlns="http://www.w3.org/2000/svg"
							color="currentColor"
						>
							<path
								d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z"
								stroke="currentColor"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							></path>
						</svg>
					</button>
				</div>
			</div>
		</nav>
	);
}
