import { marked } from "marked";

interface MarkdownRendererProps {
	content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
	const html = marked.parse(content, {
		gfm: true,
		breaks: true,
	}) as string;

	return (
		<div
			className="blog-prose"
			dangerouslySetInnerHTML={{ __html: html }}
		/>
	);
}
