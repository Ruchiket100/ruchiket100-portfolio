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
import Link from "next/link";
import TransitionLink from "@/components/transition-link";

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
			<div className="relative grid grid-cols-[1fr_50vw_1fr] grid-rows-[repeat(60,1px_auto_1px_auto)] min-h-fit [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-gray-950)]/10">
				<div className="relative w-[50vw] col-start-2 row-start-2">
					<nav className="flex items-center justify-end gap-4  px-4 py-3 ">
						<ul className="flex gap-4 items-center font-medium text-sm">
							<li>
								<a href="#about" className="hover:underline underline-offset-4">About</a>
							</li>
							<li>
								<a href="#projects" className="hover:underline underline-offset-4">Projects</a>
							</li>
							<li>
								<TransitionLink href="/blog" className="hover:underline underline-offset-4">Blog</TransitionLink>
							</li>
							<li>
								<a href="#contact" className="hover:underline underline-offset-4">Contact</a>
							</li>
						</ul>
						<div className="flex items-center gap-4">
							<button className="p-1 border text-gray-500 border-gray-300">
								<svg
									width="20px"
									height="20px"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
									color="currentColor"
								>
									<path
										d="M3 22L3 2"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M21 22V2"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M15 16H9C7.89543 16 7 15.1046 7 14V10C7 8.89543 7.89543 8 9 8H15C16.1046 8 17 8.89543 17 10V14C17 15.1046 16.1046 16 15 16Z"
										stroke="currentColor"
										strokeWidth="1.5"
									></path>
								</svg>
							</button>
							<a href="https://github.com/Ruchiket100" target="_blank" rel="noopener noreferrer" className="p-1 border text-gray-500 border-gray-300">
								<svg
									width="20px"
									height="20px"
									strokeWidth="1.5"
									viewBox="0 0 24 24"
									fill="white"
									xmlns="http://www.w3.org/2000/svg"
									color="currentColor"
								>
									<path
										d="M16 22.0268V19.1568C16.0375 18.68 15.9731 18.2006 15.811 17.7506C15.6489 17.3006 15.3929 16.8902 15.06 16.5468C18.2 16.1968 21.5 15.0068 21.5 9.54679C21.4997 8.15062 20.9627 6.80799 20 5.79679C20.4558 4.5753 20.4236 3.22514 19.91 2.02679C19.91 2.02679 18.73 1.67679 16 3.50679C13.708 2.88561 11.292 2.88561 8.99999 3.50679C6.26999 1.67679 5.08999 2.02679 5.08999 2.02679C4.57636 3.22514 4.54413 4.5753 4.99999 5.79679C4.03011 6.81549 3.49251 8.17026 3.49999 9.57679C3.49999 14.9968 6.79998 16.1868 9.93998 16.5768C9.61098 16.9168 9.35725 17.3222 9.19529 17.7667C9.03334 18.2112 8.96679 18.6849 8.99999 19.1568V22.0268"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
									<path
										d="M9 20.0267C6 20.9999 3.5 20.0267 2 17.0267"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
								</svg>
							</a>
							<button className="p-1 border text-gray-500 border-gray-300">
								<svg
									width="20px"
									height="20px"
									strokeWidth="1.5"
									viewBox="0 0 24 24"
									fill="white"
									xmlns="http://www.w3.org/2000/svg"
									color="currentColor"
								>
									<path
										d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									></path>
								</svg>
							</button>
						</div>
					</nav>
				</div>
				<div className="relative -bottom-px col-span-full col-start-1 row-start-1 h-px bg-(--pattern-fg)"></div>
				{/* <div className="relative -top-px col-span-full col-start-1 row-start-4 h-px bg-(--pattern-fg)"></div> */}
				<div className="col-start-2 max-h-[500px] row-start-4 aspect-2/1 select-none sm:aspect-3/1 flex items-center justify-center text-black bg-black/0.75 bg-[radial-gradient(var(--pattern-fg)_1px,transparent_0)] bg-size-[16px_16px] bg-center [--pattern-fg:var(--color-zinc-950)]/5 dark:bg-white/0.75 dark:[--pattern-fg:var(--color-zinc-950)]/5">
					<div>Ruchiket100</div>
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
