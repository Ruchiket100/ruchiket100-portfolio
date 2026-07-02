"use client";

interface BlogTagFilterProps {
	tags: string[];
	activeTag: string | null;
	onTagSelect: (tag: string | null) => void;
}

export default function BlogTagFilter({
	tags,
	activeTag,
	onTagSelect,
}: BlogTagFilterProps) {
	return (
		<div className="flex gap-2 flex-wrap">
			<button
				onClick={() => onTagSelect(null)}
				className={`text-xs px-3 py-1 border transition-colors duration-200 cursor-pointer ${
					activeTag === null
						? "bg-foreground text-background border-foreground"
						: "border-border hover:border-foreground"
				}`}
			>
				All
			</button>
			{tags.map((tag) => (
				<button
					key={tag}
					onClick={() => onTagSelect(activeTag === tag ? null : tag)}
					className={`text-xs px-3 py-1 border transition-colors duration-200 cursor-pointer ${
						activeTag === tag
							? "bg-foreground text-background border-foreground"
							: "border-border hover:border-foreground"
					}`}
				>
					{tag}
				</button>
			))}
		</div>
	);
}
