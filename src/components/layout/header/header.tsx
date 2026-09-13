import { MobileHeader } from "@/components/layout/header/mobile-header";
import { TooltipProvider } from "@/components/ui/tooltip";
import DesktopHeader from "./desktop-header";

export default function Header() {
	return (
		<TooltipProvider delay={250}>
			<header className="w-full overflow-x-clip bg-background">
				<div className="lg:hidden">
					<MobileHeader />
				</div>
				<div className="hidden lg:block">
					<DesktopHeader />
				</div>
			</header>
		</TooltipProvider>
	);
}
