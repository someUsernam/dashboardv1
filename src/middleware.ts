import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const isSignInOrSignUp = (pathname: string) =>
	pathname === "/sign-in" || pathname === "/sign-up";
const isHomeOrSite = (pathname: string, host: string) =>
	pathname === "/" ||
	(pathname === "/site" && host === process.env.NEXT_PUBLIC_DOMAIN);
const isAgencyOrSubaccount = (pathname: string) =>
	pathname.startsWith("/agency") || pathname.startsWith("/subaccount");

export default authMiddleware({
	publicRoutes: ["/site", "/api/uploadthing"],
	// async beforeAuth(auth, req) {},
	async afterAuth(auth, req) {
		const { nextUrl, headers } = req;
		const { pathname, host, searchParams: urlSearchParams, href } = nextUrl;
		const searchParams = String(urlSearchParams);

		const pathWithSearchParams = `${pathname}${
			searchParams.length > 0 ? `?${searchParams}` : ""
		}`;

		if (isSignInOrSignUp(pathname)) {
			return NextResponse.redirect(new URL("/agency/sign-in", href));
		}
		if (isHomeOrSite(pathname, host)) {
			return NextResponse.rewrite(new URL("/site", href));
		}
		if (isAgencyOrSubaccount(pathname)) {
			return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, href));
		}
	},
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
