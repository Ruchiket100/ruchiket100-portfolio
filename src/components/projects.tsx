import { db } from "@/lib/firebase";

interface ProjectEntry {
	name: string;
	description: string;
	points: string[];
	tags: string[];
}

const fallbackProjects: ProjectEntry[] = [
	{
		name: "OldLense",
		description:
			"iOS-like wheel picker for React with smooth inertia scrolling and infinite loop support.",
		points: [
			"Develop AI Chat and AI Assistant features.",
			"Develop AI Chat and AI Assistant features.",
			"Develop AI Chat and AI Assistant features.",
			"Develop AI Chat and AI Assistant features.",
			"Develop AI Chat and AI Assistant features.",
			"Develop AI Chat and AI Assistant features.",
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
];

async function getProjectsData(): Promise<ProjectEntry[]> {
	try {
		const doc = await db.collection("projects").doc("items").get();
		if (!doc.exists) return fallbackProjects;
		return (doc.data()?.entries as ProjectEntry[]) || fallbackProjects;
	} catch {
		return fallbackProjects;
	}
}

export default async function Projects(props: { className?: string }) {
	const { className } = props;
	const entries = await getProjectsData();

	return (
		<div className={`flex flex-col gap-6 ${className}`}>
			{entries.map((project, idx) => (
				<div key={idx}>
					<div className="flex gap-3 items-center border-b border-dashed border-border-dashed w-full h-full">
						<div className="aspect-square p-4 border-r border-dashed border-border-dashed">
							<svg
								width="24px"
								height="24px"
								strokeWidth="1.5"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								color="currentColor"
							>
								<path
									d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M8 21.1679V14L12 7L16 14V21.1679"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M8 14C8 14 9.12676 15 10 15C10.8732 15 12 14 12 14C12 14 13.1268 15 14 15C14.8732 15 16 14 16 14"
									stroke="currentColor"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<h2 className="text-lg font-medium">{project.name}</h2>
					</div>
					<div className="p-4 flex flex-col gap-5">
						<p className="text-sm">{project.description}</p>
						<ul className="text-xs flex flex-col gap-3 pl-4">
							{project.points.map((point, pointIdx) => (
								<li key={pointIdx} className="list-disc">
									{point}
								</li>
							))}
						</ul>
						<div className="flex gap-2 flex-wrap items-center">
							{project.tags.map((tag, tagIdx) => (
								<div
									key={tagIdx}
									className="border border-border text-xs px-2 py-1"
								>
									{tag}
								</div>
							))}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
