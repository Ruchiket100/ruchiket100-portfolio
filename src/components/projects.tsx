export default function Projects(props: { className?: string }) {
	const { className } = props;
	return (
		<div className={`flex flex-col ${className}`}>
			<div className="flex gap-3 items-center border-b border-dashed border-gray-300 w-full h-full">
				<div className="aspect-square p-4 border-r border-dashed border-gray-300">
					<svg
						width="24px"
						height="24px"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						color="currentColor"
					>
						<path
							d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
						<path
							d="M8 21.1679V14L12 7L16 14V21.1679"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
						<path
							d="M8 14C8 14 9.12676 15 10 15C10.8732 15 12 14 12 14C12 14 13.1268 15 14 15C14.8732 15 16 14 16 14"
							stroke="#000000"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</svg>
				</div>
				<h2 className="text-lg font-medium">OldLense</h2>
			</div>
			<div className="p-4 flex flex-col gap-5">
				<p className="text-sm">
					iOS-like wheel picker for React with smooth inertia
					scrolling and infinite loop support.
				</p>
				<ul className="text-xs flex flex-col gap-3 pl-4">
					<li className="list-disc">
						Develop AI Chat and AI Assistant features.
					</li>
					<li className="list-disc">
						Develop AI Chat and AI Assistant features.
					</li>
					<li className="list-disc">
						Develop AI Chat and AI Assistant features.
					</li>
					<li className="list-disc">
						Develop AI Chat and AI Assistant features.
					</li>
					<li className="list-disc">
						Develop AI Chat and AI Assistant features.
					</li>
					<li className="list-disc">
						Develop AI Chat and AI Assistant features.
					</li>
				</ul>
				<div className="flex gap-2 flex-wrap items-center">
					<div className="border border-gray-300 text-xs px-2 py-1">
						Nextjs
					</div>
					<div className="border border-gray-300 text-xs px-2 py-1">
						Reactjs
					</div>
					<div className="border border-gray-300 text-xs px-2 py-1">
						Django Rest Framework
					</div>
					<div className="border border-gray-300 text-xs px-2 py-1">
						Tailwind
					</div>
					<div className="border border-gray-300 text-xs px-2 py-1">
						Jotai
					</div>
					<div className="border border-gray-300 text-xs px-2 py-1">
						React Query
					</div>
				</div>
			</div>
		</div>
	);
}
