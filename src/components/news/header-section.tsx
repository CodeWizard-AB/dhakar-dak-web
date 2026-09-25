import Link from "next/link";
import { Button } from "../ui/button";
import { Category } from "@/types/news";

export default async function HeaderSection({
	categories,
	section,
}: {
	categories: Category[];
	section: string;
}) {
	return (
		<nav className="flex flex-wrap items-center gap-2">
			{categories?.map(
				(category: Category) => (
					<Button
						key={category.id}
						variant="ghost"
						render={<Link href={`/${section}/${category.slug}`} />}
						nativeButton={false}
					>
						{category.name}
					</Button>
				),
			)}
		</nav>
	);
}
