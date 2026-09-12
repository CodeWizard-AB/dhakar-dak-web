import { MobileHeader } from "@/components/layout/header/mobile-header";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TopBar } from "./top-bar";
import { MainHeader } from "./main-header";
import { PrimaryNavigation } from "./primary-navigation";
import { BreakingNewsTicker } from "./breaking-news-ticker";

export default function Header() {
	return (
		<TooltipProvider delay={250}>
			<header className="w-full overflow-x-clip bg-background">
				<div className="lg:hidden">
					<MobileHeader />
				</div>
				<div className="hidden lg:block">
					<TopBar />
					<MainHeader />
					<PrimaryNavigation />
					<BreakingNewsTicker />
				</div>
			</header>
		</TooltipProvider>
	);
}
