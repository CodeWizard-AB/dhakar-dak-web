import { client } from "@/lib/strapi/client";

export default async function Article() {
	const { data: article } = await client
		.collection("articles")
		.findOne("q8dqbyu0qbb7x9zc91475b9k", { locale: "bn", populate: "*" });

	return (
		<div>
			<h1>{article.title}</h1>
		</div>
	);
}
