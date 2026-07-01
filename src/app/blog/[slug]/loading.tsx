export default function Loading() {
	return (
		<div className="pt-4 font-mono">
			<div className="relative grid grid-cols-[1fr_50vw_1fr] min-h-screen [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-gray-950)]/10">
				{/* Decorative Border */}
				<div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) pointer-events-none"></div>

				<div className="col-start-2 row-start-1 flex flex-col items-center justify-center min-h-[60vh] gap-4">
					{/* Brutalist Rotating Square Loader */}
					<div className="w-10 h-10 border-2 border-black dark:border-white animate-spin"></div>
					<p className="text-xs text-gray-500 tracking-widest uppercase">
						Loading post...
					</p>
				</div>
			</div>
		</div>
	);
}
