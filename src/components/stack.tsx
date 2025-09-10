export default function Stack(props: { className?: string }) {
	const { className } = props;

	const stackData = [
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
	];
	return (
		<div className={`${className}`}>
			<div className="flex gap-4 p-4 flex-wrap">
				{stackData.map((tech, i) => (
					<div
						key={i}
						className="flex items-center text-sm  border border-gray-300"
					>
						<img
							className="w-10 aspect-square p-1"
							src={tech.icon}
						/>
						<span className="h-full w-[1px] bg-gray-300"></span>
						<p className="px-1">{tech.name}</p>
					</div>
				))}
			</div>
		</div>
	);
}
