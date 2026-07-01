import TransitionLink from "./transition-link";

interface BlogCardProps {
	slug: string;
	title: string;
	excerpt: string;
	tags: string[];
	readingTime: number;
	views: number;
	createdAt: string | null;
}

export default function BlogCard({
	slug,
	title,
	excerpt,
	tags,
	readingTime,
	views,
	createdAt,
}: BlogCardProps) {
	const date = createdAt
		? new Date(createdAt).toLocaleDateString("en-US", {
				year: "numeric",
				month: "short",
				day: "numeric",
			})
		: "";

	return (
		<TransitionLink href={`/blog/${slug}`} className="group block">
			<article className="border border-gray-300 hover:border-gray-900 transition-all duration-200 group-hover:-translate-y-0.5">
				<div className="p-4 flex flex-col gap-3">
					<div className="flex items-center gap-3 text-xs text-gray-500">
						{date && <time>{date}</time>}
						{date && readingTime && (
							<span className="w-px h-3 bg-gray-300" />
						)}
						<span>{readingTime} min read</span>
						<span className="w-px h-3 bg-gray-300" />
						<span>{views} views</span>
					</div>

					<h3 className="text-lg font-sans font-semibold group-hover:underline underline-offset-4 decoration-1">
						{title}
					</h3>

					<p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
						{excerpt}
					</p>

					<div className="flex gap-2 flex-wrap pt-1">
						{tags.map((tag) => (
							<span
								key={tag}
								className="border border-gray-300 text-xs px-2 py-0.5"
							>
								{tag}
							</span>
						))}
					</div>
				</div>
			</article>
		</TransitionLink>
	);
}
