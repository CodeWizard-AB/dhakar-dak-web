import { useTranslations } from "next-intl";

export default function Home() {
	const t = useTranslations("HomePage");

	return <div className="text-3xl font-bold h-screen">{t("title")}</div>;
}
