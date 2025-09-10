export default function Education(props: { className?: string }) {
	const { className } = props;

	return (
		<div className={className}>
			<div className="flex gap-3 items-center  border-dashed border-gray-300 w-full h-full">
				<div className="aspect-square flex items-center justify-center p-4 border-r border-dashed border-gray-300">
					<img
						className="h-8"
						src="https://beta.unipune.ac.in/images/about/uop_logo.jpg"
					/>
				</div>
				<div>
					<h2 className="text-lg font-medium">
						Bachlors of Engineering
					</h2>
					<div className="flex items-center gap-4 text-xs">
						Electronics and Telecommunication
						<hr className="h-4 w-[1px] bg-gray-300" />
						2022-2026
					</div>
				</div>
			</div>
		</div>
	);
}
