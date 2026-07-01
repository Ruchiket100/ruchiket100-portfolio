import { db } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	try {
		const { searchParams } = new URL(request.url);
		const tag = searchParams.get("tag");
		const limit = parseInt(searchParams.get("limit") || "10");
		const page = parseInt(searchParams.get("page") || "1");

		let query = db
			.collection("blogs")
			.where("published", "==", true)
			.orderBy("createdAt", "desc");

		if (tag) {
			query = query.where("tags", "array-contains", tag);
		}

		const offset = (page - 1) * limit;
		const snapshot = await query.offset(offset).limit(limit).get();

		const posts = snapshot.docs.map((doc) => {
			const data = doc.data();
			return {
				slug: doc.id,
				title: data.title,
				excerpt: data.excerpt,
				tags: data.tags,
				views: data.views,
				readingTime: data.readingTime,
				createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
				updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
			};
		});

		// Get total count for pagination
		const totalSnapshot = await db
			.collection("blogs")
			.where("published", "==", true)
			.count()
			.get();
		const total = totalSnapshot.data().count;

		return NextResponse.json(
			{
				posts,
				pagination: {
					page,
					limit,
					total,
					totalPages: Math.ceil(total / limit),
				},
			},
			{ status: 200 }
		);
	} catch {
		return NextResponse.json(
			{ error: "Failed to fetch blog posts" },
			{ status: 500 }
		);
	}
}
