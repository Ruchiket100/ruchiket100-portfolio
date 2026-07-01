import { db } from "@/lib/firebase";

const fallbackContent =
	"Hello World! I'm Ruchiket, I have written my first line of code when I was 16. I'm a passionate full stack developer and designer. I love the thrill of crafting new things and constantly exploring to satisfy my curiosity. With a strong background in both development and design, I bring a unique blend of technical expertise and creative problem-solving to every project I undertake. Whether it's coding elegant software solutions or designing captivating user interfaces, I'm always driven by my passion for innovation.\n\nLet's connect and collaborate!";

async function getAboutData() {
	try {
		const doc = await db.collection("about").doc("main").get();
		if (!doc.exists) return fallbackContent;
		return (doc.data()?.content as string) || fallbackContent;
	} catch {
		return fallbackContent;
	}
}

export default async function About(props: { className?: string }) {
	const { className } = props;
	const content = await getAboutData();

	const paragraphs = content.split("\n\n");

	return (
		<div className={`p-4 ${className}`}>
			{/* talk about your experience and your project here and hover over it will create tool guide showing img of it */}
			<div className="text-sm leading-7">
				{paragraphs.map((p, i) => (
					<p key={i} className={i > 0 ? "mt-4" : ""}>
						{i === 0 ? (
							<>
								{p.split("Ruchiket")[0]}
								<u>Ruchiket</u>
								{p.split("Ruchiket")[1]}
							</>
						) : (
							p
						)}
					</p>
				))}
			</div>
		</div>
	);
}
