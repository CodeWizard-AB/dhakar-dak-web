"use client";

import { useState } from "react";
import { ArrowUpRight, Clock3, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/news";

const PAGE_SIZE = 12;

export default function BreakingDeskSection({ news }: { news: Article[] }) {
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
	const visibleNews = news.slice(0, visibleCount);
	const hasMore = visibleCount < news.length;

	return (
		<section className="border-b border-border py-8 sm:py-12">
			<div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-5 sm:mb-8 sm:pb-6">
				<div>
					<p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-red-700 dark:text-red-400">More alerts</p>
					<h2 className="font-heading text-2xl font-semibold text-foreground sm:text-4xl">The breaking desk</h2>
				</div>
				<span className="shrink-0 text-xs text-muted-foreground">{news.length} updates</span>
			</div>
			<div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{visibleNews.map((article) => <BreakingCard key={article.id} article={article} />)}
			</div>
			{hasMore && (
				<div className="mt-8 flex justify-center sm:mt-10">
					<button
						type="button"
						onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
						className="inline-flex max-w-full items-center gap-2 border border-border px-4 py-3 text-center text-xs font-bold text-foreground transition-colors hover:border-red-600 hover:text-red-700 dark:hover:border-red-400 dark:hover:text-red-300 sm:px-5 sm:text-sm"
					>
						<Plus className="size-4" />
						Load more news
					</button>
				</div>
			)}
		</section>
	);
}

function BreakingCard({ article }: { article: Article }) {
	return (
		<Link href={`/news/${article.category?.slug ?? "news"}/${article.slug}`} className="group block min-w-0">
			<div className="relative aspect-16/10 overflow-hidden bg-stone-100 dark:bg-stone-800">
				<Image src={article.coverImage.url} alt={article.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition duration-500 group-hover:scale-105" />
			</div>
			<div className="pt-3">
				<div className="mb-2 flex items-center justify-between gap-3">
					<p className="truncate text-[10px] font-bold uppercase tracking-[0.15em] text-red-700 dark:text-red-400">{article.category?.name ?? "News"}</p>
					<ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-red-700 dark:group-hover:text-red-300" />
				</div>
				<h3 className="line-clamp-3 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-red-700 dark:group-hover:text-red-300">{article.title}</h3>
				<div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
					<Clock3 className="size-3.5" />
					<time dateTime={article.publishedAt}>{new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(new Date(article.publishedAt))}</time>
				</div>
			</div>
		</Link>
	);
}
