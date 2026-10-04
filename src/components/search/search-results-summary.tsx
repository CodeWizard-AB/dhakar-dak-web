export function SearchResultsSummary({
	query,
	total,
	isSearching,
	hasError,
	locale,
}: {
	query: string;
	total: number;
	isSearching: boolean;
	hasError: boolean;
	locale: "bn" | "en";
}) {
	const formatter = new Intl.NumberFormat(locale === "bn" ? "bn-BD" : "en-US");

	return (
		<div className="mb-5 flex flex-wrap items-end justify-between gap-2 border-b border-border pb-4">
			<div>
				<p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-700 dark:text-orange-400">
					{hasError
						? "Search unavailable"
						: isSearching
							? "Search results"
							: "Start exploring"}
				</p>
				<h2 className="mt-1 font-heading text-xl font-semibold tracking-tight sm:text-2xl">
					{query ? (
						<>
							Results for <span className="break-all">“{query}”</span>
						</>
					) : isSearching ? (
						"Filtered news"
					) : (
						"Discover the archive"
					)}
				</h2>
			</div>
			{isSearching && !hasError && (
				<p className="text-xs text-muted-foreground">
					{formatter.format(total)} {total === 1 ? "story" : "stories"}
				</p>
			)}
		</div>
	);
}
