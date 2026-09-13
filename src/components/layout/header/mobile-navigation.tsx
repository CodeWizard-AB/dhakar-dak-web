"use client";

import Link from "next/link";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import Logo from "@/components/layout/common/logo";
import {
	moreNavigationItems,
	navigationItems,
} from "@/lib/constants/navigation-data";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { type NavigationItem } from "@/types/layout";

export function MobileNavigation() {
	return (
		<Sheet>
			<SheetTrigger
				render={
					<Button
						variant="ghost"
						size="icon"
						aria-label="Open menu"
						className="size-10"
					/>
				}
			>
				<HiOutlineBars3 className="size-5" aria-hidden="true" />
			</SheetTrigger>
			<SheetContent
				side="left"
				showCloseButton={false}
				className="w-[min(100%,22rem)] gap-0 p-0"
			>
				<SheetHeader className="flex-row items-center justify-between gap-3 border-b border-border p-4">
					<SheetTitle className="sr-only">Site navigation</SheetTitle>
					<Logo />
					<SheetClose
						render={
							<Button variant="ghost" size="icon-sm" aria-label="Close menu" />
						}
					>
						<HiOutlineXMark className="size-5" aria-hidden="true" />
					</SheetClose>
				</SheetHeader>

				<nav
					aria-label="Mobile"
					className="min-h-0 flex-1 overflow-y-auto px-2 py-2"
				>
					<Accordion multiple className="w-full">
						{navigationItems.map((item) =>
							item.children?.length ? (
								<AccordionItem
									key={item.href}
									value={item.href}
									className="border-border"
								>
									<AccordionTrigger className="px-3 py-3 text-[13px] font-semibold tracking-[0.12em] uppercase hover:no-underline">
										{item.title}
									</AccordionTrigger>
									<AccordionContent className="pb-2 [&_a]:no-underline">
										<MobileChildLinks item={item} />
									</AccordionContent>
								</AccordionItem>
							) : (
								<SheetClose
									key={item.href}
									nativeButton={false}
									render={
										<Link
											href={item.href}
											className="flex px-3 py-3 text-[13px] font-semibold tracking-[0.12em] uppercase"
										/>
									}
								>
									{item.title}
								</SheetClose>
							),
						)}

						<AccordionItem value="more" className="border-border">
							<AccordionTrigger className="px-3 py-3 text-[13px] font-semibold tracking-[0.12em] uppercase hover:no-underline">
								More
							</AccordionTrigger>
							<AccordionContent className="pb-2 [&_a]:no-underline">
								<ul className="flex flex-col">
									{moreNavigationItems.map((item) => (
										<li key={item.href}>
											<SheetClose
												nativeButton={false}
												render={
													<Link
														href={item.href}
														className="flex px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
													/>
												}
											>
												{item.title}
											</SheetClose>
										</li>
									))}
								</ul>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</nav>

				<div className="border-t border-border p-4">
					<div className="grid grid-cols-2 gap-2">
						<SheetClose
							nativeButton={false}
							render={
								<Link
									href="/todays-news"
									className={buttonVariants({
										variant: "outline",
										size: "sm",
										className: "w-full",
									})}
								/>
							}
						>
							Today&apos;s News
						</SheetClose>
						<SheetClose
							nativeButton={false}
							render={
								<Link
									href="/breaking-news"
									className={buttonVariants({
										variant: "outline",
										size: "sm",
										className: "w-full",
									})}
								/>
							}
						>
							Breaking News
						</SheetClose>
					</div>
					<Separator className="my-3" />
					<div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground">
						<SheetClose nativeButton={false} render={<Link href="/epaper" />}>
							E-Paper
						</SheetClose>
						<SheetClose nativeButton={false} render={<Link href="#" />}>
							বাংলা
						</SheetClose>
						<SheetClose nativeButton={false} render={<Link href="#" />}>
							English
						</SheetClose>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
}

function MobileChildLinks({ item }: { item: NavigationItem }) {
	return (
		<ul className="flex flex-col">
			<li>
				<SheetClose
					nativeButton={false}
					render={
						<Link
							href={item.href}
							className={cn(
								"flex px-3 py-2 text-sm font-medium text-foreground",
							)}
						/>
					}
				>
					All {item.title}
				</SheetClose>
			</li>
			{item.children?.map((child) => (
				<li key={child.href}>
					<SheetClose
						nativeButton={false}
						render={
							<Link
								href={child.href}
								className="flex px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
							/>
						}
					>
						{child.title}
					</SheetClose>
				</li>
			))}
		</ul>
	);
}
