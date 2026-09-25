import { client } from "@/lib/strapi/client";
import ArticleContent from "@/components/article/article-content";
import LatestArticleNews from "@/components/article/latest-article-news";
import RelatedArticleNews from "@/components/article/related-article-news";
import type { Article as ArticleData } from "@/types/news";

export default async function Article({
	params,
}: {
	params: Promise<{ section: string; category: string; article: string }>;
}) {
	const { category, section } = await params;
	const { data: articleDocument } = await client
		.collection("articles")
		.findOne("q8dqbyu0qbb7x9zc91475b9k", { locale: "bn", populate: "*" });
	const article = articleDocument as unknown as ArticleData;

	return (
		<div className="grid min-w-0 gap-10 py-8 sm:gap-12 sm:py-12 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] lg:gap-14">
			<ArticleContent article={article} />
			<aside className="min-w-0 lg:border-l lg:border-border lg:pl-8">
				<LatestArticleNews section={section} category={category} />
				<RelatedArticleNews section={section} category={category} />
			</aside>
		</div>
	);
}
