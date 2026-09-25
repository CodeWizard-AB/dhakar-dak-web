import { Article } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function CategoryNewsSection({
	category,
	section,
}: {
	category: string;
	section: string;
}) {
	const { data: news }: { data: Article[] } = await fetch(
		`${process.env.NEXT_PUBLIC_MOCK_API}/articles?category=${category}`,
	).then((res) => res.json());

	return (
		<section className="border-t border-stone-200 py-10 sm:py-14">
			<header className="mb-7 flex items-end justify-between gap-4 sm:mb-9">
				<div>
					<p className="mb-2 text-xs font-bold uppercase tracking-[0.22em] text-orange-700">
						Latest coverage
					</p>
					<h2 className="font-heading text-3xl font-semibold capitalize tracking-tight text-stone-950 sm:text-4xl">
						{category.replace(/[-_]/g, " ")}
					</h2>
				</div>
				<div className="hidden h-px flex-1 bg-stone-200 sm:block" />
			</header>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
				{news.slice(0, 8).map((article) => (
					<NewsCard
						key={article.id}
						article={article}
						section={section}
						category={category}
					/>
				))}
			</div>
			{news.length > 8 && (
				<div className="mt-8 flex justify-center">
					<Link
						href={`/${section}/${category}`}
						className="group inline-flex items-center gap-2 border-b-2 border-orange-600 pb-1 text-sm font-bold text-stone-950 transition-colors hover:border-orange-800 hover:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600"
					>
						Read more {category.replace(/[-_]/g, " ")}
						<ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
					</Link>
				</div>
			)}
		</section>
	);
}

function NewsCard({
	article,
	section,
	category,
}: {
	article: Article;
	section: string;
	category: string;
}) {
	return (
		<article className="group transition duration-300 focus-within:ring-2 focus-within:ring-orange-600 focus-within:ring-offset-2">
			<Link
				href={`/${section}/${category}/${article.slug}`}
				className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600"
			>
				<figure className="relative aspect-16/10 overflow-hidden bg-stone-100">
					<Image
						src={article.coverImage.url}
						alt={article.title}
						fill
						sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
						className="object-cover transition duration-500 group-hover:scale-105"
					/>
					<div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-black/35 to-transparent" />
				</figure>
				<div className="pt-4">
					<div className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-700">
						<span className="h-1.5 w-1.5 rounded-full bg-orange-600" />
						{article.category?.name ?? "News"}
					</div>
					<h3 className="line-clamp-3 text-lg font-bold leading-snug text-stone-950 transition-colors group-hover:text-orange-800">
						{article.title}
					</h3>
					{article.excerpt && (
						<p className="mt-3 line-clamp-2 text-sm leading-relaxed text-stone-600">
							{article.excerpt}
						</p>
					)}
					<time
						dateTime={article.publishedAt}
						className="mt-5 block border-t border-stone-100 pt-3 text-xs font-medium text-stone-500"
					>
						{new Date(article.publishedAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "short",
							day: "numeric",
						})}
					</time>
				</div>
			</Link>
		</article>
	);
}
