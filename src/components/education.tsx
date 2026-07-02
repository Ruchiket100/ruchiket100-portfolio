import { db } from "@/lib/firebase";

interface EducationEntry {
	degree: string;
	field: string;
	institution: string;
	logo: string;
	period: string;
}

const fallbackEducation: EducationEntry[] = [
	{
		degree: "Bachelors of Engineering",
		field: "Electronics and Telecommunication",
		institution: "University of Pune",
		logo: "https://beta.unipune.ac.in/images/about/uop_logo.jpg",
		period: "2022-2026",
	},
];

async function getEducationData(): Promise<EducationEntry[]> {
	try {
		const doc = await db.collection("education").doc("items").get();
		if (!doc.exists) return fallbackEducation;
		return (doc.data()?.entries as EducationEntry[]) || fallbackEducation;
	} catch {
		return fallbackEducation;
	}
}

export default async function Education(props: { className?: string }) {
	const { className } = props;
	const entries = await getEducationData();

	return (
		<div className={className}>
			<div className="flex flex-col gap-4">
				{entries.map((entry, idx) => (
					<div
						key={idx}
						className="flex gap-3 items-center border-dashed border-border-dashed w-full h-full"
					>
						<div className="aspect-square flex items-center justify-center p-4 border-r border-dashed border-border-dashed">
							<img className="h-8" src={entry.logo} alt={entry.institution} />
						</div>
						<div>
							<h2 className="text-lg font-medium">{entry.degree}</h2>
							<div className="flex items-center gap-4 text-xs">
								{entry.field}
								<hr className="h-4 w-[1px] bg-border" />
								{entry.period}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
