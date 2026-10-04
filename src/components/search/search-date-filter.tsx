"use client";

import { useState } from "react";
import { CalendarDays, ChevronDown, X } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

function toDateValue(date: Date) {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

function fromDateValue(value: string) {
	if (!value) return undefined;
	const [year, month, day] = value.split("-").map(Number);
	return new Date(year, month - 1, day, 12);
}

export function SearchDateFilter({ value }: { value: string }) {
	const [selectedDate, setSelectedDate] = useState<Date | undefined>(() =>
		fromDateValue(value),
	);
	const [isOpen, setIsOpen] = useState(false);
	const dateLabel = selectedDate
		? selectedDate.toLocaleDateString(undefined, {
				month: "short",
				day: "numeric",
				year: "numeric",
			})
		: "Any date";

	return (
		<div className="relative">
			<span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
				Published
			</span>
			<input
				type="hidden"
				name="date"
				value={selectedDate ? toDateValue(selectedDate) : ""}
			/>
			<Button
				type="button"
				variant="outline"
				aria-expanded={isOpen}
				onClick={() => setIsOpen((open) => !open)}
				className="h-10 w-full justify-between gap-2 border-border px-3 text-left text-xs font-medium tracking-normal"
			>
				<span className="flex min-w-0 items-center gap-2 truncate normal-case">
					<CalendarDays className="size-4 shrink-0 text-muted-foreground" />
					{dateLabel}
				</span>
				<ChevronDown className="size-3.5 shrink-0 text-muted-foreground" />
			</Button>
			{isOpen && (
				<div className="absolute left-0 top-full z-30 mt-2 border border-border bg-popover shadow-lg">
					<Calendar
						mode="single"
						selected={selectedDate}
						onSelect={(date) => {
							setSelectedDate(date);
							if (date) setIsOpen(false);
						}}
						disabled={{ after: new Date() }}
					/>
					<div className="flex justify-between border-t border-border px-3 py-2">
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => {
								setSelectedDate(undefined);
								setIsOpen(false);
							}}
							className="h-8 gap-1 px-2 text-[10px]"
						>
							<X className="size-3" />
							Clear date
						</Button>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							onClick={() => setIsOpen(false)}
							className="h-8 px-2 text-[10px]"
						>
							Done
						</Button>
					</div>
				</div>
			)}
		</div>
	);
}
