import Link from "next/link";
import { HiOutlineBolt, HiOutlineNewspaper } from "react-icons/hi2";
import Logo from "@/components/layout/common/logo";
import { Button } from "@/components/ui/button";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function MainHeader() {
	return (
		<div className="border-b border-border bg-background">
			<div className="mx-auto flex container items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:py-4 xl:px-8">
				<Logo />

				<div className="flex shrink-0 items-center gap-0.5 sm:gap-2">
					<AnimatedThemeToggler className="text-foreground" />
					<Button
						nativeButton={false}
						render={<Link href="/todays-news" />}
						variant="secondary"
						size="sm"
						className="hidden px-2.5 text-[10px] font-semibold tracking-[0.14em] text-foreground sm:inline-flex lg:px-3"
					>
						<HiOutlineNewspaper className="size-3.5" aria-hidden="true" />
						Today&apos;s News
					</Button>
					<Button
						nativeButton={false}
						render={<Link href="/breaking-news" />}
						variant="secondary"
						size="sm"
						className="px-2 text-[10px] font-semibold tracking-[0.14em] text-foreground sm:px-2.5 lg:px-3"
					>
						<HiOutlineBolt className="size-3.5" aria-hidden="true" />
						<span className="hidden sm:inline">Breaking News</span>
						<span className="sm:hidden">Breaking</span>
					</Button>
				</div>
			</div>
		</div>
	);
}
