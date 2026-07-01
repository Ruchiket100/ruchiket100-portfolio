import { db } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> }
) {
	try {
		const { slug } = await params;
		const doc = await db.collection("blogs").doc(slug).get();

		if (!doc.exists) {
			return NextResponse.json(
				{ error: "Blog post not found" },
				{ status: 404 }
			);
		}

		// Increment view count
		await db
			.collection("blogs")
			.doc(slug)
			.update({
				views: FieldValue.increment(1),
			});

		const data = doc.data()!;
		return NextResponse.json(
			{
				slug: doc.id,
				title: data.title,
				excerpt: data.excerpt,
				content: data.content,
				tags: data.tags,
				views: (data.views || 0) + 1,
				readingTime: data.readingTime,
				createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
				updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
			},
			{ status: 200 }
		);
	} catch {
		return NextResponse.json(
			{ error: "Failed to fetch blog post" },
			{ status: 500 }
		);
	}
}
