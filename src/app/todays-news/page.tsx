import { Article } from "@/types/news";
import { ArrowUpRight, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function TodayNews() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_MOCK_API}/articles?pageSize=30&page=6`,
	);
	const { data: news = []}: { data: Article[] } = await res.json();
	const today = new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric",
	}).format(new Date());

	return (
		<div className="min-w-0 pb-12 sm:pb-20">
			<header className="border-b-2 border-foreground py-7 sm:py-12">
				<div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
					<div className="min-w-0 border-l-2 border-orange-600 pl-4 dark:border-orange-400 sm:pl-5">
						<p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-orange-700 dark:text-orange-400">
							Daily edition
						</p>
						<h1 className="wrap-break-word font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
							Today&apos;s news
						</h1>
					</div>
					<div className="flex items-center justify-between gap-4 border-t border-border pt-4 text-xs text-muted-foreground sm:block sm:border-t-0 sm:pt-0 sm:text-right">
						<div>
							<span className="mb-1 block text-[9px] font-bold uppercase tracking-[0.18em] text-orange-700 dark:text-orange-400">
								Published
							</span>
							<time dateTime={new Date().toISOString()}>{today}</time>
						</div>
						<span className="sm:mt-2 sm:block">{news.length} updates</span>
					</div>
				</div>
			</header>

			{news.length > 0 ? (
				<>
					<section className="grid gap-7 border-b border-border py-8 sm:gap-10 sm:py-12 lg:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.85fr)] lg:gap-12">
						<LeadNews article={news[0]} />
						<aside className="border-t border-border pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
							<div className="mb-4 flex items-center justify-between border-b border-border pb-3">
								<p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-400">
									Latest updates
								</p>
							</div>
							<div>
								{news.slice(1, 7).map((article) => (
									<BriefNews key={article.id} article={article} />
								))}
							</div>
						</aside>
					</section>

					<section className="border-b border-border py-8 sm:py-12">
						<div className="mb-6 flex items-end justify-between gap-4 border-b border-border pb-5 sm:mb-8 sm:pb-6">
							<div>
								<p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-400">
									The full briefing
								</p>
								<h2 className="font-heading text-2xl font-semibold text-foreground sm:text-4xl">
									All news today
								</h2>
							</div>
							<span className="shrink-0 text-xs text-muted-foreground">
								{news.length} items
							</span>
						</div>
						<div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
							{news.map((article) => (
								<NewsCard key={article.id} article={article} />
							))}
						</div>
					</section>
				</>
			) : (
				<div className="border-b border-border py-16 text-center sm:py-24">
					<p className="text-sm text-muted-foreground">
						No news has been published today.
					</p>
				</div>
			)}
		</div>
	);
}

function articleHref(article: Article) {
	const category = article.category?.slug ?? "news";
	return `/news/${category}/${article.slug}`;
}

function formatTime(date: string) {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
	}).format(new Date(date));
}

function LeadNews({ article }: { article: Article }) {
	return (
		<Link
			href={articleHref(article)}
			className="group block min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600"
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
			</div>
			<div className="pt-4 sm:pt-6">
				<p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-400">
					{article.category?.name ?? "News"}
				</p>
				<h2 className="wrap-break-word font-heading text-2xl font-semibold leading-tight tracking-tight text-foreground transition-colors group-hover:text-orange-800 dark:group-hover:text-orange-300 sm:text-4xl lg:text-5xl">
					{article.title}
				</h2>
				{article.excerpt && (
					<p className="mt-3 max-w-2xl line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:text-base">
						{article.excerpt}
					</p>
				)}
				<NewsMeta article={article} />
			</div>
		</Link>
	);
}

function BriefNews({ article }: { article: Article }) {
	return (
		<Link
			href={articleHref(article)}
			className="group grid grid-cols-[88px_1fr] gap-3 border-b border-border py-3 first:pt-0 last:border-0 sm:grid-cols-[112px_1fr] sm:gap-4 sm:py-4"
		>
			<div className="relative aspect-4/3 overflow-hidden bg-stone-100 dark:bg-stone-800">
				<Image
					src={article.coverImage.url}
					alt={article.title}
					fill
					sizes="112px"
					className="object-cover transition duration-500 group-hover:scale-105"
				/>
			</div>
			<div className="min-w-0 self-center">
				<p className="mb-1 text-[9px] font-bold uppercase tracking-[0.16em] text-orange-700 dark:text-orange-400">
					{article.category?.name ?? "News"}
				</p>
				<h3 className="line-clamp-3 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-orange-800 dark:group-hover:text-orange-300 sm:text-[15px]">
					{article.title}
				</h3>
				<span className="mt-2 block text-[10px] text-muted-foreground">
					{formatTime(article.publishedAt)}
				</span>
			</div>
		</Link>
	);
}

function NewsCard({ article }: { article: Article }) {
	return (
		<Link
			href={articleHref(article)}
			className="group block min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600"
		>
			<div className="relative aspect-16/10 overflow-hidden bg-stone-100 dark:bg-stone-800">
				<Image
					src={article.coverImage.url}
					alt={article.title}
					fill
					sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
					className="object-cover transition duration-500 group-hover:scale-105"
				/>
			</div>
			<div className="pt-3">
				<div className="mb-2 flex items-center justify-between gap-3">
					<p className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-orange-700 dark:text-orange-400">
						{article.category?.name ?? "News"}
					</p>
					<ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-orange-700 dark:group-hover:text-orange-300" />
				</div>
				<h3 className="line-clamp-3 text-base font-bold leading-snug text-foreground transition-colors group-hover:text-orange-800 dark:group-hover:text-orange-300">
					{article.title}
				</h3>
				<NewsMeta article={article} />
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
