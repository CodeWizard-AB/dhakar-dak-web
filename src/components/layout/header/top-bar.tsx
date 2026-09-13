import Link from "next/link";
import {
	HiOutlineCalendarDays,
	HiOutlineMagnifyingGlass,
} from "react-icons/hi2";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { headerSettings } from "@/lib/constants/navigation-data";

export function TopBar() {
	const { dateLabel, languages, utilityLinks, socialLinks } = headerSettings;

	return (
		<div className="border-b border-border bg-background">
			<div className="mx-auto flex h-8 container items-center justify-between gap-4 px-4 sm:px-6 xl:px-8">
				{/* Date Label */}
				<p className="flex items-center gap-1.5 text-xs font-medium uppercase">
					<HiOutlineCalendarDays
						className="size-4 shrink-0"
						aria-hidden="true"
					/>
					<span className="truncate">{dateLabel}</span>
				</p>

				<div className="flex items-center gap-2 sm:gap-3">
					{/* Languages */}
					<div className="hidden items-center gap-2 text-xs font-medium uppercase sm:flex">
						{languages.map((language, index) => (
							<span key={language.locale} className="flex items-center gap-2">
								{index > 0 ? (
									<Separator orientation="vertical" className="h-4 bg-border" />
								) : null}
								<Link
									href={language.href}
									className="whitespace-nowrap transition-colors hover:text-foreground"
								>
									{language.label}
								</Link>
							</span>
						))}
					</div>

					{/* Utility Links */}
					{utilityLinks.map((link) => (
						<div className="flex items-center gap-2" key={link.label}>
							<Separator
								orientation="vertical"
								className="hidden h-4 bg-border sm:block"
							/>
							<Link
								href={link.href}
								className="hidden items-center gap-1 text-xs font-medium tracking-[0.14em] whitespace-nowrap uppercase transition-colors hover:text-foreground sm:inline-flex"
							>
								{link.icon && (
									<link.icon className="size-3.5" aria-hidden="true" />
								)}
								{link.label}
							</Link>
						</div>
					))}

					{/* Socials */}
					<div className="hidden items-center gap-0.5 lg:flex">
						{socialLinks.map((social) => (
							<Tooltip key={social.label}>
								<TooltipTrigger
									render={
										<Link
											href={social.href}
											aria-label={social.label}
											className="inline-flex size-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
										/>
									}
								>
									<social.icon className="size-4" aria-hidden="true" />
								</TooltipTrigger>
								<TooltipContent>{social.label}</TooltipContent>
							</Tooltip>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export function SearchButton({ className }: { className?: string }) {
	return (
		<Button
			nativeButton={false}
			render={<Link href="/search" />}
			variant="ghost"
			size="icon-sm"
			aria-label="Search"
			className={className}
		>
			<HiOutlineMagnifyingGlass className="size-4" aria-hidden="true" />
		</Button>
	);
}
