import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/news";
import { formatDate } from "@/lib/utils";

export default async function LatestArticleNews({
	section,
	category,
}: {
	section: string;
	category: string;
}) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_MOCK_API}/articles?category=${category}`,
	);
	const { data: articles = [] }: { data: Article[] } = await res.json();

	return (
		<section
			aria-labelledby="latest-article-news"
			className="border-b border-border pb-7"
		>
			<h2
				id="latest-article-news"
				className="mb-4 font-heading text-2xl font-semibold text-foreground"
			>
				Latest news
			</h2>
			<div>
				{articles.slice(0, 7).map((article) => (
					<Link
						key={article.id}
						href={`/${section}/${category}/${article.slug}`}
						className="group grid grid-cols-[minmax(0,1fr)_88px] gap-3 border-t border-border py-4 first:border-t-0 first:pt-0"
					>
						<div className="min-w-0">
							<p className="mb-1 text-[10px] font-bold uppercase tracking-[0.16em] text-orange-700 dark:text-orange-400">
								{article.category?.name ?? "News"}
							</p>
							<h3 className="line-clamp-3 text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-orange-800 dark:group-hover:text-orange-300">
								{article.title}
							</h3>
							<time
								className="mt-2 block text-[10px] text-muted-foreground"
								dateTime={article.publishedAt}
							>
								{formatDate(article.publishedAt)}
							</time>
						</div>
						<div className="relative min-h-full overflow-hidden bg-stone-100 dark:bg-stone-800">
							<Image
								src={article.coverImage.url}
								alt={article.title}
								fill
								sizes="88px"
								className="object-cover transition duration-500 group-hover:scale-105"
							/>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
