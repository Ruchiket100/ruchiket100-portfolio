import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const serviceAccount: ServiceAccount = {
	projectId: process.env.FIREBASE_PROJECT_ID,
	clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
	privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);

async function seed() {
	console.log("🌱 Seeding Firestore...\n");

	// Hero
	await db.collection("hero").doc("main").set({
		name: "Ruchiket Borse",
		title: "React Developer",
		avatarUrl:
			"https://i.pinimg.com/736x/94/ea/93/94ea9375223db8cb6ed76c7ba6c7245b.jpg",
		status: "available",
	});
	console.log("✅ hero/main");

	// About
	await db
		.collection("about")
		.doc("main")
		.set({
			content:
				"Hello World! I'm Ruchiket, I have written my first line of code when I was 16. I'm a passionate full stack developer and designer. I love the thrill of crafting new things and constantly exploring to satisfy my curiosity. With a strong background in both development and design, I bring a unique blend of technical expertise and creative problem-solving to every project I undertake. Whether it's coding elegant software solutions or designing captivating user interfaces, I'm always driven by my passion for innovation.\n\nLet's connect and collaborate!",
		});
	console.log("✅ about/main");

	// Stack
	await db
		.collection("stack")
		.doc("items")
		.set({
			items: [
				{
					name: "TypeScript",
					icon: "https://cdn.worldvectorlogo.com/logos/typescript.svg",
				},
				{
					name: "JavaScript",
					icon: "https://cdn.worldvectorlogo.com/logos/javascript-1.svg",
				},
				{
					name: "React",
					icon: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
				},
				{
					name: "Next.js",
					icon: "https://cdn.worldvectorlogo.com/logos/next-js.svg",
				},
				{
					name: "Tailwind CSS",
					icon: "https://cdn.worldvectorlogo.com/logos/tailwind-css-2.svg",
				},
				{
					name: "Jotai",
					icon: "https://cdn.candycode.com/jotai/jotai-mascot.png",
				},
				{
					name: "Node.js",
					icon: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
				},
				{
					name: "Express.js",
					icon: "https://cdn.worldvectorlogo.com/logos/expressjs.svg",
				},
				{
					name: "MongoDB",
					icon: "https://cdn.worldvectorlogo.com/logos/mongodb-icon-1.svg",
				},
			],
		});
	console.log("✅ stack/items");

	// Experience
	await db
		.collection("experience")
		.doc("items")
		.set({
			entries: [
				{
					company: "Writeroo",
					logo: "https://www.writeroo.net/writeroo_circle.svg",
					roles: [
						{
							title: "Full Stack Developer",
							type: "Internship",
							period: "Jan 2024 - Jun 2025",
							points: [
								"Develop AI Chat and AI Assistant features.",
								"Built real-time collaborative editing tools.",
								"Implemented authentication and user management systems.",
								"Optimized frontend performance with lazy loading and code splitting.",
								"Designed and maintained RESTful APIs with Django Rest Framework.",
								"Worked on integrating third-party AI APIs for content generation.",
							],
							tags: [
								"Nextjs",
								"Reactjs",
								"Django Rest Framework",
								"Tailwind",
								"Jotai",
								"React Query",
							],
						},
						{
							title: "React Developer Intern",
							type: "Internship",
							period: "Jan 2024 - Jun 2025",
							points: [
								"Develop AI Chat and AI Assistant features.",
								"Built reusable component library for the platform.",
								"Implemented responsive designs for mobile and tablet.",
								"Collaborated with designers to translate Figma mockups to code.",
								"Set up CI/CD pipelines for automated testing and deployment.",
								"Mentored junior developers on React best practices.",
							],
							tags: [
								"Nextjs",
								"Reactjs",
								"Django Rest Framework",
								"Tailwind",
								"Jotai",
								"React Query",
							],
						},
					],
				},
			],
		});
	console.log("✅ experience/items");

	// Projects
	await db
		.collection("projects")
		.doc("items")
		.set({
			entries: [
				{
					name: "OldLense",
					description:
						"iOS-like wheel picker for React with smooth inertia scrolling and infinite loop support.",
					points: [
						"Built custom physics engine for smooth scroll momentum.",
						"Implemented infinite loop scrolling with virtual list rendering.",
						"Created accessible API with keyboard navigation support.",
						"Published as open-source npm package with TypeScript types.",
						"Achieved 60fps performance with requestAnimationFrame optimization.",
						"Added haptic feedback integration for mobile devices.",
					],
					tags: [
						"Nextjs",
						"Reactjs",
						"Django Rest Framework",
						"Tailwind",
						"Jotai",
						"React Query",
					],
				},
			],
		});
	console.log("✅ projects/items");

	// Education
	await db
		.collection("education")
		.doc("items")
		.set({
			entries: [
				{
					degree: "Bachelors of Engineering",
					field: "Electronics and Telecommunication",
					institution: "University of Pune",
					logo: "https://beta.unipune.ac.in/images/about/uop_logo.jpg",
					period: "2022-2026",
				},
			],
		});
	console.log("✅ education/items");

	// Blog Posts
	const blogPosts = [
		{
			title: "Building a Modern Portfolio with Next.js 15",
			slug: "building-portfolio-nextjs-15",
			excerpt:
				"A deep dive into crafting a brutalist-style developer portfolio using Next.js 15, Tailwind CSS v4, and Firebase Firestore for dynamic content management.",
			content: `# Building a Modern Portfolio with Next.js 15

When I decided to rebuild my portfolio, I wanted something that felt different — something that broke away from the generic developer portfolio template. That's when I discovered the brutalist design movement in web design.

## Why Brutalist Design?

Brutalist web design embraces raw, unpolished aesthetics. Think exposed grid lines, monospace fonts, and stark contrasts. It's the architectural brutalism of the digital world.

### Key Principles

- **Raw structure visible** — grid lines, borders, and patterns are features, not bugs
- **Typography-first** — content speaks louder than decorations
- **Honest materials** — no gradients pretending to be something they're not

## The Tech Stack

I chose a modern stack that balances developer experience with performance:

\`\`\`typescript
// next.config.ts
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "*.githubusercontent.com" },
    ],
  },
};
\`\`\`

### Next.js 15 with Turbopack

The new Turbopack bundler in Next.js 15 is blazingly fast. Hot module replacement feels instant, and the dev server starts in under a second.

### Tailwind CSS v4

Tailwind v4 brings native CSS nesting and a simplified configuration. The new \`@theme\` directive makes it easy to define design tokens:

\`\`\`css
@theme inline {
  --color-background: var(--background);
  --font-sans: var(--font-inter-sans);
  --font-mono: var(--font-ibm-plex-mono);
}
\`\`\`

## Firebase for Dynamic Content

Instead of hardcoding content, I use Firebase Firestore to store all portfolio data. This means I can update my experience, projects, and blog posts without touching the codebase.

### The Architecture

1. **Server Components** fetch data directly from Firestore
2. **API Routes** provide REST endpoints for client-side needs
3. **Seed Script** migrates hardcoded data to Firestore

## Lessons Learned

> "The best portfolio is one that reflects your actual work, not a template."

Building this taught me that constraints breed creativity. The brutalist aesthetic forced me to focus on content quality and typography rather than hiding behind flashy animations.

## What's Next?

- Adding a blog system (you're reading proof it works!)
- Dark mode toggle
- View transition API for page navigations
- RSS feed for blog posts`,
			tags: ["nextjs", "react", "firebase", "portfolio"],
			published: true,
			views: 42,
			readingTime: 5,
			createdAt: Timestamp.fromDate(new Date("2025-06-15")),
			updatedAt: Timestamp.fromDate(new Date("2025-06-15")),
		},
		{
			title: "Why I Switched from REST to Server Components",
			slug: "rest-to-server-components",
			excerpt:
				"How React Server Components changed the way I think about data fetching, and why I no longer reach for REST APIs as my first instinct.",
			content: `# Why I Switched from REST to Server Components

For years, my go-to architecture was simple: build a REST API, fetch data on the client, manage loading states, handle errors. It worked. But React Server Components (RSC) changed everything.

## The Old Way

Here's what a typical data-fetching pattern looked like:

\`\`\`typescript
// The old way — client-side fetching
"use client";
import { useState, useEffect } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton />;
  if (error) return <ErrorBoundary />;
  return <ProjectList projects={projects} />;
}
\`\`\`

Three state variables just to show a list. Loading spinners everywhere. And the data doesn't even exist in the initial HTML — bad for SEO.

## The Server Component Way

\`\`\`typescript
// The new way — server components
import { db } from "@/lib/firebase";

export default async function Projects() {
  const doc = await db.collection("projects").doc("items").get();
  const { entries } = doc.data() ?? { entries: [] };

  return <ProjectList projects={entries} />;
}
\`\`\`

That's it. No useState. No useEffect. No loading states. The data is fetched on the server, rendered to HTML, and sent to the client fully formed.

## The Benefits

### 1. Zero Client-Side JavaScript for Data Fetching

Server Components don't ship their JavaScript to the browser. Your bundle size stays small.

### 2. Direct Database Access

No need for an API layer between your component and your data. You can query Firestore directly.

### 3. Better SEO

Content is in the HTML from the first paint. Search engines see everything.

### 4. Simplified Mental Model

Think of your component as a function: data in, HTML out. No lifecycle management.

## When Do You Still Need APIs?

Server Components don't replace everything:

- **Forms and mutations** — POST/PUT/DELETE still need API routes
- **Real-time updates** — WebSocket or polling needs client-side code
- **Third-party consumers** — if other apps need your data

## My Hybrid Approach

I use Server Components for reads and API routes for writes:

\`\`\`
READ:  Server Component → Firestore → HTML
WRITE: Client Component → API Route → Firestore
\`\`\`

This gives me the best of both worlds: fast reads with SSR, and structured writes through validated API endpoints.

## Conclusion

Server Components aren't just a new feature — they're a paradigm shift. They eliminate an entire category of boilerplate and make your apps faster by default. If you haven't tried them yet, start with a simple page that fetches data, and you'll never want to go back.`,
			tags: ["react", "nextjs", "architecture"],
			published: true,
			views: 128,
			readingTime: 6,
			createdAt: Timestamp.fromDate(new Date("2025-05-20")),
			updatedAt: Timestamp.fromDate(new Date("2025-05-22")),
		},
		{
			title: "Mastering TypeScript Generics: A Practical Guide",
			slug: "mastering-typescript-generics",
			excerpt:
				"Stop writing 'any' everywhere. Learn how TypeScript generics can make your code safer, more reusable, and genuinely enjoyable to write.",
			content: `# Mastering TypeScript Generics: A Practical Guide

If you've ever written \`any\` in TypeScript and felt a twinge of guilt — this post is for you. Generics are the key to writing type-safe, reusable code without sacrificing flexibility.

## What Are Generics?

Generics let you write functions and types that work with *any* type while preserving type information. Think of them as type-level parameters.

\`\`\`typescript
// Without generics — loses type info
function first(arr: any[]): any {
  return arr[0];
}

// With generics — preserves type info
function first<T>(arr: T[]): T {
  return arr[0];
}

const num = first([1, 2, 3]);     // type: number
const str = first(["a", "b"]);    // type: string
\`\`\`

## Real-World Patterns

### 1. API Response Wrapper

\`\`\`typescript
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

async function fetchApi<T>(url: string): Promise<ApiResponse<T>> {
  const res = await fetch(url);
  return res.json();
}

// Usage — TypeScript knows the shape of data
const { data: user } = await fetchApi<User>("/api/user");
console.log(user.name); // ✅ TypeScript knows this exists
\`\`\`

### 2. Generic React Components

\`\`\`typescript
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
};

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}

// Usage
<List
  items={users}
  renderItem={user => <span>{user.name}</span>}
  keyExtractor={user => user.id}
/>
\`\`\`

### 3. Constrained Generics

\`\`\`typescript
// T must have a 'length' property
function longest<T extends { length: number }>(a: T, b: T): T {
  return a.length >= b.length ? a : b;
}

longest("hello", "hi");       // ✅ string has length
longest([1, 2], [1, 2, 3]);   // ✅ array has length
longest(10, 20);               // ❌ number has no length
\`\`\`

### 4. Utility Types (Built on Generics)

TypeScript's built-in utility types are all generics under the hood:

\`\`\`typescript
type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

type PublicUser = Omit<User, "password">;
type UserUpdate = Partial<Pick<User, "name" | "email">>;
type ReadonlyUser = Readonly<User>;
\`\`\`

## Common Mistakes

### ❌ Using generics when a union type works

\`\`\`typescript
// Overkill
function format<T extends string | number>(value: T): string { ... }

// Just use a union
function format(value: string | number): string { ... }
\`\`\`

### ❌ Not constraining generics

\`\`\`typescript
// Too loose — T could be anything
function process<T>(item: T) {
  console.log(item.name); // ❌ Error: 'name' doesn't exist on T
}

// Constrained — T must have name
function process<T extends { name: string }>(item: T) {
  console.log(item.name); // ✅
}
\`\`\`

## The Mental Model

Think of generics as **"I don't know the type yet, but I will when you use me, and I'll keep it consistent."**

They're a contract between the function author and the function caller. The author says "give me any type T", and TypeScript ensures T is used consistently throughout.

## Conclusion

Generics aren't scary — they're just parameters for types. Start with simple use cases like API wrappers and list components, and work your way up to more complex patterns. Your future self (and your team) will thank you for the type safety.`,
			tags: ["typescript", "javascript", "tutorial"],
			published: true,
			views: 256,
			readingTime: 7,
			createdAt: Timestamp.fromDate(new Date("2025-04-10")),
			updatedAt: Timestamp.fromDate(new Date("2025-04-12")),
		},
	];

	for (const post of blogPosts) {
		await db.collection("blogs").doc(post.slug).set(post);
		console.log(`✅ blogs/${post.slug}`);
	}

	console.log("\n🎉 Seeding complete!");
	process.exit(0);
}

seed().catch((err) => {
	console.error("❌ Seed failed:", err);
	process.exit(1);
});
