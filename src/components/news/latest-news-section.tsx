"use client";

import { useState } from "react";
import { Clock3, LoaderCircle, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/news";

const PAGE_SIZE = 15;

export default function LatestNewsSection({
	initialNews,
	section,
	category,
}: {
	initialNews: Article[];
	section: string;
	category: string;
}) {
	const [news, setNews] = useState(initialNews);
	const [offset, setOffset] = useState(25);
	const [isLoading, setIsLoading] = useState(false);
	const [hasMore, setHasMore] = useState(initialNews.length >= PAGE_SIZE);

	async function loadMoreNews() {
		setIsLoading(true);
		try {
			const response = await fetch(
				`/api/articles?category=${encodeURIComponent(category)}&offset=${offset}&limit=${PAGE_SIZE}`,
			);
			if (!response.ok) throw new Error("Unable to load more news");
			const result: { data?: Article[] } = await response.json();
			const nextNews = result.data ?? [];
			setNews((currentNews) => [...currentNews, ...nextNews]);
			setOffset((currentOffset) => currentOffset + nextNews.length);
			setHasMore(nextNews.length === PAGE_SIZE);
		} catch {
			setHasMore(false);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<section className="border-b border-border py-8 sm:py-14">
			<div className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-7 sm:gap-5">
				<div>
					<p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-700 dark:text-orange-400">
						In sequence
					</p>
					<h2 className="font-heading text-2xl font-semibold text-foreground sm:text-4xl">
						Latest news
					</h2>
				</div>
				<span className="shrink-0 text-xs text-muted-foreground">
					{news.length} news
				</span>
			</div>
			<div className="grid gap-x-8 md:grid-cols-2 lg:grid-cols-3">
				{news.map((article, index) => (
					<SmallNews
						key={article.id}
						article={article}
						section={section}
						category={category}
						removeBorder={index >= news.length - 3}
					/>
				))}
			</div>
			{hasMore && (
				<div className="mt-8 flex justify-center sm:mt-10">
					<button
						type="button"
						onClick={loadMoreNews}
						disabled={isLoading}
						className="inline-flex max-w-full items-center gap-2 border border-border px-4 py-3 text-center text-xs font-bold text-foreground transition-colors hover:border-orange-600 hover:text-orange-800 dark:hover:border-orange-400 dark:hover:text-orange-300 disabled:cursor-wait disabled:opacity-60 sm:px-5 sm:text-sm"
					>
						{isLoading ? (
							<LoaderCircle className="size-4 animate-spin" />
						) : (
							<Plus className="size-4" />
						)}
						{isLoading ? "Loading news" : "Load more news"}
					</button>
				</div>
			)}
		</section>
	);
}

function SmallNews({
	article,
	section,
	category,
	removeBorder,
}: {
	article: Article;
	section: string;
	category: string;
	removeBorder: boolean;
}) {
	return (
		<Link
			href={`/${section}/${category}/${article.slug}`}
			className={`group grid grid-cols-[112px_1fr] gap-4 border-b border-border py-4 first:pt-0 sm:grid-cols-[140px_1fr] ${removeBorder ? "border-b-0" : ""}`}
		>
			<div className="relative aspect-4/3 overflow-hidden bg-stone-100 dark:bg-stone-800">
				<Image
					src={article.coverImage.url}
					alt={article.title}
					fill
					sizes="140px"
					className="object-cover transition duration-500 group-hover:scale-105"
				/>
			</div>
			<div>
				<p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-orange-700 dark:text-orange-400">
					{article.category?.name ?? "News"}
				</p>
				<h3 className="line-clamp-3 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-orange-800 dark:group-hover:text-orange-300">
					{article.title}
				</h3>
				<div className="mt-3 hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
					<Clock3 className="size-3.5" />
					<time dateTime={article.publishedAt}>
						{new Date(article.publishedAt).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
							year: "numeric",
						})}
					</time>
				</div>
			</div>
		</Link>
	);
}
