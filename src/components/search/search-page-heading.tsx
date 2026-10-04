import { Search } from "lucide-react";

export function SearchPageHeading() {
	return (
		<header className="border-b border-border py-8 sm:py-12">
			<p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-orange-700 dark:text-orange-400">
				Daily Dhakar Daak · Archive
			</p>
			<div className="flex items-start gap-3 sm:gap-5">
				<div className="mt-1 hidden size-12 shrink-0 items-center justify-center border border-border sm:flex">
					<Search className="size-5" aria-hidden="true" />
				</div>
				<div>
					<h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
						Search the news
					</h1>
					<p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
						Find the latest reporting across Bangladesh and around the world.
						Search by keyword or narrow the archive with filters.
					</p>
				</div>
			</div>
		</header>
	);
}
