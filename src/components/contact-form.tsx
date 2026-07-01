"use client";

import { useState, type FormEvent } from "react";

export default function ContactForm() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		setStatus("loading");
		setErrorMessage("");

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error(data.error || "Something went wrong");
			}

			setStatus("success");
			setFormData({ name: "", email: "", message: "" });

			setTimeout(() => setStatus("idle"), 5000);
		} catch (err) {
			setStatus("error");
			setErrorMessage(
				err instanceof Error ? err.message : "Failed to send message"
			);
			setTimeout(() => setStatus("idle"), 5000);
		}
	}

	return (
		<div className="p-4">
			{status === "success" && (
				<div className="mb-4 p-3 border border-emerald-300 bg-emerald-50 text-emerald-800 text-sm animate-[slideIn_0.3s_ease-out]">
					<span className="font-medium">✓ Message sent!</span> I&apos;ll
					get back to you soon.
				</div>
			)}

			{status === "error" && (
				<div className="mb-4 p-3 border border-red-300 bg-red-50 text-red-800 text-sm animate-[slideIn_0.3s_ease-out]">
					<span className="font-medium">✗ Error:</span> {errorMessage}
				</div>
			)}

			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<div className="flex flex-col gap-1">
					<label htmlFor="contact-name" className="text-xs font-medium">
						Name
					</label>
					<input
						id="contact-name"
						type="text"
						required
						value={formData.name}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								name: e.target.value,
							}))
						}
						className="border border-gray-300 px-3 py-2 text-sm font-mono bg-white focus:outline-none focus:border-black transition-colors"
						placeholder="Your name"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label
						htmlFor="contact-email"
						className="text-xs font-medium"
					>
						Email
					</label>
					<input
						id="contact-email"
						type="email"
						required
						value={formData.email}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								email: e.target.value,
							}))
						}
						className="border border-gray-300 px-3 py-2 text-sm font-mono bg-white focus:outline-none focus:border-black transition-colors"
						placeholder="you@example.com"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<label
						htmlFor="contact-message"
						className="text-xs font-medium"
					>
						Message
					</label>
					<textarea
						id="contact-message"
						required
						rows={5}
						value={formData.message}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								message: e.target.value,
							}))
						}
						className="border border-gray-300 px-3 py-2 text-sm font-mono bg-white focus:outline-none focus:border-black transition-colors resize-none"
						placeholder="Tell me about your project..."
					/>
				</div>

				<button
					type="submit"
					disabled={status === "loading"}
					className="group relative border border-gray-900 bg-gray-900 text-white px-6 py-2.5 text-sm font-medium hover:bg-white hover:text-gray-900 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{status === "loading" ? (
						<span className="flex items-center justify-center gap-2">
							<span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
							Sending...
						</span>
					) : (
						"Send Message →"
					)}
				</button>
			</form>
		</div>
	);
}
