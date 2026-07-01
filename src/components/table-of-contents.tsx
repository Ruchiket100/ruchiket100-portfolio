"use client";

import { useEffect, useMemo, useState } from "react";

interface TocItem {
	id: string;
	text: string;
	level: number;
}

interface TableOfContentsProps {
	content: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
	const [activeId, setActiveId] = useState<string>("");

	// Extract headings from markdown - memoized to avoid re-computation
	const headings: TocItem[] = useMemo(() => {
		const result: TocItem[] = [];
		const lines = content.split("\n");
		for (const line of lines) {
			const match = line.match(/^(#{1,3})\s+(.+)$/);
			if (match) {
				const level = match[1].length;
				const text = match[2].replace(/[`*_~]/g, "");
				const id = text
					.toLowerCase()
					.replace(/[^a-z0-9\s-]/g, "")
					.replace(/\s+/g, "-");
				result.push({ id, text, level });
			}
		}
		return result;
	}, [content]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{ rootMargin: "-80px 0px -80% 0px" }
		);

		for (const heading of headings) {
			const el = document.getElementById(heading.id);
			if (el) observer.observe(el);
		}

		return () => observer.disconnect();
	}, [headings]);

	if (headings.length === 0) return null;

	return (
		<nav className="border border-gray-300 p-4">
			<h4 className="text-xs font-semibold uppercase tracking-wider mb-3 text-gray-500">
				On this page
			</h4>
			<ul className="flex flex-col gap-1.5">
				{headings.map((heading) => (
					<li
						key={heading.id}
						style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}
					>
						<a
							href={`#${heading.id}`}
							className={`block text-xs py-0.5 transition-colors duration-200 hover:text-black ${
								activeId === heading.id
									? "text-black font-medium"
									: "text-gray-500"
							}`}
						>
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
