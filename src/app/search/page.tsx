import { cookies } from "next/headers";
import { SearchPageHeading } from "@/components/search/search-page-heading";
import { SearchPagination } from "@/components/search/search-pagination";
import { SearchResults } from "@/components/search/search-results";
import { SearchResultsSummary } from "@/components/search/search-results-summary";
import { SearchSearchForm } from "@/components/search/search-search-form";
import { getSearchOptions } from "@/components/search/search-options";
import { client } from "@/lib/strapi/client";
import type { SearchArticle } from "@/components/search/search-types";

type SearchParams = {
	q?: string | string[];
	category?: string | string[];
	date?: string | string[];
	division?: string | string[];
	district?: string | string[];
	page?: string | string[];
};

const PAGE_SIZE = 10;

function firstValue(value: string | string[] | undefined) {
	return typeof value === "string" ? value : "";
}

function validDate(value: string) {
	if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return "";

	const date = new Date(`${value}T00:00:00.000Z`);
	return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
		? value
		: "";
}

function parsePage(value: string) {
	if (!/^\d+$/.test(value)) return 1;
	const page = Number(value);
	return Number.isSafeInteger(page) && page > 0 ? Math.min(page, 1000) : 1;
}

export default async function SearchPage({
	searchParams,
}: {
	searchParams: Promise<SearchParams>;
}) {
	const params = await searchParams;
	const options = getSearchOptions();
	const query = firstValue(params.q).trim().slice(0, 120);
	const requestedCategory = firstValue(params.category);
	const category = options.categories.some(
		(option) => option.value === requestedCategory,
	)
		? requestedCategory
		: "";
	const date = validDate(firstValue(params.date));
	const requestedDivision = firstValue(params.division);
	const division = options.divisions.some(
		(option) => option.value === requestedDivision,
	)
		? requestedDivision
		: "";
	const requestedDistrict = firstValue(params.district);
	const district =
		division &&
		options.districts[division]?.some(
			(option) => option.value === requestedDistrict,
		)
			? requestedDistrict
			: "";
	const page = parsePage(firstValue(params.page));
	const hasSearch = Boolean(query || category || date);
	const cookieStore = await cookies();
	const localeCookie = cookieStore.get("locale")?.value;
	const locale = localeCookie === "bn" ? "bn" : "en";

	let articles: SearchArticle[] = [];
	let total = 0;
	let totalPages = 0;
	let hasError = false;

	if (hasSearch) {
		const filters: Record<string, unknown> = {};

		if (query) {
			filters.$or = [
				{ title: { $containsi: query } },
				{ excerpt: { $containsi: query } },
			];
		}
		if (category) {
			filters.category = { slug: { $eq: category } };
		}
		if (date) {
			const nextDay = new Date(`${date}T00:00:00.000Z`);
			nextDay.setUTCDate(nextDay.getUTCDate() + 1);
			filters.publishedAt = {
				$gte: `${date}T00:00:00.000Z`,
				$lt: nextDay.toISOString(),
			};
		}

		try {
			const response = await client.collection("articles").find({
				filters,
				locale,
				populate: ["category", "coverImage"],
				pagination: { page, pageSize: PAGE_SIZE, withCount: true },
				sort: ["publishedAt:desc"],
				status: "published",
			});

			articles = response.data as SearchArticle[];
			total = response.meta.pagination?.total ?? articles.length;
			totalPages = Math.ceil(total / PAGE_SIZE);
		} catch (error) {
			console.error("Unable to fetch search results from Strapi:", error);
			hasError = true;
		}
	}

	return (
		<div className="min-w-0 pb-12 sm:pb-20">
			<SearchPageHeading />
			<SearchSearchForm
				key={`${query}:${category}:${date}:${division}:${district}`}
				query={query}
				category={category}
				date={date}
				division={division}
				district={district}
				options={options}
			/>
			<section className="py-8 sm:py-10">
				<SearchResultsSummary
					query={query}
					total={total}
					isSearching={hasSearch}
					hasError={hasError}
					locale={locale}
				/>
				<SearchResults
					articles={articles}
					query={query}
					isSearching={hasSearch}
					hasError={hasError}
				/>
				{!hasError && totalPages > 1 && (
					<SearchPagination
						page={page}
						totalPages={totalPages}
						query={query}
						category={category}
						date={date}
						division={division}
						district={district}
					/>
				)}
			</section>
		</div>
	);
}
