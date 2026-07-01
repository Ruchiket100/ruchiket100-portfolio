import { db } from "@/lib/firebase";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const doc = await db.collection("stack").doc("items").get();
		if (!doc.exists) {
			return NextResponse.json({ items: [] }, { status: 200 });
		}
		return NextResponse.json(doc.data(), { status: 200 });
	} catch {
		return NextResponse.json(
			{ error: "Failed to fetch stack data" },
			{ status: 500 }
		);
	}
}
