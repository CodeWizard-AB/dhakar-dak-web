import { navigationItems } from "@/lib/constants/navigation-data";
import type { SearchOption, SearchOptions } from "./search-types";

const districtNames: Record<string, string[]> = {
	barishal: ["Barishal", "Bhola", "Patuakhali"],
	chattogram: ["Chattogram", "Cox's Bazar", "Cumilla"],
	dhaka: ["Dhaka", "Faridpur", "Gazipur", "Narayanganj"],
	khulna: ["Khulna", "Kushtia", "Satkhira"],
	mymensingh: ["Jamalpur", "Mymensingh", "Netrokona"],
	rajshahi: ["Bogura", "Natore", "Rajshahi"],
	rangpur: ["Dinajpur", "Kurigram", "Rangpur"],
	sylhet: ["Habiganj", "Moulvibazar", "Sylhet"],
};

function toSlug(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

export function getSearchOptions(): SearchOptions {
	const categories = new Map<string, SearchOption>();
	for (const section of navigationItems) {
		for (const category of section.children ?? []) {
			const value =
				category.href.split("/").filter(Boolean).at(-1) ??
				toSlug(category.title);
			if (!categories.has(value)) {
				categories.set(value, { label: category.title, value });
			}
		}
	}
	const divisions: SearchOption[] = Object.keys(districtNames).map((division) => ({
		label: division.charAt(0).toUpperCase() + division.slice(1),
		value: division,
	}));
	const districts = Object.fromEntries(
		Object.entries(districtNames).map(([division, names]) => [
			division,
			names.map((name) => ({ label: name, value: toSlug(name) })),
		]),
	);

	return { categories: [...categories.values()], divisions, districts };
}
