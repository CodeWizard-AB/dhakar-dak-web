import { Clock3 } from "lucide-react";
import LatestNewsSection from "@/components/news/latest-news-section";
import { Article } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export default async function Category({
	params,
}: {
	params: Promise<{ section: string; category: string }>;
}) {
	const { category, section } = await params;
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_MOCK_API}/articles?category=${category}`,
	);
	const { data: news = [] }: { data: Article[] } = await res.json();
	const categoryName = category.replace(/[-_]/g, " ");
	const lead = news[0];

	if (!lead) {
		return (
			<section className="border-t border-border py-10 sm:py-16">
				<Eyebrow>Category archive</Eyebrow>
				<h1 className="wrap-break-word font-heading text-3xl font-semibold capitalize text-foreground sm:text-4xl">
					{categoryName}
				</h1>
				<p className="mt-4 text-muted-foreground">
					No news has been published here yet.
				</p>
			</section>
		);
	}

	return (
		<div className="min-w-0 pb-12 sm:pb-20">
			<section className="border-b border-border py-6 sm:py-10">
				<Eyebrow>Category archive</Eyebrow>
				<div className="flex min-w-0 flex-col justify-between gap-4 sm:flex-row sm:items-end sm:gap-6">
					<h1 className="min-w-0 wrap-break-word font-heading text-3xl font-semibold capitalize tracking-tight text-foreground sm:text-5xl lg:text-6xl">
						{categoryName}
					</h1>
					<p className="max-w-xs text-xs leading-relaxed text-muted-foreground sm:text-sm">
						A considered collection of the latest reporting and news from Daily
						Dhakar Dak.
					</p>
				</div>
			</section>

			<section className="grid gap-8 border-b border-border py-8 sm:gap-10 sm:py-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)_minmax(0,0.85fr)] lg:items-stretch lg:gap-8">
				<aside className="order-2 flex min-h-full flex-col lg:order-1">
					<div className="flex flex-1 flex-col justify-between">
						{news.slice(1, 6).map((article) => (
							<RailStory
								key={article.id}
								article={article}
								section={section}
								category={category}
							/>
						))}
					</div>
				</aside>

				<Link
					href={articleHref(section, category, lead)}
					className="group order-1 flex min-w-0 flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600 lg:order-2"
				>
					<StoryImage
						article={lead}
						sizes="(max-width: 1024px) 100vw, 50vw"
						className="aspect-4/3 sm:aspect-video"
					/>
					<div className="flex flex-1 flex-col justify-center pt-4 sm:pt-7 lg:px-3">
						<Eyebrow>{lead.category?.name ?? categoryName}</Eyebrow>
						<h2 className="max-w-4xl wrap-break-word font-heading text-2xl font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-orange-800 dark:group-hover:text-orange-300 sm:text-4xl lg:text-5xl">
							{lead.title}
						</h2>
						{lead.excerpt && (
							<p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
								{lead.excerpt}
							</p>
						)}
						<div className="mt-4 sm:mt-5">
							<StoryMeta article={lead} />
						</div>
					</div>
				</Link>

				<aside className="order-3 flex min-h-full flex-col">
					<div className="flex flex-1 flex-col justify-between">
						{news.slice(5, 10).map((article) => (
							<RailStory
								key={article.id}
								article={article}
								section={section}
								category={category}
							/>
						))}
					</div>
				</aside>
			</section>

			<LatestNewsSection
				initialNews={news.slice(10, 25)}
				section={section}
				category={category}
			/>
		</div>
	);
}

function articleHref(section: string, category: string, article: Article) {
	return `/${section}/${category}/${article.slug}`;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
	return (
		<p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-700 dark:text-orange-400">
			{children}
		</p>
	);
}

function StoryMeta({ article }: { article: Article }) {
	return (
		<div className="flex items-center gap-2 text-xs text-muted-foreground">
			<Clock3 className="size-3.5" />
			<time dateTime={article.publishedAt}>
				{formatDate(article.publishedAt)}
			</time>
		</div>
	);
}

function StoryImage({
	article,
	sizes,
	className = "",
}: {
	article: Article;
	sizes: string;
	className?: string;
}) {
	return (
		<div
			className={`relative overflow-hidden bg-stone-100 dark:bg-stone-800 ${className}`}
		>
			<Image
				src={article.coverImage.url}
				alt={article.title}
				fill
				sizes={sizes}
				className="object-cover transition duration-500 group-hover:scale-105"
			/>
		</div>
	);
}

function RailStory({
	article,
	section,
	category,
}: {
	article: Article;
	section: string;
	category: string;
}) {
	return (
		<Link
			href={articleHref(section, category, article)}
			className="group grid min-h-0 grid-cols-[88px_1fr] gap-3 border-b border-border py-3 first:pt-0 last:border-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600 sm:grid-cols-[104px_1fr]"
		>
			<StoryImage
				article={article}
				sizes="104px"
				className="aspect-4/3 self-start"
			/>
			<div className="min-w-0 self-center">
				<div className="mb-1 flex items-center justify-between gap-2">
					<p className="text-[10px] font-bold uppercase tracking-[0.16em] text-orange-700 dark:text-orange-400">
						{article.category?.name ?? "News"}
					</p>
				</div>
				<h3 className="line-clamp-3 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-orange-800 dark:group-hover:text-orange-300 sm:text-[15px]">
					{article.title}
				</h3>
				<span className="mt-2 block text-[10px] text-muted-foreground">
					{formatDate(article.publishedAt)}
				</span>
			</div>
		</Link>
	);
}
