import { ModeToggle } from "@/components/ui/mode-toggle";
import { SITE_NAME } from "@/lib/consts";
import { UserButton, auth } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import Link from "next/link";

type Props = {
	user?: null | User;
};

function Navbar({ user }: Props) {
	const { userId } = auth();
	return (
		<div className="fixed w-full top-0 p-4 flex items-center justify-between z-10 backdrop-blur-sm">
			<aside className="flex items-center gap-2">
				{/* <Image
					src={"./assets/logo.svg"}
					width={40}
					height={40}
					alt={`${SITE_NAME} logo`}
				/> */}
				<span className="text-xl font-bold">{SITE_NAME}.</span>
			</aside>
			<nav className="hidden md:block absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%]">
				<ul className="flex items-center justify-center gap-8">
					<Link href={"#"}>Pricing</Link>
					<Link href={"#"}>About</Link>
					<Link href={"#"}>Documentation</Link>
					<Link href={"#"}>Features</Link>
				</ul>
			</nav>
			<aside className="flex gap-2 items-center">
				{!userId ? (
					<>
						<Link
							href={"/agency/sign-in"}
							className="bg-primary-foreground text-white p-2 px-4 rounded-md hover:bg-primary/80"
						>
							Sign In
						</Link>
						<Link
							href={"/agency/sign-up"}
							className="bg-primary-foreground text-white p-2 px-4 rounded-md hover:bg-primary/80"
						>
							Sign Up
						</Link>
					</>
				) : (
					<UserButton />
				)}
				<ModeToggle />
			</aside>
		</div>
	);
}

export { Navbar };
