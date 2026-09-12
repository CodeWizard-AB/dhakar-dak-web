export type NavBreakpoint = "lg" | "xl" | "2xl";

export type NavigationItem = {
	title: string;
	href: string;
	children?: NavigationItem[];
	showFrom?: NavBreakpoint;
};

export type BreakingNewsItem = {
	id: string;
	title: string;
	href: string;
};

export type SocialLink = {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
};

export type UtilityLink = {
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
};

export type HeaderSettings = {
	dateLabel: string;
	languages: { label: string; href: string; locale: string }[];
	utilityLinks: UtilityLink[];
	socialLinks: SocialLink[];
};

export type BreakingNewsTickerProps = {
	items?: BreakingNewsItem[];
	label?: string;
	className?: string;
};
