import Link from "next/link";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

function pageHref(
	page: number,
	filters: {
		query: string;
		category: string;
		date: string;
		division: string;
		district: string;
	},
) {
	const params = new URLSearchParams();
	if (filters.query) params.set("q", filters.query);
	if (filters.category) params.set("category", filters.category);
	if (filters.date) params.set("date", filters.date);
	if (filters.division) params.set("division", filters.division);
	if (filters.district) params.set("district", filters.district);
	params.set("page", String(page));
	return `/search?${params.toString()}`;
}

export function SearchPagination({
	page,
	totalPages,
	query,
	category,
	date,
	division,
	district,
}: {
	page: number;
	totalPages: number;
	query: string;
	category: string;
	date: string;
	division: string;
	district: string;
}) {
	const start = Math.max(1, Math.min(page - 2, totalPages - 4));
	const end = Math.min(totalPages, start + 4);
	const filters = { query, category, date, division, district };

	return (
		<div className="mt-8 border-t border-border pt-6">
			<Pagination>
				<PaginationContent className="flex-wrap">
					{page > 1 && (
						<PaginationItem>
							<PaginationPrevious
								href={pageHref(page - 1, filters)}
								text="Previous"
							/>
						</PaginationItem>
					)}
					{start > 1 && (
						<>
							<PaginationItem>
								<PaginationLink href={pageHref(1, filters)}>
									1
								</PaginationLink>
							</PaginationItem>
							{start > 2 && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}
						</>
					)}
					{Array.from({ length: end - start + 1 }, (_, index) => start + index).map(
						(pageNumber) => (
							<PaginationItem key={pageNumber}>
								<PaginationLink
									href={pageHref(pageNumber, filters)}
									isActive={pageNumber === page}
								>
									{pageNumber}
								</PaginationLink>
							</PaginationItem>
						),
					)}
					{end < totalPages && (
						<>
							{end < totalPages - 1 && (
								<PaginationItem>
									<PaginationEllipsis />
								</PaginationItem>
							)}
							<PaginationItem>
								<PaginationLink
									href={pageHref(totalPages, filters)}
								>
									{totalPages}
								</PaginationLink>
							</PaginationItem>
						</>
					)}
					{page < totalPages && (
						<PaginationItem>
							<PaginationNext
								href={pageHref(page + 1, filters)}
								text="Next"
							/>
						</PaginationItem>
					)}
				</PaginationContent>
			</Pagination>
		</div>
	);
}
