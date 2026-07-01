import { db } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";

export async function GET(
	_request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> }
) {
	try {
		const { slug } = await params;

		const snapshot = await db
			.collection("blogs")
			.doc(slug)
			.collection("comments")
			.orderBy("createdAt", "desc")
			.get();

		const comments = snapshot.docs.map((doc) => {
			const data = doc.data();
			return {
				id: doc.id,
				author: data.author,
				content: data.content,
				createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
			};
		});

		return NextResponse.json({ comments }, { status: 200 });
	} catch (error) {
		console.error("Error fetching comments:", error);
		return NextResponse.json(
			{ error: "Failed to fetch comments" },
			{ status: 500 }
		);
	}
}

export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> }
) {
	try {
		const { slug } = await params;
		const body = await request.json();
		const { author, content } = body;

		if (!author || !content || author.trim() === "" || content.trim() === "") {
			return NextResponse.json(
				{ error: "Author name and comment content are required" },
				{ status: 400 }
			);
		}

		const commentData = {
			author: author.trim(),
			content: content.trim(),
			createdAt: Timestamp.now(),
		};

		const docRef = await db
			.collection("blogs")
			.doc(slug)
			.collection("comments")
			.add(commentData);

		return NextResponse.json(
			{
				id: docRef.id,
				author: commentData.author,
				content: commentData.content,
				createdAt: commentData.createdAt.toDate().toISOString(),
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error("Error saving comment:", error);
		return NextResponse.json(
			{ error: "Failed to save comment" },
			{ status: 500 }
		);
	}
}
