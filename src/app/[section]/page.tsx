import CategoryNewsSection from "@/components/section/category-news-section";
import HeaderSection from "@/components/section/header-section";
import { Category } from "@/types/news";

export default async function Section({
	params,
}: {
	params: Promise<{ section: string }>;
}) {
	const { section } = await params;

	const res = await fetch(
		`${process.env.NEXT_PUBLIC_MOCK_API}/sections/${section}/categories`,
	);
	const { data: categories } = await res.json();

	return (
		<div>
			<HeaderSection section={section} categories={categories} />
			{categories.map((category: Category) => (
				<CategoryNewsSection
					key={category.id}
					category={category.slug}
					section={section}
				/>
			))}
		</div>
	);
}
