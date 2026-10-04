export type SearchArticle = {
	id: string | number;
	title: string;
	slug: string;
	excerpt?: string | null;
	publishedAt: string;
	category?: {
		name?: string;
		slug?: string;
	} | null;
	coverImage?: {
		url?: string;
	} | null;
};

export type SearchOption = {
	label: string;
	value: string;
};

export type SearchOptions = {
	categories: SearchOption[];
	divisions: SearchOption[];
	districts: Record<string, SearchOption[]>;
};
