import { db } from "@/lib/firebase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import TransitionLink from "@/components/transition-link";
import MarkdownRenderer from "@/components/markdown-renderer";
import TableOfContents from "@/components/table-of-contents";
import BlogInteractions from "@/components/blog-interactions";
import { FieldValue } from "firebase-admin/firestore";

interface BlogPostData {
	title: string;
	excerpt: string;
	content: string;
	tags: string[];
	views: number;
	likes: number;
	readingTime: number;
	createdAt: string | null;
	updatedAt: string | null;
}

interface AdjacentPost {
	slug: string;
	title: string;
}

async function getBlogPost(slug: string): Promise<BlogPostData | null> {
	try {
		const doc = await db.collection("blogs").doc(slug).get();
		if (!doc.exists) return null;

		// Increment views
		await db
			.collection("blogs")
			.doc(slug)
			.update({ views: FieldValue.increment(1) });

		const data = doc.data()!;
		return {
			title: data.title,
			excerpt: data.excerpt,
			content: data.content,
			tags: data.tags || [],
			views: (data.views || 0) + 1,
			likes: data.likes || 0,
			readingTime: data.readingTime || 3,
			createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
			updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
		};
	} catch {
		return null;
	}
}

async function getAdjacentPosts(
	currentSlug: string
): Promise<{ prev: AdjacentPost | null; next: AdjacentPost | null }> {
	try {
		const snapshot = await db
			.collection("blogs")
			.where("published", "==", true)
			.orderBy("createdAt", "desc")
			.get();

		const slugs = snapshot.docs.map((d) => ({
			slug: d.id,
			title: d.data().title,
		}));
		const idx = slugs.findIndex((s) => s.slug === currentSlug);

		return {
			prev: idx > 0 ? slugs[idx - 1] : null,
			next: idx < slugs.length - 1 ? slugs[idx + 1] : null,
		};
	} catch {
		return { prev: null, next: null };
	}
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const post = await getBlogPost(slug);
	if (!post) return { title: "Post Not Found" };

	return {
		title: `${post.title} — Ruchiket Borse`,
		description: post.excerpt,
	};
}

export default async function BlogPostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await getBlogPost(slug);

	if (!post) notFound();

	const { prev, next } = await getAdjacentPosts(slug);

	const date = post.createdAt
		? new Date(post.createdAt).toLocaleDateString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			})
		: "";

	return (
		<div className="pt-4 font-mono">
			<div className="relative grid grid-cols-[1fr_50vw_1fr] min-h-screen [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-gray-950)]/10">
				<div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) pointer-events-none"></div>

				<div className="col-start-2 row-start-1">
					{/* Header */}
					<nav className="flex items-center justify-between px-4 py-3 border-b border-b-(--pattern-fg)">
						<TransitionLink
							href="/blog"
							className="text-sm font-medium hover:underline underline-offset-4"
						>
							← All Posts
						</TransitionLink>
					</nav>

					{/* Post Header */}
					<header className="px-4 py-8 border-b border-dashed border-gray-300">
						<div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
							{date && <time>{date}</time>}
							<span className="w-px h-3 bg-gray-300" />
							<span>{post.readingTime} min read</span>
							<span className="w-px h-3 bg-gray-300" />
							<span>{post.views} views</span>
						</div>
						<h1 className="text-3xl font-sans font-bold leading-tight">
							{post.title}
						</h1>
						<p className="text-sm text-gray-500 mt-3 leading-relaxed">
							{post.excerpt}
						</p>
						<div className="flex gap-2 flex-wrap mt-4">
							{post.tags.map((tag) => (
								<Link
									key={tag}
									href={`/blog?tag=${tag}`}
									className="border border-gray-300 text-xs px-2 py-0.5 hover:border-gray-900 transition-colors"
								>
									{tag}
								</Link>
							))}
						</div>
					</header>

					{/* Content + TOC */}
					<div className="flex">
						<div className="flex-1 min-w-0">
							<article className="px-4 py-8">
								<MarkdownRenderer content={post.content} />
							</article>
							<BlogInteractions slug={slug} initialLikes={post.likes} />
						</div>

						{/* Sticky TOC sidebar */}
						<aside className="hidden lg:block w-56 shrink-0 border-l border-dashed border-gray-300">
							<div className="sticky top-4 p-4">
								<TableOfContents content={post.content} />
							</div>
						</aside>
					</div>

					{/* Prev/Next navigation */}
					<div className="border-t border-t-(--pattern-fg) grid grid-cols-2">
						{prev ? (
							<Link
								href={`/blog/${prev.slug}`}
								className="p-4 hover:bg-gray-50 transition-colors border-r border-dashed border-gray-300"
							>
								<span className="text-xs text-gray-500">
									← Previous
								</span>
								<p className="text-sm font-medium mt-1 line-clamp-1">
									{prev.title}
								</p>
							</Link>
						) : (
							<div />
						)}
						{next ? (
							<Link
								href={`/blog/${next.slug}`}
								className="p-4 hover:bg-gray-50 transition-colors text-right"
							>
								<span className="text-xs text-gray-500">
									Next →
								</span>
								<p className="text-sm font-medium mt-1 line-clamp-1">
									{next.title}
								</p>
							</Link>
						) : (
							<div />
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
