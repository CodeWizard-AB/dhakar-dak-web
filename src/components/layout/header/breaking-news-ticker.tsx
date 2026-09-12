import Link from "next/link";
import { LuRadio } from "react-icons/lu";
import { HiMiniStop } from "react-icons/hi2";
import {
	breakingNewsItems,
	type BreakingNewsItem,
} from "@/components/layout/header/navigation-data";
import { cn } from "@/lib/utils";
import { BreakingNewsTickerProps } from "@/types/layout";

export function BreakingNewsTicker({
	items = breakingNewsItems,
	label = "Breaking",
	className,
}: BreakingNewsTickerProps) {
	if (items.length === 0) {
		return null;
	}

	const loopedItems = [...items, ...items];

	return (
		<div className={cn("bg-zinc-950 text-zinc-100", className)}>
			<div className="mx-auto flex container px-2 sm:px-4 xl:px-6 items-stretch">
				<Link
					href="/breaking-news"
					className="inline-flex shrink-0 items-center gap-1.5 bg-red-600 px-2.5 py-2 text-[10px] font-bold tracking-[0.18em] text-white uppercase sm:px-3 sm:text-[11px]"
				>
					<LuRadio
						className="size-3.5 animate-pulse motion-reduce:animate-none"
						aria-hidden="true"
					/>
					{label}
				</Link>

				<div className="min-w-0 flex-1 overflow-hidden">
					<div className="flex w-max motion-reduce:hidden animate-ticker hover:paused">
						{loopedItems.map((item, index) => (
							<TickerHeadline key={`${item.id}-${index}`} item={item} />
						))}
					</div>
					<div className="hidden min-w-0 motion-reduce:block">
						<div className="flex gap-0 overflow-x-auto">
							{items.map((item) => (
								<TickerHeadline key={item.id} item={item} />
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

function TickerHeadline({ item }: { item: BreakingNewsItem }) {
	return (
		<Link
			href={item.href}
			className="inline-flex max-w-none items-center gap-3 px-4 py-2 text-[12px] leading-none whitespace-nowrap text-zinc-100 transition-colors hover:text-white sm:text-[13px]"
		>
			<HiMiniStop
				className="size-1.5 shrink-0 text-red-500"
				aria-hidden="true"
			/>
			<span>{item.title}</span>
		</Link>
	);
}
