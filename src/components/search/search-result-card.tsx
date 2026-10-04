import Image from "next/image";
import Link from "next/link";
import { Clock3 } from "lucide-react";
import { navigationItems } from "@/lib/constants/navigation-data";
import type { SearchArticle } from "@/components/search/search-types";

function articleHref(article: SearchArticle) {
	const categorySlug = article.category?.slug;
	const categoryPath = navigationItems
		.flatMap((section) => section.children ?? [])
		.find(
			(category) =>
				category.href.split("/").filter(Boolean).at(-1) === categorySlug,
		)?.href;

	return categoryPath
		? `${categoryPath}/${article.slug}`
		: `/search?q=${encodeURIComponent(article.title)}`;
}

function imageSource(url: string) {
	if (/^https?:\/\//i.test(url)) return url;
	const baseUrl =
		process.env.NEXT_PUBLIC_STRAPI_BASE_URL ??
		process.env.NEXT_PUBLIC_STRAPI_URL?.replace(/\/api\/?$/, "") ??
		"";
	return `${baseUrl}${url}`;
}

export function SearchResultCard({ article }: { article: SearchArticle }) {
	const imageUrl = article.coverImage?.url;

	return (
		<article className="group grid min-w-0 gap-4 border-b border-border py-5 first:pt-0 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6 sm:py-6">
			<Link
				href={articleHref(article)}
				tabIndex={-1}
				aria-hidden="true"
				className="relative aspect-16/10 overflow-hidden bg-muted sm:aspect-4/3"
			>
				{imageUrl ? (
					<Image
						src={imageSource(imageUrl)}
						alt=""
						fill
						unoptimized
						sizes="(max-width: 640px) 100vw, 180px"
						className="object-cover transition duration-500 group-hover:scale-105"
					/>
				) : (
					<div className="flex size-full items-center justify-center text-xs font-bold uppercase tracking-widest text-muted-foreground">
						Daily Dhakar Daak
					</div>
				)}
			</Link>
			<div className="flex min-w-0 flex-col justify-center">
				<div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] font-bold uppercase tracking-[0.15em] text-orange-700 dark:text-orange-400">
					<span>{article.category?.name ?? "News"}</span>
					{article.publishedAt && (
						<time
							dateTime={article.publishedAt}
							className="inline-flex items-center gap-1.5 font-medium tracking-normal text-muted-foreground"
						>
							<Clock3 className="size-3" aria-hidden="true" />
							{new Date(article.publishedAt).toLocaleDateString(undefined, {
								month: "short",
								day: "numeric",
								year: "numeric",
							})}
						</time>
					)}
				</div>
				<Link
					href={articleHref(article)}
					className="w-fit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600"
				>
					<h3 className="line-clamp-3 font-heading text-lg font-semibold leading-snug tracking-tight transition-colors group-hover:text-orange-800 dark:group-hover:text-orange-300 sm:text-xl">
						{article.title}
					</h3>
				</Link>
				{article.excerpt && (
					<p className="mt-2 line-clamp-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
						{article.excerpt}
					</p>
				)}
			</div>
		</article>
	);
}
