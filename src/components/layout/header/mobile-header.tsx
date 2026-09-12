import Logo from "@/components/layout/common/logo";
import { BreakingNewsTicker } from "@/components/layout/header/breaking-news-ticker";
import { MobileNavigation } from "@/components/layout/header/mobile-navigation";
import { SearchButton } from "@/components/layout/header/top-bar";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";

export function MobileHeader() {
	return (
		<div>
			<div className="border-b border-border bg-background">
				<div className="flex items-center gap-1 px-2 py-2 sm:px-3">
					<MobileNavigation />
					<div className="min-w-0 flex-1">
						<Logo />
					</div>
					<AnimatedThemeToggler className="text-foreground" />
					<SearchButton />
				</div>
			</div>
			<BreakingNewsTicker />
		</div>
	);
}
