import Image from "next/image";
import type { ReactNode } from "react";
import { Article, RichTextNode } from "@/types/news";
import { formatDate } from "@/lib/utils";

export default async function ArticleContent({
	article,
}: {
	article: Article;
}) {
	return (
		<article className="min-w-0">
			<header className="border-b border-border pb-6 sm:pb-8">
				<p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-700 dark:text-orange-400">
					{article.category?.name ?? "News"}
				</p>
				<h1 className="wrap-break-word font-heading text-3xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
					{article.title}
				</h1>
				{article.excerpt && (
					<p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
						{article.excerpt}
					</p>
				)}
				<time
					dateTime={article.publishedAt}
					className="mt-5 block text-xs text-muted-foreground"
				>
					Published {formatDate(article.publishedAt)}
				</time>
			</header>

			<div className="relative mt-6 aspect-video overflow-hidden bg-stone-100 dark:bg-stone-800 sm:mt-8">
				<Image
					src={process.env.NEXT_PUBLIC_STRAPI_BASE_URL + article.coverImage.url}
					alt={article.title}
					fill
					sizes="(max-width: 1024px) 100vw, 66vw"
					className="object-cover"
					unoptimized
				/>
			</div>

			<div className="mt-8 text-[17px] leading-[1.75] text-stone-700 dark:text-stone-300 sm:mt-10 sm:text-lg">
				<RichTextContent content={article.content} />
			</div>
		</article>
	);
}

function RichTextContent({ content }: { content: Article["content"] }) {
	if (typeof content === "string") {
		const paragraphs = content.split(/\n\s*\n/).filter(Boolean);
		return paragraphs.length > 0 ? (
			paragraphs.map((paragraph, index) => (
				<p key={index} className="mb-4 last:mb-0">
					{paragraph}
				</p>
			))
		) : (
			<p className="mb-4 last:mb-0">Article content will be provided here.</p>
		);
	}

	if (Array.isArray(content) && content.length > 0) {
		return content.map((node, index) => renderRichTextNode(node, index));
	}

	return (
		<p className="mb-4 last:mb-0">Article content will be provided here.</p>
	);
}

function renderRichTextNode(node: RichTextNode, index: number): ReactNode {
	const children = node.children?.map((child, childIndex) =>
		renderRichTextNode(child, childIndex),
	);
	const content = node.text ?? children;

	switch (node.type) {
		case "text":
			return node.text ?? "";
		case "heading":
			switch (node.level) {
				case 1:
					return (
						<h1
							key={index}
							className="mb-5 mt-10 text-2xl font-bold leading-tight text-foreground first:mt-0 sm:text-3xl"
						>
							{content}
						</h1>
					);
				case 3:
					return (
						<h3
							key={index}
							className="mb-4 mt-9 text-xl font-bold leading-tight text-foreground first:mt-0"
						>
							{content}
						</h3>
					);
				case 4:
					return (
						<h4
							key={index}
							className="mb-3 mt-8 text-lg font-bold leading-tight text-foreground first:mt-0"
						>
							{content}
						</h4>
					);
				default:
					return (
						<h2
							key={index}
							className="mb-5 mt-10 text-2xl font-bold leading-tight text-foreground first:mt-0 sm:text-3xl"
						>
							{content}
						</h2>
					);
			}
		case "list":
			return node.format === "ordered" ? (
				<ol
					key={index}
					className="mb-7 list-decimal space-y-2 pl-6 marker:text-orange-700"
				>
					{children}
				</ol>
			) : (
				<ul
					key={index}
					className="mb-7 list-disc space-y-2 pl-6 marker:text-orange-700"
				>
					{children}
				</ul>
			);
		case "list-item":
			return <li key={index}>{content}</li>;
		case "blockquote":
			return (
				<blockquote
					key={index}
					className="mb-7 border-l-4 border-orange-600 bg-orange-50/70 px-5 py-4 text-lg italic leading-relaxed text-stone-700 dark:bg-orange-950/20 dark:text-stone-300"
				>
					{content}
				</blockquote>
			);
		case "link":
			return (
				<a
					key={index}
					href={node.url}
					className="font-medium text-orange-800 underline decoration-orange-300 underline-offset-4 transition-colors hover:text-orange-600 dark:text-orange-300 dark:decoration-orange-700"
				>
					{content}
				</a>
			);
		case "paragraph":
		default:
			return (
				<p key={index} className="mb-4 last:mb-0">
					{content}
				</p>
			);
	}
}
