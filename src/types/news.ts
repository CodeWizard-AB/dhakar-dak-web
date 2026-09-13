export type Category = {
	id: string;
	name: string;
	slug: string;
};

export type Article = {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	category: Category;
	publishedAt: string;
	updatedAt: string;
	coverImage: {
		url: string;
	};
};
