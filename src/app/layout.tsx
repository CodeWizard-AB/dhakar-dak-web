import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/layout/header/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "The Daily Dhakar Dak - Bangladesh's Leading News Source",
	description:
		"The Daily Dhakar Dak is a leading news source providing the latest news, analysis, and insights on current events, politics, business, technology, and more. Stay informed with our comprehensive coverage and in-depth reporting.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={cn("h-full", "antialiased", inter.className)}
		>
			<body cz-shortcut-listen="true">
				<Header />
				<main className="container mx-auto px-4 sm:px-6">{children}</main>
			</body>
		</html>
	);
}
