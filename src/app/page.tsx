import About from "@/components/about";
import Education from "@/components/education";
import Experience from "@/components/experience";
import Hero from "@/components/hero";
import Projects from "@/components/projects";
import Stack from "@/components/stack";
import ScrollReveal from "@/components/scroll-reveal";
import ContactForm from "@/components/contact-form";
import BlogCard from "@/components/blog-card";
import { db } from "@/lib/firebase";
import TransitionLink from "@/components/transition-link";
import Navbar from "@/components/navbar";

export const dynamic = "force-dynamic";

async function getLatestPosts() {
	try {
		const snapshot = await db
			.collection("blogs")
			.where("published", "==", true)
			.orderBy("createdAt", "desc")
			.limit(3)
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

export default async function Home() {
	const latestPosts = await getLatestPosts();

	return (
		<div className="pt-4 font-mono">
			<div className="relative grid grid-cols-[1fr_50vw_1fr] grid-rows-[repeat(60,1px_auto_1px_auto)] min-h-fit [--pattern-fg:var(--theme-pattern)]">
				<div className="sticky top-0 z-50 col-start-2 row-start-2 row-span-full h-fit w-[50vw] pointer-events-none">
					<div className="pointer-events-auto">
						<Navbar />
					</div>
				</div>
				<div className="relative -bottom-px col-span-full col-start-1 row-start-1 h-px bg-(--pattern-fg)"></div>
				{/* <div className="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div> */}
				<div className="col-start-2 max-h-[500px] row-start-4 aspect-2/1 select-none sm:aspect-3/1 flex items-center justify-center text-foreground bg-[radial-gradient(var(--pattern-fg)_1px,transparent_0)] bg-size-[16px_16px] bg-center border border-border">
					<div className="text-xl font-bold uppercase tracking-wider">Ruchiket100</div>
				</div>
				<div className="relative -bottom-px col-span-full row-start-5  h-px bg-(--pattern-fg)"></div>
				<Hero className="col-start-2 row-start-6" />
				<div className="relative -bottom-px col-span-full row-start-8 h-px bg-(--pattern-fg)"></div>

				{/* slash effect */}
				<div className="col-span-full h-8 row-start-8 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
				<div className="relative -bottom-px col-span-full row-start-9 h-px bg-(--pattern-fg)"></div>

				<div id="about" className="col-start-2 row-start-10 text-3xl font-sans font-bold px-3">
					About
				</div>
				<div className="relative -bottom-px col-span-full row-start-11 h-px bg-(--pattern-fg)"></div>
				<ScrollReveal className="col-start-2 row-start-12">
					<About />
				</ScrollReveal>
				<div className="relative -bottom-px col-span-full row-start-13 h-px bg-(--pattern-fg)"></div>
				<div className="col-span-full h-8 row-start-14 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
				<div className="relative -bottom-px col-span-full row-start-15 h-px bg-(--pattern-fg)"></div>
				<div className="col-start-2 row-start-16 text-3xl font-sans font-bold px-3">
					Stack
				</div>
				<div className="relative -bottom-px col-span-full row-start-17 h-px bg-(--pattern-fg)"></div>
				<ScrollReveal className="col-start-2 row-start-18">
					<Stack />
				</ScrollReveal>
				<div className="relative -bottom-px col-span-full row-start-19 h-px bg-(--pattern-fg)"></div>
				<div className="col-span-full h-8 row-start-20 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
				<div className="relative -top-px col-span-full row-start-21 h-px bg-(--pattern-fg)"></div>

				<div className="col-start-2 row-start-22 text-3xl font-sans font-bold px-3">
					Experience
				</div>
				<div className="relative -top-px col-span-full row-start-23 h-px bg-(--pattern-fg)"></div>
				<ScrollReveal className="col-start-2 row-start-24">
					<Experience />
				</ScrollReveal>
				<div className="relative -top-px col-span-full row-start-25 h-px bg-(--pattern-fg)"></div>

				{/* <div className="relative -bottom-px col-span-full row-start- h-px bg-(--pattern-fg)"></div> */}
				<div className="col-span-full h-8 row-start-26 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
				<div className="relative -top-px col-span-full row-start-27 h-px bg-(--pattern-fg)"></div>

				<div id="projects" className="col-start-2 row-start-28 text-3xl font-sans font-bold px-3">
					Projects
				</div>
				<div className="relative -top-px col-span-full row-start-29 h-px bg-(--pattern-fg)"></div>
				<ScrollReveal className="col-start-2 row-start-30">
					<Projects />
				</ScrollReveal>
				<div className="relative -top-px col-span-full row-start-31 h-px bg-(--pattern-fg)"></div>
				<div className="col-span-full h-8 row-start-32 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
				<div className="relative -top-px col-span-full row-start-33 h-px bg-(--pattern-fg)"></div>

				<div className="col-start-2 row-start-34 text-3xl font-sans font-bold px-3">
					Education
				</div>
				<div className="relative -top-px col-span-full row-start-35 h-px bg-(--pattern-fg)"></div>
				<ScrollReveal className="col-start-2 row-start-36">
					<Education />
				</ScrollReveal>

				<div className="relative -top-px col-span-full row-start-37 h-px bg-(--pattern-fg)"></div>
				<div className="col-span-full h-8 row-start-38 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
				<div className="relative -top-px col-span-full row-start-39 h-px bg-(--pattern-fg)"></div>

				{/* Latest Blog Posts */}
				<div className="col-start-2 row-start-40 text-3xl font-sans font-bold px-3">
					Latest Posts
				</div>
				<div className="relative -top-px col-span-full row-start-41 h-px bg-(--pattern-fg)"></div>
				<ScrollReveal className="col-start-2 row-start-42">
					<div className="p-4 flex flex-col gap-4">
						{latestPosts.length > 0 ? (
							<>
								{latestPosts.map((post) => (
									<BlogCard key={post.slug} {...post} />
								))}
								<TransitionLink
									href="/blog"
									className="text-sm text-center py-2 border border-gray-300 hover:border-gray-900 hover:bg-gray-50 transition-all block"
								>
									View all posts →
								</TransitionLink>
							</>
						) : (
							<p className="text-sm text-gray-500 py-4 text-center">
								Blog posts coming soon...
							</p>
						)}
					</div>
				</ScrollReveal>

				<div className="relative -top-px col-span-full row-start-43 h-px bg-(--pattern-fg)"></div>
				<div className="col-span-full h-8 row-start-44 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
				<div className="relative -top-px col-span-full row-start-45 h-px bg-(--pattern-fg)"></div>

				{/* Contact Section */}
				<div id="contact" className="col-start-2 row-start-46 text-3xl font-sans font-bold px-3">
					Contact
				</div>
				<div className="relative -top-px col-span-full row-start-47 h-px bg-(--pattern-fg)"></div>
				<ScrollReveal className="col-start-2 row-start-48">
					<ContactForm />
				</ScrollReveal>

				<div className="relative -top-px col-span-full row-start-49 h-px bg-(--pattern-fg)"></div>
				<div className="col-span-full h-8 row-start-50 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
				<div className="relative -top-px col-span-full row-start-51 h-px bg-(--pattern-fg)"></div>

				{/* Footer */}
				<div className="col-start-2 row-start-52 flex flex-col text-center">
					<p className="text-xs border-b border-dashed border-gray-300 p-4">
						Inspired by tailwindcss.com &amp; ui.shadcn.com &amp; chanhdai
					</p>
					<p className="text-xs font-medium p-4">
						Built by ruchiket. The source code is available on
						GitHub.
					</p>
				</div>
				<div className="relative -top-px col-span-full row-start-53 h-px bg-(--pattern-fg)"></div>

				{/* external borders */}
				<div className="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg) pointer-events-none"></div>
				<div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[size:10px_10px] bg-fixed pointer-events-none"></div>

				<div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed pointer-events-none"></div>

				{/* <div className="relative -bottom-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div> */}
			</div>
		</div>
	);
}
