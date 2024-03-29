import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const inter = IBM_Plex_Sans({
	subsets: ["latin"],
	weight: "500",
});

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<Children>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`h-svh bg-background ${inter.className}`}>
				{children}
			</body>
		</html>
	);
}
