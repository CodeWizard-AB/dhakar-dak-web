import {
	FaFacebookF,
	FaInstagram,
	FaXTwitter,
	FaYoutube,
} from "react-icons/fa6";
import { HiOutlineEnvelope, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { LuNewspaper } from "react-icons/lu";

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

export const headerSettings: HeaderSettings = {
	dateLabel: new Date().toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
		year: "numeric",
	}),
	languages: [
		{ label: "বাংলা", href: "#", locale: "bn" },
		{ label: "ENGLISH", href: "#", locale: "en" },
	],
	utilityLinks: [
		{ label: "E-Paper", href: "/epaper", icon: LuNewspaper },
		{ label: "Newsletter", href: "/newsletter", icon: HiOutlineEnvelope },
		{ label: "Search", href: "/search", icon: HiOutlineMagnifyingGlass },
	],
	socialLinks: [
		{ label: "Facebook", href: "#", icon: FaFacebookF },
		{ label: "X", href: "#", icon: FaXTwitter },
		{ label: "YouTube", href: "#", icon: FaYoutube },
		{ label: "Instagram", href: "#", icon: FaInstagram },
	],
};

export const navigationItems: NavigationItem[] = [
	{
		title: "Bangladesh",
		href: "/bangladesh",
		children: [
			{ title: "National", href: "/bangladesh/national" },
			{ title: "Government", href: "/bangladesh/government" },
			{ title: "Politics", href: "/bangladesh/politics" },
			{ title: "District", href: "/bangladesh/district" },
			{ title: "Dhaka", href: "/bangladesh/dhaka" },
			{ title: "Crime", href: "/bangladesh/crime" },
		],
	},
	{
		title: "Politics",
		href: "/politics",
		children: [
			{ title: "National Politics", href: "/politics/national-politics" },
			{ title: "Parliament", href: "/politics/parliament" },
			{ title: "Government", href: "/politics/government" },
			{ title: "Political Parties", href: "/politics/political-parties" },
			{ title: "Elections", href: "/politics/elections" },
		],
	},
	{
		title: "World",
		href: "/world",
		children: [
			{ title: "Asia", href: "/world/asia" },
			{ title: "Europe", href: "/world/europe" },
			{ title: "America", href: "/world/america" },
			{ title: "Middle East", href: "/world/middle-east" },
			{ title: "International", href: "/world/international" },
		],
	},
	{
		title: "Business",
		href: "/business",
		children: [
			{ title: "Economy", href: "/business/economy" },
			{ title: "Banking", href: "/business/banking" },
			{ title: "Stock Market", href: "/business/stock-market" },
			{ title: "Industry", href: "/business/industry" },
			{ title: "Corporate", href: "/business/corporate" },
		],
	},
	{
		title: "Sports",
		href: "/sports",
		children: [
			{ title: "Cricket", href: "/sports/cricket" },
			{ title: "Football", href: "/sports/football" },
			{ title: "Tennis", href: "/sports/tennis" },
			{ title: "Other Sports", href: "/sports/other-sports" },
		],
	},
	{
		title: "Tech",
		href: "/tech",
		children: [
			{ title: "Technology", href: "/tech/technology" },
			{ title: "AI", href: "/tech/ai" },
			{ title: "Gadgets", href: "/tech/gadgets" },
			{ title: "Cyber Security", href: "/tech/cyber-security" },
			{ title: "Startups", href: "/tech/startups" },
		],
	},
	{
		title: "Entertainment",
		href: "/entertainment",
		showFrom: "xl",
		children: [
			{ title: "Cinema", href: "/entertainment/cinema" },
			{ title: "Television", href: "/entertainment/television" },
			{ title: "Music", href: "/entertainment/music" },
			{ title: "Celebrity", href: "/entertainment/celebrity" },
		],
	},
	{
		title: "Lifestyle",
		href: "/lifestyle",
		showFrom: "xl",
		children: [
			{ title: "Health", href: "/lifestyle/health" },
			{ title: "Fashion", href: "/lifestyle/fashion" },
			{ title: "Food", href: "/lifestyle/food" },
			{ title: "Travel", href: "/lifestyle/travel" },
		],
	},
	{
		title: "Opinion",
		href: "/opinion",
		showFrom: "xl",
		children: [
			{ title: "Editorial", href: "/opinion/editorial" },
			{ title: "Column", href: "/opinion/column" },
			{ title: "Analysis", href: "/opinion/analysis" },
		],
	},
	{
		title: "Features",
		href: "/features",
		showFrom: "2xl",
		children: [
			{ title: "Special Report", href: "/features/special-report" },
			{ title: "Interviews", href: "/features/interviews" },
			{ title: "Investigation", href: "/features/investigation" },
			{ title: "Stories", href: "/features/stories" },
		],
	},
	{
		title: "Video",
		href: "/video",
		showFrom: "2xl",
		children: [
			{ title: "Latest Videos", href: "/video/latest-videos" },
			{ title: "News Video", href: "/video/news-video" },
			{ title: "Interviews", href: "/video/interviews" },
		],
	},
	{
		title: "Photo",
		href: "/photo",
		showFrom: "2xl",
		children: [
			{ title: "Photo Gallery", href: "/photo/photo-gallery" },
			{ title: "Photo Story", href: "/photo/photo-story" },
		],
	},
];

export const moreNavigationItems: NavigationItem[] = [
	{ title: "Jobs", href: "/jobs" },
	{ title: "Archive", href: "/archive" },
	{ title: "Contact", href: "/contact" },
	{ title: "About Us", href: "/about" },
];

export const breakingNewsItems: BreakingNewsItem[] = [
	{
		id: "1",
		title: "Government announces new economic policy",
		href: "/bangladesh",
	},
	{
		id: "2",
		title: "Central bank signals fresh review of the interest-rate corridor",
		href: "/business",
	},
	{
		id: "3",
		title: "Monsoon floods test new drainage infrastructure across the capital",
		href: "/bangladesh",
	},
	{
		id: "4",
		title: "National team announces squad for upcoming series",
		href: "/sports",
	},
];

export const navItemVisibilityClass: Record<NavBreakpoint, string> = {
	lg: "",
	xl: "hidden xl:flex",
	"2xl": "hidden 2xl:flex",
};

export const moreOverflowVisibilityClass: Record<NavBreakpoint, string> = {
	lg: "",
	xl: "xl:hidden",
	"2xl": "2xl:hidden",
};
