import { db } from "@/lib/firebase";
import { NextRequest, NextResponse } from "next/server";
import { Timestamp } from "firebase-admin/firestore";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { name, email, message } = body;

		// Validation
		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: "All fields are required" },
				{ status: 400 }
			);
		}

		if (typeof name !== "string" || name.trim().length < 2) {
			return NextResponse.json(
				{ error: "Name must be at least 2 characters" },
				{ status: 400 }
			);
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return NextResponse.json(
				{ error: "Invalid email address" },
				{ status: 400 }
			);
		}

		if (typeof message !== "string" || message.trim().length < 10) {
			return NextResponse.json(
				{ error: "Message must be at least 10 characters" },
				{ status: 400 }
			);
		}

		await db.collection("contacts").add({
			name: name.trim(),
			email: email.trim().toLowerCase(),
			message: message.trim(),
			createdAt: Timestamp.now(),
			read: false,
		});

		return NextResponse.json(
			{ success: true, message: "Message sent successfully!" },
			{ status: 201 }
		);
	} catch {
		return NextResponse.json(
			{ error: "Failed to send message" },
			{ status: 500 }
		);
	}
}
