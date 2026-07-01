import { db } from "@/lib/firebase";
import type { Metadata } from "next";
import Link from "next/link";
import BlogListClient from "./blog-list-client";

export const metadata: Metadata = {
	title: "Blog — Ruchiket Borse",
	description:
		"Thoughts on React, TypeScript, web development, and building products. Written by Ruchiket Borse.",
};

interface BlogPost {
	slug: string;
	title: string;
	excerpt: string;
	tags: string[];
	views: number;
	readingTime: number;
	createdAt: string | null;
}

async function getBlogPosts(): Promise<BlogPost[]> {
	try {
		const snapshot = await db
			.collection("blogs")
			.where("published", "==", true)
			.orderBy("createdAt", "desc")
			.get();

		return snapshot.docs.map((doc) => {
			const data = doc.data();
			return {
				slug: doc.id,
				title: data.title,
				excerpt: data.excerpt,
				tags: data.tags || [],
				views: data.views || 0,
				readingTime: data.readingTime || 3,
				createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
			};
		});
	} catch {
		return [];
	}
}

export default async function BlogPage() {
	const posts = await getBlogPosts();

	// Collect all unique tags
	const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

	return (
		<div className="pt-4 font-mono">
			<div className="relative grid grid-cols-[1fr_50vw_1fr] min-h-screen [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-gray-950)]/10">
				<div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) pointer-events-none"></div>

				<div className="col-start-2 row-start-1">
					{/* Header */}
					<nav className="flex items-center justify-between px-4 py-3 border-b border-b-(--pattern-fg)">
						<Link
							href="/"
							className="text-sm font-medium hover:underline underline-offset-4"
						>
							← Back
						</Link>
						<span className="text-sm font-medium">Blog</span>
					</nav>

					{/* Title */}
					<div className="px-4 py-8 border-b border-dashed border-gray-300">
						<h1 className="text-3xl font-sans font-bold">Blog</h1>
						<p className="text-sm text-gray-500 mt-2">
							Thoughts on React, TypeScript, and building for the
							web.
						</p>
					</div>

					{/* Client-side interactive list */}
					<BlogListClient posts={posts} allTags={allTags} />
				</div>
			</div>
		</div>
	);
}
