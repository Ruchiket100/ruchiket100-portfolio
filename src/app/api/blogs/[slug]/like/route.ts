import { db } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> }
) {
	try {
		const { slug } = await params;
		const body = await request.json();
		const { action } = body; // "like" or "unlike"

		if (action !== "like" && action !== "unlike") {
			return NextResponse.json({ error: "Invalid action" }, { status: 400 });
		}

		const incrementValue = action === "like" ? 1 : -1;

		await db
			.collection("blogs")
			.doc(slug)
			.update({
				likes: FieldValue.increment(incrementValue),
			});

		// Fetch updated document to return the new count
		const doc = await db.collection("blogs").doc(slug).get();
		const likes = doc.data()?.likes || 0;

		return NextResponse.json({ likes }, { status: 200 });
	} catch (error) {
		console.error("Error updating likes:", error);
		return NextResponse.json(
			{ error: "Failed to update likes" },
			{ status: 500 }
		);
	}
}
