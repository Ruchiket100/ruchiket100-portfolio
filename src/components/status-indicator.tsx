interface StatusIndicatorProps {
	status: string;
	customLabel?: string;
	customColor?: string;
}

export default function StatusIndicator({
	status,
	customLabel,
	customColor,
}: StatusIndicatorProps) {
	const statusMap: Record<string, { label: string; color: string }> = {
		available: {
			label: "Available for work",
			color: "bg-emerald-500",
		},
		building: {
			label: "Currently building",
			color: "bg-amber-500",
		},
		busy: {
			label: "Busy",
			color: "bg-red-500",
		},
		not_available: {
			label: "Currently not available",
			color: "bg-red-500",
		},
	};

	const current = statusMap[status] || {
		label: customLabel || "Available for work",
		color: customColor || "bg-emerald-500",
	};

	return (
		<div className="flex items-center gap-2 text-xs border border-gray-300 px-3 py-1.5 w-fit">
			<span className="relative flex h-2 w-2">
				<span
					className={`animate-ping absolute inline-flex h-full w-full rounded-full ${current.color} opacity-75`}
				/>
				<span
					className={`relative inline-flex rounded-full h-2 w-2 ${current.color}`}
				/>
			</span>
			<span>{current.label}</span>
		</div>
	);
}
