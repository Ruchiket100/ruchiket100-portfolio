"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import TransitionLink from "./transition-link";
import SpotifyNowPlaying from "./spotify-now-playing";
import { useTheme } from "./theme-provider";

interface NavbarProps {
	isBlogPage?: boolean;
}

export default function Navbar({ isBlogPage = false }: NavbarProps) {
	const pathname = usePathname();
	const [activeSection, setActiveSection] = useState<string>("");
	const [isScrolled, setIsScrolled] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { theme, setTheme, themes } = useTheme();
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsSettingsOpen(false);
			}
		};
		if (isSettingsOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isSettingsOpen]);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

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

		const handleScrollSpy = () => {
			if (window.scrollY < 150) {
				setActiveSection("");
			}
		};
		window.addEventListener("scroll", handleScrollSpy);

		return () => {
			observer.disconnect();
			window.removeEventListener("scroll", handleScrollSpy);
		};
	}, [pathname]);

	const getLinkClassName = (sectionId: string) => {
		const isActive = activeSection === sectionId;
		return `hover:underline underline-offset-4 transition-colors duration-200 ${
			isActive
				? "underline font-bold text-foreground"
				: "text-text-muted hover:text-foreground"
		}`;
	};

	return (
		<nav
			className={`sticky top-0 z-50 flex items-center justify-between gap-4 px-4 py-3 border-b transition-all duration-300 ${
				isScrolled
					? "backdrop-blur-md bg-background/80 border-border/30 shadow-sm"
					: isBlogPage
					? "border-border-dashed"
					: "border-transparent"
			}`}
		>
			<SpotifyNowPlaying />

			<div className="flex items-center gap-4 md:gap-6">
				<ul className="hidden md:flex gap-4 items-center font-medium text-sm">
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
				<div className="flex items-center gap-2 md:gap-4">
					<div className="relative flex items-center" ref={dropdownRef}>
						<button
							onClick={() => setIsSettingsOpen(!isSettingsOpen)}
							className={`p-1 border transition-all duration-150 cursor-pointer flex items-center justify-center ${
								isSettingsOpen
									? "text-accent border-accent bg-accent/10"
									: "text-text-muted border-border hover:text-accent hover:border-accent"
							}`}
							aria-label="Settings"
						>
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
									d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33 1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82 1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>

						{isSettingsOpen && (
							<div className="absolute right-0 top-full mt-2 w-56 rounded-none border border-border bg-background/95 backdrop-blur-md p-3 shadow-lg z-50 animate-[fadeInUp_0.15s_ease-out]">
								<h3 className="text-[10px] font-bold uppercase tracking-wider text-text-muted mb-2 font-mono">
									Preferences
								</h3>
								<div className="flex flex-col gap-2 font-mono text-[11px]">
									<div className="text-[9px] text-text-muted font-bold uppercase mb-1">
										Theme Colors
									</div>
									<div className="flex flex-col gap-1">
										{Object.values(themes).map((t) => (
											<button
												key={t.id}
												onClick={() => setTheme(t.id)}
												className={`flex items-center justify-between p-1 border text-left transition-all duration-150 cursor-pointer ${
													theme === t.id
														? "border-foreground bg-border/10 font-bold"
														: "border-transparent hover:bg-border/5"
												}`}
											>
												<span>{t.name}</span>
												<div className="flex gap-1">
													<span
														className="w-2.5 h-2.5 rounded-full border border-foreground/10"
														style={{ backgroundColor: t.colors.bg }}
														title="Background"
													/>
													<span
														className="w-2.5 h-2.5 rounded-full border border-foreground/10"
														style={{ backgroundColor: t.colors.accent }}
														title="Accent"
													/>
													<span
														className="w-2.5 h-2.5 rounded-full border border-foreground/10"
														style={{ backgroundColor: t.colors.text }}
														title="Text"
													/>
												</div>
											</button>
										))}
									</div>
								</div>
							</div>
						)}
					</div>
					<a
						href="https://github.com/Ruchiket100"
						target="_blank"
						rel="noopener noreferrer"
						className="p-1 border text-text-muted border-border hover:text-foreground hover:border-foreground transition-colors cursor-pointer flex items-center justify-center"
					>
						<svg
							width="20px"
							height="20px"
							strokeWidth="1.5"
							viewBox="0 0 24 24"
							fill="none"
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
					<button
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						className="flex md:hidden p-1 border border-border text-text-muted hover:text-foreground hover:border-foreground transition-all duration-150 cursor-pointer items-center justify-center"
						aria-label="Toggle Menu"
					>
						{isMobileMenuOpen ? (
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
								<line x1="18" y1="6" x2="6" y2="18"></line>
								<line x1="6" y1="6" x2="18" y2="18"></line>
							</svg>
						) : (
							<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
								<line x1="3" y1="12" x2="21" y2="12"></line>
								<line x1="3" y1="6" x2="21" y2="6"></line>
								<line x1="3" y1="18" x2="21" y2="18"></line>
							</svg>
						)}
					</button>
				</div>
			</div>

			{isMobileMenuOpen && (
				<div className="absolute left-0 right-0 top-full border-b border-border bg-background/95 backdrop-blur-md p-4 shadow-md z-40 flex flex-col gap-3 animate-[fadeInUp_0.15s_ease-out] md:hidden">
					<ul className="flex flex-col gap-3 font-mono text-sm">
						<li>
							<a
								href={isBlogPage ? "/#about" : "#about"}
								className={getLinkClassName("about")}
								onClick={() => setIsMobileMenuOpen(false)}
							>
								About
							</a>
						</li>
						<li>
							<a
								href={isBlogPage ? "/#projects" : "#projects"}
								className={getLinkClassName("projects")}
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Projects
							</a>
						</li>
						<li>
							<TransitionLink
								href="/blog"
								className={getLinkClassName("blog")}
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Blog
							</TransitionLink>
						</li>
						<li>
							<a
								href={isBlogPage ? "/#contact" : "#contact"}
								className={getLinkClassName("contact")}
								onClick={() => setIsMobileMenuOpen(false)}
							>
								Contact
							</a>
						</li>
					</ul>
				</div>
			)}
		</nav>
	);
}
