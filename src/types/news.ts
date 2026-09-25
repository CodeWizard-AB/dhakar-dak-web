export type Category = {
	id: string;
	name: string;
	slug: string;
};

export type RichTextNode = {
	type?: string;
	text?: string;
	level?: number;
	format?: string;
	url?: string;
	children?: RichTextNode[];
};

export type ArticleContent = string | RichTextNode[];

export type Article = {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	content: ArticleContent;
	category: Category;
	publishedAt: string;
	updatedAt: string;
	coverImage: {
		url: string;
	};
};
