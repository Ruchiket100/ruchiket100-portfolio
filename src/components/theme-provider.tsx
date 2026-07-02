"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import themesData from "../config/themes.json";

export type ThemeId = "light" | "dark" | "solarized-dark" | "solarized-light" | "hacker-dark";

interface ThemeColorConfig {
	bg: string;
	text: string;
	textMuted: string;
	border: string;
	borderDashed: string;
	pattern: string;
	accent: string;
}

interface ThemeConfig {
	id: ThemeId;
	name: string;
	colors: ThemeColorConfig;
}

interface ThemeContextType {
	theme: ThemeId;
	setTheme: (theme: ThemeId) => void;
	themes: Record<ThemeId, ThemeConfig>;
}

const themes = themesData as Record<ThemeId, ThemeConfig>;

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setThemeState] = useState<ThemeId>("light");

	// Sync theme on mount
	useEffect(() => {
		let savedTheme = localStorage.getItem("portfolio-theme") as ThemeId;
		if ((savedTheme as string) === "hacker") {
			savedTheme = "hacker-dark";
		}
		if (savedTheme && themes[savedTheme]) {
			setThemeState(savedTheme);
		} else {
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			setThemeState(prefersDark ? "dark" : "light");
		}
	}, []);

	// Apply theme CSS variables & class names
	useEffect(() => {
		localStorage.setItem("portfolio-theme", theme);

		const themeConfig = themes[theme];
		if (themeConfig) {
			// 1. Set CSS custom properties on document root
			Object.entries(themeConfig.colors).forEach(([key, val]) => {
				const cssKey = `--theme-${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
				document.documentElement.style.setProperty(cssKey, val);
			});

			// 2. Manage dark mode class for Tailwind compatibility
			if (theme === "dark" || theme === "hacker-dark" || theme === "solarized-dark") {
				document.documentElement.classList.add("dark");
			} else {
				document.documentElement.classList.remove("dark");
			}

			// 3. Manage theme-specific class
			Object.keys(themes).forEach((t) => {
				document.documentElement.classList.remove(`theme-${t}`);
			});
			document.documentElement.classList.add(`theme-${theme}`);
		}
	}, [theme]);

	const setTheme = (newTheme: ThemeId) => {
		if (themes[newTheme]) {
			setThemeState(newTheme);
		}
	};

	return (
		<ThemeContext.Provider value={{ theme, setTheme, themes }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider");
	}
	return context;
}
export { themesData };
