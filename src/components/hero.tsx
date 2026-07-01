import { db } from "@/lib/firebase";
import StatusIndicator from "./status-indicator";

// Fallback data
const fallbackHero = {
	name: "Ruchiket Borse",
	title: "React Developer",
	avatarUrl:
		"https://i.pinimg.com/736x/94/ea/93/94ea9375223db8cb6ed76c7ba6c7245b.jpg",
	status: "available",
};

async function getHeroData() {
	try {
		const doc = await db.collection("hero").doc("main").get();
		if (!doc.exists) return fallbackHero;
		return doc.data() as typeof fallbackHero;
	} catch {
		return fallbackHero;
	}
}

const Hero = async (props: { className: string }) => {
	const { className } = props;
	const data = await getHeroData();

	return (
		<div className={`h-full ${className}`}>
			<div className="relative items-center w-full flex flex-col  justify-center">
				<div className="grid w-full grid-cols-[1fr_2rem_auto_2rem_1fr] grid-rows-[2rem_auto_2rem]">
					<div className="relative -top-px col-span-full row-start-2 h-px bg-(--pattern-fg)"></div>

					<div className="relative -left-px col-start-3 row-start-1 bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>

					<div className="aspect-square row-start-2 col-start-3 w-50 bg-gray-500">
						<img
							className="w-full aspect-square "
							src={data.avatarUrl}
							alt={data.name}
						/>
					</div>

					<div className="relative -left-px col-start-3 row-start-3 bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>

					<div className="relative -top-px col-span-full row-start-3 h-px bg-(--pattern-fg) "></div>
					<div className="relative -top-px col-span-full row-start-4 h-px bg-(--pattern-fg)"></div>
					<div className="relative -right-px col-start-2 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
					<div className="relative -left-px col-start-4 row-span-full row-start-1 border-x border-x-(--pattern-fg) bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed"></div>
				</div>
				<h1 className="text-4xl font-sans py-1 font-extrabold">
					{data.name}
				</h1>
				<div className="w-full text-center border-t border-gray-200">
					<p>{data.title}</p>
				</div>
				<div className="mt-3">
					<StatusIndicator status={data.status || "available"} />
				</div>
			</div>
		</div>
	);
};

export default Hero;
