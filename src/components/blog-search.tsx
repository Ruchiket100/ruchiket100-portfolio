"use client";

import { useState } from "react";

interface BlogSearchProps {
	onSearch: (query: string) => void;
}

export default function BlogSearch({ onSearch }: BlogSearchProps) {
	const [query, setQuery] = useState("");

	function handleChange(value: string) {
		setQuery(value);
		onSearch(value);
	}

	return (
		<div className="relative">
			<svg
				className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
				width="16"
				height="16"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			>
				<circle cx="11" cy="11" r="8" />
				<path d="M21 21l-4.35-4.35" />
			</svg>
			<input
				type="text"
				value={query}
				onChange={(e) => handleChange(e.target.value)}
				placeholder="Search posts..."
				className="w-full border border-border pl-10 pr-4 py-2 text-sm font-mono bg-background focus:outline-none focus:border-foreground transition-colors"
			/>
		</div>
	);
}
