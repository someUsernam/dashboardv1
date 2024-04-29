import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isSignInOrSignUp = (pathname: string) =>
	pathname === "/sign-in" || pathname === "/sign-up";
const isHomeOrSite = (pathname: string, host: string) =>
	pathname === "/" ||
	(pathname === "/site" && host === process.env.NEXT_PUBLIC_DOMAIN);
const isAgencyOrSubaccount = (pathname: string) =>
	pathname.startsWith("/agency") || pathname.startsWith("/subaccount");

const isProtectedRoute = createRouteMatcher([
	"/subaccount/(.*)",
	"/agency",
	"/sign-in",
	"/sign-up",
]);

export default clerkMiddleware((auth, req) => {
	// publicRoutes: ["/site", "/api/uploadthing"],
	// async beforeAuth(auth, req) {},

	const { nextUrl, headers } = req;
	const { pathname, host, searchParams: urlSearchParams, href } = nextUrl;
	const searchParams = String(urlSearchParams);

	const pathWithSearchParams = `${pathname}${
		searchParams.length > 0 ? `?${searchParams}` : ""
	}`;

	if (isProtectedRoute(req)) auth().protect();

	if (isHomeOrSite(pathname, host)) {
		return NextResponse.rewrite(new URL("/site", href));
	}
	if (isAgencyOrSubaccount(pathname)) {
		return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, href));
	}
});

export const config = {
	matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
