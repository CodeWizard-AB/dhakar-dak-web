"use client";

import Link from "next/link";
import { HiMiniChevronDown } from "react-icons/hi2";
import {
	moreNavigationItems,
	moreOverflowVisibilityClass,
	navItemVisibilityClass,
	navigationItems,
	type NavigationItem,
} from "@/components/layout/header/navigation-data";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
	navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const topLinkClass = cn(
	navigationMenuTriggerStyle(),
	"h-10 bg-transparent px-2 text-[11px] font-semibold tracking-[0.14em] uppercase hover:bg-transparent hover:text-foreground/70 focus:bg-transparent data-popup-open:bg-transparent data-open:bg-transparent xl:px-2.5 2xl:px-3",
);

export function PrimaryNavigation() {
	const overflowItems = navigationItems.filter((item) => item.showFrom);

	return (
		<div className="border-b border-border bg-background">
			<nav
				aria-label="Primary"
				className="mx-auto flex container items-center px-2 sm:px-4 xl:px-6"
			>
				<NavigationMenu
					align="start"
					className="max-w-none flex-1 justify-start"
				>
					<NavigationMenuList className="flex-nowrap justify-start gap-0">
						{navigationItems.map((item) => (
							<NavigationMenuItem
								key={item.href}
								className={navItemVisibilityClass[item.showFrom ?? "lg"]}
							>
								{item.children?.length ? (
									<SectionMenu item={item} />
								) : (
									<NavigationMenuLink
										render={<Link href={item.href} />}
										className={topLinkClass}
									>
										{item.title}
									</NavigationMenuLink>
								)}
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				<MoreMenu overflowItems={overflowItems} />
			</nav>
		</div>
	);
}

function SectionMenu({ item }: { item: NavigationItem }) {
	return (
		<>
			<NavigationMenuTrigger
				className={cn(topLinkClass, "gap-0.5")}
				render={<Link href={`/${item.title.toLowerCase()}`} />}
			>
				{item.title}
			</NavigationMenuTrigger>
			<NavigationMenuContent className="min-w-56 p-2">
				<ul className="grid gap-0.5">
					<li>
						<NavigationMenuLink
							render={<Link href={item.href} />}
							closeOnClick
							className="px-3 py-2 text-xs font-semibold tracking-[0.12em] uppercase"
						>
							All {item.title}
						</NavigationMenuLink>
					</li>
					{item.children?.map((child) => (
						<li key={child.href}>
							<NavigationMenuLink
								render={<Link href={child.href} />}
								closeOnClick
								className="px-3 py-2 text-sm font-normal tracking-normal normal-case"
							>
								{child.title}
							</NavigationMenuLink>
						</li>
					))}
				</ul>
			</NavigationMenuContent>
		</>
	);
}

function MoreMenu({ overflowItems }: { overflowItems: NavigationItem[] }) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className={cn(topLinkClass, "inline-flex items-center gap-0.5")}
			>
				More
				<HiMiniChevronDown className="size-3.5" aria-hidden="true" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="min-w-52">
				{overflowItems.map((item) =>
					item.children?.length ? (
						<DropdownMenuSub key={item.href}>
							<DropdownMenuSubTrigger
								className={cn(
									"normal-case tracking-normal",
									moreOverflowVisibilityClass[item.showFrom ?? "lg"],
								)}
							>
								{item.title}
							</DropdownMenuSubTrigger>
							<DropdownMenuSubContent>
								<DropdownMenuItem
									render={<Link href={item.href} />}
									className="normal-case tracking-normal"
								>
									All {item.title}
								</DropdownMenuItem>
								{item.children.map((child) => (
									<DropdownMenuItem
										key={child.href}
										render={<Link href={child.href} />}
										className="normal-case tracking-normal"
									>
										{child.title}
									</DropdownMenuItem>
								))}
							</DropdownMenuSubContent>
						</DropdownMenuSub>
					) : (
						<DropdownMenuItem
							key={item.href}
							render={<Link href={item.href} />}
							className={cn(
								"normal-case tracking-normal",
								moreOverflowVisibilityClass[item.showFrom ?? "lg"],
							)}
						>
							{item.title}
						</DropdownMenuItem>
					),
				)}
				{overflowItems.length > 0 ? (
					<DropdownMenuSeparator className="2xl:hidden" />
				) : null}
				{moreNavigationItems.map((item) => (
					<DropdownMenuItem
						key={item.href}
						render={<Link href={item.href} />}
						className="normal-case tracking-normal"
					>
						{item.title}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
