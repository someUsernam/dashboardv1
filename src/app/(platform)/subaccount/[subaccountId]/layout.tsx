import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import Unauthorized from "@/components/unauthorized";
import {
	getAuthUserDetails,
	getNotificationAndUser,
	verifyAndAcceptInvite,
} from "@/lib/queries";
import { currentUser } from "@clerk/nextjs/server";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

type Props = {
	params: { subaccountId: string };
} & Children;

async function Layout({ children, params }: Props) {
	const agencyId = await verifyAndAcceptInvite();
	if (!agencyId) {
		return <Unauthorized />;
	}

	const user = await currentUser();
	if (!user) {
		return redirect("/");
	}

	if (!user.privateMetadata.role) {
		return <Unauthorized />;
	}

	const allPermissions = await getAuthUserDetails();
	const hasPermission = allPermissions?.Permissions.find((permission) => {
		return permission.access && permission.subAccountId === params.subaccountId;
	});

	if (!hasPermission) {
		return <Unauthorized />;
	}

	const allNotifications = await getNotificationAndUser(agencyId);
	const isAdminOrOwner = ["AGENCY_ADMIN", "AGENCY_OWNER"].includes(
		user.privateMetadata.role as Role,
	);
	const notifications = isAdminOrOwner
		? allNotifications
		: allNotifications?.filter(
				(item) => item.subAccountId === params.subaccountId,
		  );

	return (
		<div className="h-screen overflow-hidden">
			<Sidebar id={params.subaccountId} type="subaccount" />

			<div className="md:pl-[300px]">
				<Navbar
					notifications={notifications}
					role={user.privateMetadata.role as Role}
					subAccountId={params.subaccountId as string}
				/>
				<div className="relative">{children}</div>
			</div>
			<Toaster />
		</div>
	);
}

export default Layout;
