import { SearchResultCard } from "@/components/search/search-result-card";
import type { SearchArticle } from "@/components/search/search-types";

export function SearchResults({
	articles,
	query,
	isSearching,
	hasError,
}: {
	articles: SearchArticle[];
	query: string;
	isSearching: boolean;
	hasError: boolean;
}) {
	if (hasError) {
		return (
			<div
				role="alert"
				className="border border-destructive/30 bg-destructive/5 px-5 py-8 text-center sm:py-10"
			>
				<h3 className="font-heading text-lg font-semibold">
					We couldn’t load the search results
				</h3>
				<p className="mt-2 text-sm text-muted-foreground">
					Please try again in a moment.
				</p>
			</div>
		);
	}

	if (!isSearching) {
		return (
			<div className="border border-dashed border-border px-5 py-10 text-center">
				<p className="text-sm text-muted-foreground">
					Enter a keyword or choose a section or date to search the archive.
				</p>
			</div>
		);
	}

	if (articles.length === 0) {
		return (
			<div className="border border-dashed border-border px-5 py-10 text-center">
				<h3 className="font-heading text-lg font-semibold">No stories found</h3>
				<p className="mt-2 text-sm text-muted-foreground">
					{query
						? `We couldn’t find stories matching “${query}”. Try another keyword or adjust your filters.`
						: "Try adjusting your filters to find more stories."}
				</p>
			</div>
		);
	}

	return (
		<div aria-live="polite">
			{articles.map((article) => (
				<SearchResultCard key={article.id} article={article} />
			))}
		</div>
	);
}
