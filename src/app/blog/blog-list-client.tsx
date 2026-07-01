"use client";

import { useState } from "react";
import BlogCard from "@/components/blog-card";
import BlogSearch from "@/components/blog-search";
import BlogTagFilter from "@/components/blog-tag-filter";

interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	tags: string[];
	views: number;
	readingTime: number;
	createdAt: string | null;
}

interface BlogListClientProps {
	posts: BlogPost[];
	allTags: string[];
}

export default function BlogListClient({
	posts,
	allTags,
}: BlogListClientProps) {
	const [searchQuery, setSearchQuery] = useState("");
	const [activeTag, setActiveTag] = useState<string | null>(null);

	const filtered = posts.filter((post) => {
		const matchesSearch =
			searchQuery === "" ||
			post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.tags.some((t) =>
				t.toLowerCase().includes(searchQuery.toLowerCase())
			);

		const matchesTag =
			activeTag === null || post.tags.includes(activeTag);

		return matchesSearch && matchesTag;
	});

	return (
		<div>
			{/* Search & Filter */}
			<div className="px-4 py-4 flex flex-col gap-4 border-b border-dashed border-gray-300">
				<BlogSearch onSearch={setSearchQuery} />
				<BlogTagFilter
					tags={allTags}
					activeTag={activeTag}
					onTagSelect={setActiveTag}
				/>
			</div>

			{/* Posts */}
			<div className="p-4 flex flex-col gap-4">
				{filtered.length === 0 ? (
					<div className="text-center py-12 text-sm text-gray-500">
						<p>No posts found.</p>
						{(searchQuery || activeTag) && (
							<button
								onClick={() => {
									setSearchQuery("");
									setActiveTag(null);
								}}
								className="mt-2 underline underline-offset-4 hover:text-black"
							>
								Clear filters
							</button>
						)}
					</div>
				) : (
					filtered.map((post) => (
						<BlogCard key={post.slug} {...post} />
					))
				)}
			</div>

			{/* Post count */}
			<div className="px-4 py-3 text-xs text-gray-500 border-t border-dashed border-gray-300">
				{filtered.length} of {posts.length} posts
			</div>
		</div>
	);
}
