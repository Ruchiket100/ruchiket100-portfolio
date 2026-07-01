import { db } from "@/lib/firebase";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const doc = await db.collection("about").doc("main").get();
		if (!doc.exists) {
			return NextResponse.json(
				{
					content:
						"hello world",
				},
				{ status: 200 }
			);
		}
		return NextResponse.json(doc.data(), { status: 200 });
	} catch {
		return NextResponse.json(
			{ error: "Failed to fetch about data" },
			{ status: 500 }
		);
	}
}
