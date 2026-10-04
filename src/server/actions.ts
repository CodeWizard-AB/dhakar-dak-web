"use server";

import { cookies } from "next/headers";

export async function setLocale(formData: FormData) {
	const locale = formData.get("locale");

	if (locale !== "bn" && locale !== "en") {
		throw new Error("Unsupported locale");
	}

	const cookieStore = await cookies();
	cookieStore.set("locale", locale, {
		maxAge: 60 * 60 * 24 * 365,
		path: "/",
		sameSite: "lax",
		secure: process.env.NODE_ENV === "production",
	});
}
