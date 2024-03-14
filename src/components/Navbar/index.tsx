"use client";
import { getNotificationAndUser } from "@/lib/queries";
import { UserButton } from "@clerk/nextjs";
import { Prisma, Role } from "@prisma/client";
import { ModeToggle } from "@ui/mode-toggle";
import { NavbarLayout } from "./modules/components/NavbarLayout";
import { Notification } from "./modules/components/Notification/Notification";

type Props = {
	notifications: Prisma.PromiseReturnType<typeof getNotificationAndUser> | [];
	role?: Role;
	className?: string;
	subAccountId?: string;
};

function Navbar({ notifications, subAccountId, className, role }: Props) {
	return (
		<NavbarLayout>
			<UserButton afterSignOutUrl="/" />
			<Notification
				notifications={notifications}
				subAccountId={subAccountId}
				role={role}
			/>
			<ModeToggle />
		</NavbarLayout>
	);
}

export { Navbar };
