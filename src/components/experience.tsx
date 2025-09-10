export default function Experience(props: { className?: string }) {
	const { className } = props;

	return (
		<div className={className}>
			<div className="flex flex-col p-4">
				<div>
					<div className="flex gap-2 items-center">
						<img
							className="w-8"
							src="https://www.writeroo.net/writeroo_circle.svg"
						/>
						<h2 className="text-lg font-medium font-sans">
							Writeroo
						</h2>
					</div>
					<div className="pt-3 ">
						<div className="flex flex-col gap-3 relative before:absolute before:left-3 before:w-[1px] before:h-full before:bg-gray-200">
							<div className="flex gap-2">
								<div className="p-1 z-10 bg-white aspect-square border border-gray-300 ">
									<svg
										width="16px"
										height="16px"
										stroke-width="1.5"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										color="#000000"
									>
										<path
											d="M13.5 6L10 18.5"
											stroke="#000000"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M6.5 8.5L3 12L6.5 15.5"
											stroke="#000000"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M17.5 8.5L21 12L17.5 15.5"
											stroke="#000000"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
									</svg>
								</div>
								Full Stack Developer
							</div>
							<div className="flex items-center gap-4 text-xs pl-8">
								Internship
								<hr className="h-4 w-[1px] bg-gray-300" />
								Jan 2024 - Jun 2025
							</div>
							<div className="flex flex-col py-2">
								<ul className="text-xs flex flex-col gap-3 pl-12">
									<li className="list-disc">
										Develop AI Chat and AI Assistant
										features.
									</li>
									<li className="list-disc">
										Develop AI Chat and AI Assistant
										features.
									</li>
									<li className="list-disc">
										Develop AI Chat and AI Assistant
										features.
									</li>
									<li className="list-disc">
										Develop AI Chat and AI Assistant
										features.
									</li>
									<li className="list-disc">
										Develop AI Chat and AI Assistant
										features.
									</li>
									<li className="list-disc">
										Develop AI Chat and AI Assistant
										features.
									</li>
								</ul>
								<div className="flex gap-2 flex-wrap items-center p-3 pl-8">
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
						<div className="flex flex-col gap-3">
							<div className="flex gap-2">
								<div className="p-1 aspect-square border border-gray-300 ">
									<svg
										width="16px"
										stroke-width="1.5"
										height="16px"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										color="#000000"
									>
										<path
											d="M9.00001 21L8.00001 21C6.89544 21 6.00001 20.1057 6.00001 19.0011C6.00001 17.4501 6.00001 15.3443 6 14C6 13 4.5 12 4.5 12C4.5 12 6.00001 11 6.00001 10C6.00001 8.827 6.00001 6.62207 6.00001 4.99914C6.00001 3.89457 6.89544 3 8.00001 3L9.00001 3"
											stroke="#000000"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
										<path
											d="M15 21L16 21C17.1046 21 18 20.1057 18 19.0011C18 17.4501 18 15.3443 18 14C18 13 19.5 12 19.5 12C19.5 12 18 11 18 10C18 8.827 18 6.62207 18 4.99914C18 3.89457 17.1046 3 16 3L15 3"
											stroke="#000000"
											stroke-width="1.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										></path>
									</svg>
								</div>
								React Developer Intern
							</div>
							<div className="flex items-center gap-4 text-xs pl-8">
								Internship
								<hr className="h-4 w-[1px] bg-gray-300" />
								Jan 2024 - Jun 2025
							</div>
							<div className="flex flex-col py-2">
								<ul className="text-xs flex flex-col gap-3 pl-12">
									<li className="list-disc">
										Develop AI Chat and AI Assistant
										features.
									</li>
									<li className="list-disc">
										Develop AI Chat and AI Assistant
										features.
									</li>
									<li className="list-disc">
										Develop AI Chat and AI Assistant
										features.
									</li>
									<li className="list-disc">
										Develop AI Chat and AI Assistant
										features.
									</li>
									<li className="list-disc">
										Develop AI Chat and AI Assistant
										features.
									</li>
									<li className="list-disc">
										Develop AI Chat and AI Assistant
										features.
									</li>
								</ul>
								<div className="flex gap-2 flex-wrap items-center p-3 pl-8">
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
					</div>
				</div>
			</div>
		</div>
	);
}
