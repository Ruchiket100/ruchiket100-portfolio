"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useTransition, type ReactNode } from "react";

interface TransitionLinkProps extends LinkProps {
	children: ReactNode;
	className?: string;
	target?: string;
	rel?: string;
}

export default function TransitionLink({
	children,
	href,
	className,
	target,
	rel,
	...props
}: TransitionLinkProps) {
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const handleNavigate = (e: React.MouseEvent<HTMLAnchorElement>) => {
		// Only intercept normal left clicks without modifier keys, and non-external links
		if (
			target === "_blank" ||
			e.defaultPrevented ||
			e.button !== 0 ||
			e.metaKey ||
			e.ctrlKey ||
			e.shiftKey ||
			e.altKey
		) {
			return;
		}

		e.preventDefault();
		startTransition(() => {
			router.push(href.toString());
		});
	};

	return (
		<>
			{isPending && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-[1px] pointer-events-auto">
					{/* Brutalist Rotating Square Loader */}
					<div className="w-10 h-10 border-2 border-black animate-spin"></div>
				</div>
			)}
			<Link
				href={href}
				onClick={handleNavigate}
				className={className}
				target={target}
				rel={rel}
				{...props}
			>
				{children}
			</Link>
		</>
	);
}
