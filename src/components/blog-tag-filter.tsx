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
				className={`text-xs px-3 py-1 border transition-colors duration-200 ${
					activeTag === null
						? "bg-gray-900 text-white border-gray-900"
						: "border-gray-300 hover:border-gray-900"
				}`}
			>
				All
			</button>
			{tags.map((tag) => (
				<button
					key={tag}
					onClick={() => onTagSelect(activeTag === tag ? null : tag)}
					className={`text-xs px-3 py-1 border transition-colors duration-200 ${
						activeTag === tag
							? "bg-gray-900 text-white border-gray-900"
							: "border-gray-300 hover:border-gray-900"
					}`}
				>
					{tag}
				</button>
			))}
		</div>
	);
}
