"use client";

import { useState, type ChangeEvent } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchDateFilter } from "@/components/search/search-date-filter";
import type { SearchOptions } from "@/components/search/search-types";

export function SearchSearchForm({
	query,
	category,
	date,
	division,
	district,
	options,
}: {
	query: string;
	category: string;
	date: string;
	division: string;
	district: string;
	options: SearchOptions;
}) {
	const [selectedDivision, setSelectedDivision] = useState(division);
	const [selectedDistrict, setSelectedDistrict] = useState(district);
	const districtOptions = options.districts[selectedDivision] ?? [];

	function handleDivisionChange(event: ChangeEvent<HTMLSelectElement>) {
		setSelectedDivision(event.currentTarget.value);
		setSelectedDistrict("");
	}

	return (
		<section className="border-b border-border bg-muted/30 px-4 py-5 sm:px-6 sm:py-7">
			<form action="/search" method="get" className="mx-auto max-w-6xl">
				<label htmlFor="search-query" className="sr-only">
					Search articles
				</label>
				<div className="flex flex-col gap-2 sm:flex-row">
					<div className="relative min-w-0 flex-1">
						<Search
							className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
							aria-hidden="true"
						/>
						<input
							id="search-query"
							type="search"
							name="q"
							defaultValue={query}
							maxLength={120}
							placeholder="Search headlines, topics or keywords…"
							className="h-14 w-full border border-border bg-background pr-4 pl-12 text-sm outline-none transition focus-visible:border-orange-700 focus-visible:ring-2 focus-visible:ring-orange-700/20"
						/>
					</div>
					<Button
						type="submit"
						className="h-14 gap-2 bg-orange-700 px-7 text-xs text-white hover:bg-orange-800"
					>
						<Search className="size-4" aria-hidden="true" />
						Search
					</Button>
				</div>

				<div className="mt-5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
					<SlidersHorizontal className="size-3.5" aria-hidden="true" />
					<span>Refine your search</span>
					<span className="hidden h-px flex-1 bg-border sm:block" />
				</div>

				<div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					<label className="block min-w-0">
						<span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
							Section
						</span>
						<select
							name="category"
							defaultValue={category}
							className="h-10 w-full appearance-none border border-border bg-background px-3 text-xs outline-none focus-visible:border-orange-700 focus-visible:ring-2 focus-visible:ring-orange-700/20"
						>
							<option value="">All sections</option>
							{options.categories.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</label>

					<label className="block min-w-0">
						<span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
							Division
						</span>
						<select
							name="division"
							value={selectedDivision}
							onChange={handleDivisionChange}
							className="h-10 w-full appearance-none border border-border bg-background px-3 text-xs outline-none focus-visible:border-orange-700 focus-visible:ring-2 focus-visible:ring-orange-700/20"
						>
							<option value="">All divisions</option>
							{options.divisions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</label>

					<label className="block min-w-0">
						<span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
							District
						</span>
						<select
							name="district"
							value={selectedDistrict}
							onChange={(event) => setSelectedDistrict(event.currentTarget.value)}
							disabled={!selectedDivision}
							className="h-10 w-full appearance-none border border-border bg-background px-3 text-xs outline-none disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground focus-visible:border-orange-700 focus-visible:ring-2 focus-visible:ring-orange-700/20"
						>
							<option value="">All districts</option>
							{districtOptions.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</label>

					<SearchDateFilter value={date} />
				</div>
				<p className="mt-3 text-[11px] text-muted-foreground">
					Location options are sample filters while article location data is
					being prepared.
				</p>
			</form>
		</section>
	);
}
