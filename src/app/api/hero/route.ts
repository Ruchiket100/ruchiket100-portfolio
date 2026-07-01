import { db } from "@/lib/firebase";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const doc = await db.collection("hero").doc("main").get();
		if (!doc.exists) {
			return NextResponse.json(
				{
					name: "Ruchiket Borse",
					title: "React Developer",
					avatarUrl:
						"https://i.pinimg.com/736x/94/ea/93/94ea9375223db8cb6ed76c7ba6c7245b.jpg",
					status: "available",
				},
				{ status: 200 }
			);
		}
		return NextResponse.json(doc.data(), { status: 200 });
	} catch {
		return NextResponse.json(
			{ error: "Failed to fetch hero data" },
			{ status: 500 }
		);
	}
}
