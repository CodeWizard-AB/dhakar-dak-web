import { NextRequest, NextResponse } from "next/server";
import { Article } from "@/types/news";

export async function GET(request: NextRequest) {
	const category = request.nextUrl.searchParams.get("category");
	const feed = request.nextUrl.searchParams.get("feed");
	const offset = Number(request.nextUrl.searchParams.get("offset") ?? "0");
	const limit = Number(request.nextUrl.searchParams.get("limit") ?? "15");
	const feedQuery =
		feed === "today"
			? "pageSize=30&page=6"
			: feed === "breaking"
				? "pageSize=50&page=6"
				: null;

	if ((!category && !feedQuery) || (feed && !feedQuery)) {
		return NextResponse.json({ data: [] }, { status: 400 });
	}

	const response = await fetch(
		feedQuery
			? `${process.env.NEXT_PUBLIC_MOCK_API}/articles?${feedQuery}`
			: `${process.env.NEXT_PUBLIC_MOCK_API}/articles?category=${encodeURIComponent(category!)}`,
	);
	if (!response.ok) {
		return NextResponse.json({ data: [] }, { status: response.status });
	}

	const result: { data?: Article[] } = await response.json();
	const news = result.data ?? [];
	return NextResponse.json({ data: news.slice(offset, offset + limit) });
}
