"use client";

import { useEffect, useState } from "react";

interface Comment {
	id: string;
	author: string;
	content: string;
	createdAt: string | null;
}

interface BlogInteractionsProps {
	slug: string;
	initialLikes: number;
}

export default function BlogInteractions({
	slug,
	initialLikes,
}: BlogInteractionsProps) {
	const [likes, setLikes] = useState(initialLikes);
	const [isLiked, setIsLiked] = useState(false);
	const [isSubmittingLike, setIsSubmittingLike] = useState(false);

	const [comments, setComments] = useState<Comment[]>([]);
	const [isLoadingComments, setIsLoadingComments] = useState(true);
	const [author, setAuthor] = useState("");
	const [content, setContent] = useState("");
	const [isSubmittingComment, setIsSubmittingComment] = useState(false);
	const [commentError, setCommentError] = useState("");

	// Load liked state from localStorage and fetch comments
	useEffect(() => {
		const liked = localStorage.getItem(`liked_${slug}`) === "true";
		setIsLiked(liked);

		async function fetchComments() {
			try {
				const res = await fetch(`/api/blogs/${slug}/comments`);
				if (res.ok) {
					const data = await res.json();
					setComments(data.comments || []);
				}
			} catch (error) {
				console.error("Failed to load comments:", error);
			} finally {
				setIsLoadingComments(false);
			}
		}

		fetchComments();
	}, [slug]);

	// Handle Like click
	const handleLike = async () => {
		if (isSubmittingLike) return;
		setIsSubmittingLike(true);

		const action = isLiked ? "unlike" : "like";
		const newLikedState = !isLiked;

		// Optimistic UI updates
		setIsLiked(newLikedState);
		setLikes((prev) => (action === "like" ? prev + 1 : Math.max(0, prev - 1)));

		try {
			const res = await fetch(`/api/blogs/${slug}/like`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ action }),
			});

			if (res.ok) {
				const data = await res.json();
				setLikes(data.likes);
				localStorage.setItem(`liked_${slug}`, String(newLikedState));
			} else {
				// Rollback on error
				setIsLiked(isLiked);
				setLikes(likes);
			}
		} catch (error) {
			console.error("Error toggling like:", error);
			// Rollback on error
			setIsLiked(isLiked);
			setLikes(likes);
		} finally {
			setIsSubmittingLike(false);
		}
	};

	// Handle Comment submit
	const handleCommentSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!author.trim() || !content.trim()) {
			setCommentError("Name and comment content are required.");
			return;
		}

		setCommentError("");
		setIsSubmittingComment(true);

		try {
			const res = await fetch(`/api/blogs/${slug}/comments`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					author: author.trim(),
					content: content.trim(),
				}),
			});

			if (res.ok) {
				const newComment = await res.json();
				setComments((prev) => [newComment, ...prev]);
				setContent("");
				setAuthor("");
			} else {
				const errData = await res.json();
				setCommentError(errData.error || "Failed to submit comment.");
			}
		} catch (error) {
			console.error("Error submitting comment:", error);
			setCommentError("An unexpected error occurred. Please try again.");
		} finally {
			setIsSubmittingComment(false);
		}
	};

	return (
		<div className="border-t border-dashed border-border-dashed mt-12 pt-8 px-4 font-mono">
			{/* Like Button Section */}
			<div className="flex items-center gap-4 mb-8">
				<button
					onClick={handleLike}
					disabled={isSubmittingLike}
					className={`flex items-center gap-2 px-4 py-2 border transition-all duration-150 select-none cursor-pointer ${
						isLiked
							? "bg-foreground text-background border-foreground"
							: "border-border hover:border-foreground text-text-muted"
					}`}
				>
					<svg
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill={isLiked ? "currentColor" : "none"}
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
					</svg>
					<span>{likes} {likes === 1 ? "Like" : "Likes"}</span>
				</button>
			</div>

			{/* Comments Section */}
			<div className="border-t border-dashed border-border-dashed pt-8">
				<h3 className="text-lg font-sans font-bold mb-6">
					Comments ({comments.length})
				</h3>

				{/* Comment Form */}
				<form onSubmit={handleCommentSubmit} className="flex flex-col gap-4 mb-8">
					{commentError && (
						<p className="text-xs text-red-500 border border-red-500 p-2 bg-red-50 dark:bg-red-950/20">
							⚠️ {commentError}
						</p>
					)}
					<div className="flex flex-col gap-1">
						<label htmlFor="author" className="text-xs text-text-muted uppercase tracking-widest">
							Name
						</label>
						<input
							type="text"
							id="author"
							value={author}
							onChange={(e) => setAuthor(e.target.value)}
							placeholder="Your name"
							maxLength={50}
							required
							className="border border-border px-3 py-2 text-sm focus:outline-none focus:border-foreground bg-transparent"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<label htmlFor="content" className="text-xs text-text-muted uppercase tracking-widest">
							Comment
						</label>
						<textarea
							id="content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							placeholder="Add to the discussion..."
							rows={4}
							maxLength={1000}
							required
							className="border border-border px-3 py-2 text-sm focus:outline-none focus:border-foreground bg-transparent resize-y"
						></textarea>
					</div>
					<button
						type="submit"
						disabled={isSubmittingComment}
						className="border border-border hover:border-foreground text-sm py-2 px-4 select-none hover:bg-border/20 transition-colors w-fit self-start disabled:opacity-50 cursor-pointer"
					>
						{isSubmittingComment ? "Posting..." : "Submit Comment"}
					</button>
				</form>

				{/* Comments List */}
				<div className="flex flex-col gap-4">
					{isLoadingComments ? (
						<div className="flex justify-center py-6">
							<div className="w-6 h-6 border border-current border-t-transparent animate-spin"></div>
						</div>
					) : comments.length === 0 ? (
						<p className="text-sm text-text-muted py-4 text-center">
							No comments yet. Start the conversation!
						</p>
					) : (
						comments.map((comment) => {
							const date = comment.createdAt
								? new Date(comment.createdAt).toLocaleDateString("en-US", {
										year: "numeric",
										month: "short",
										day: "numeric",
										hour: "2-digit",
										minute: "2-digit",
									})
								: "";

							return (
								<div
									key={comment.id}
									className="border border-border p-4 flex flex-col gap-2"
								>
									<div className="flex justify-between items-center text-xs">
										<span className="font-semibold text-foreground">
											{comment.author}
										</span>
										<time className="text-text-muted">{date}</time>
									</div>
									<p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
										{comment.content}
									</p>
								</div>
							);
						})
					)}
				</div>
			</div>
		</div>
	);
}
