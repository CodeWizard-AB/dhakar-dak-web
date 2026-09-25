import { Clock3, Radio } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Article } from "@/types/news";
import BreakingDeskSection from "@/components/news/breaking-desk-section";

export default async function BreakingNews() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_MOCK_API}/articles?pageSize=50&page=6`,
	);
	const { data: news = [] }: { data: Article[] } = await res.json();
	const lead = news[0];

	return (
		<div className="min-w-0 pb-12 sm:pb-20">
			<section className="border-b-2 border-red-600 py-7 dark:border-red-500 sm:py-10">
				<div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
					<div className="min-w-0">
						<div className="mb-4 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-red-700 dark:text-red-400">
							<span className="relative flex size-2">
								<span className="absolute inline-flex size-full animate-ping rounded-full bg-red-500 opacity-75" />
								<span className="relative inline-flex size-2 rounded-full bg-red-600 dark:bg-red-400" />
							</span>
							Live desk
						</div>
						<h1 className="wrap-break-word font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
							Breaking news
						</h1>
					</div>
					<div className="flex items-center justify-between gap-4 border-t border-border pt-4 text-xs text-muted-foreground sm:block sm:border-0 sm:pt-0 sm:text-right">
						<span className="block">Updated continuously</span>
						<span className="mt-1 block">
							{news.length} updates in this feed
						</span>
					</div>
				</div>
			</section>

			{lead ? (
				<>
					<section className="grid gap-8 border-b border-border py-8 sm:py-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(260px,0.75fr)] lg:gap-10">
						<BreakingLead article={lead} />
						<aside className="bg-red-50 p-5 dark:bg-red-950/25 sm:p-6">
							<div className="mb-5 flex items-center gap-2 border-b border-red-200 pb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-red-700 dark:border-red-900 dark:text-red-400">
								<Radio className="size-4" /> Just in
							</div>
							{news.slice(1, 9).map((article) => (
								<AlertNews key={article.id} article={article} />
							))}
						</aside>
					</section>

					<LiveNewsFeed news={news.slice(5, 20)} />

					<BreakingDeskSection news={news.slice(20)} />
				</>
			) : (
				<div className="border-b border-border py-20 text-center text-sm text-muted-foreground">
					No breaking news is available right now.
				</div>
			)}
		</div>
	);
}

function articleHref(article: Article) {
	return `/news/${article.category?.slug ?? "news"}/${article.slug}`;
}

function formatTime(date: string) {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
	}).format(new Date(date));
}

function BreakingLead({ article }: { article: Article }) {
	return (
		<Link
			href={articleHref(article)}
			className="group block min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-600"
		>
			<div className="relative aspect-16/10 overflow-hidden bg-stone-100 dark:bg-stone-800 sm:aspect-video">
				<Image
					src={article.coverImage.url}
					alt={article.title}
					fill
					priority
					sizes="(max-width: 1024px) 100vw, 65vw"
					className="object-cover transition duration-500 group-hover:scale-105"
				/>
				<div className="absolute left-3 top-3 inline-flex items-center gap-2 bg-red-600 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white dark:bg-red-500">
					Urgent update
				</div>
			</div>
			<div className="pt-5 sm:pt-6">
				<p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-red-700 dark:text-red-400">
					{article.category?.name ?? "News"}
				</p>
				<h2 className="wrap-break-word font-heading text-2xl font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-red-700 dark:group-hover:text-red-300 sm:text-4xl lg:text-5xl">
					{article.title}
				</h2>
				{article.excerpt && (
					<p className="mt-4 max-w-2xl line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
						{article.excerpt}
					</p>
				)}
				<NewsMeta article={article} />
			</div>
		</Link>
	);
}

function AlertNews({ article }: { article: Article }) {
	return (
		<Link
			href={articleHref(article)}
			className="group block border-b border-red-200 py-4 first:pt-0 last:border-0 dark:border-red-900"
		>
			<div className="mb-2 flex items-center justify-between gap-3 text-[10px] text-red-700 dark:text-red-400">
				<span className="font-bold uppercase tracking-[0.14em]">
					{article.category?.name ?? "News"}
				</span>
				<span>{formatTime(article.publishedAt)}</span>
			</div>
			<h3 className="line-clamp-3 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-red-700 dark:group-hover:text-red-300">
				{article.title}
			</h3>
		</Link>
	);
}

function LiveNewsFeed({ news }: { news: Article[] }) {
	return (
		<section className="border-b border-border py-8 sm:py-12">
			<div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
				<div>
					<p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-red-700 dark:text-red-400">
						Live updates
					</p>
					<h2 className="font-heading text-2xl font-semibold text-foreground sm:text-4xl">
						As it develops
					</h2>
				</div>
				<span className="shrink-0 text-xs text-muted-foreground">
					{news.length} updates
				</span>
			</div>
			<div className="grid gap-x-8 md:grid-cols-2 lg:grid-cols-3">
				{news.map((article) => (
					<TimelineNews key={article.id} article={article} />
				))}
			</div>
		</section>
	);
}

function TimelineNews({ article }: { article: Article }) {
	return (
		<Link
			href={articleHref(article)}
			className="group relative grid grid-cols-[28px_1fr] gap-3 border-l border-border pb-7 pl-5 last:pb-0"
		>
			<span className="absolute -left-1.25 top-0 size-2.5 rounded-full border-2 border-background bg-red-600 dark:bg-red-400" />
			<span className="text-[10px] font-medium text-muted-foreground">
				{formatTime(article.publishedAt)}
			</span>
			<div>
				<p className="mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-red-700 dark:text-red-400">
					{article.category?.name ?? "News"}
				</p>
				<h3 className="line-clamp-3 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-red-700 dark:group-hover:text-red-300">
					{article.title}
				</h3>
			</div>
		</Link>
	);
}

function NewsMeta({ article }: { article: Article }) {
	return (
		<div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
			<Clock3 className="size-3.5" />
			<time dateTime={article.publishedAt}>
				{formatTime(article.publishedAt)}
			</time>
		</div>
	);
}
