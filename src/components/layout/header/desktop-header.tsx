import { TopBar } from "./top-bar";
import { MainHeader } from "./main-header";
import { PrimaryNavigation } from "./primary-navigation";
import { BreakingNewsTicker } from "./breaking-news-ticker";

export default function DesktopHeader() {
	return (
		<div>
			<TopBar />
			<MainHeader />
			<PrimaryNavigation />
			<BreakingNewsTicker />
		</div>
	);
}
