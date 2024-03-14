import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { Toaster } from "@/components/ui/sonner";
import { getNotificationAndUser, verifyAndAcceptInvite } from "@/lib/queries";
import ModalProvider from "@/providers/modal-provider";
import { currentUser } from "@clerk/nextjs";
import BlurPage from "@ui/blur-page";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import Loading from "./loading";

type Props = {
	params: {
		agencyId: string;
	};
} & Children;

async function Layout({ children, params }: Props) {
	const agencyId = await verifyAndAcceptInvite();
	const user = await currentUser();

	if (!user) return redirect("/");
	if (!agencyId) return redirect("/agency");
	if (
		user.privateMetadata.role !== "AGENCY_OWNER" &&
		user.privateMetadata.role !== "AGENCY_ADMIN"
	)
		return redirect("/agency");

	const notifications = await getNotificationAndUser(agencyId);

	return (
		<div className="h-full overflow-hidden">
			<ModalProvider>
				<Sidebar id={params.agencyId} type="agency" />
				<div className="md:pl-[300px]">
					<Navbar
						notifications={notifications}
						role={user.privateMetadata.role}
					/>
					<div className="relative">
						<BlurPage>
							<Suspense fallback={<Loading />}>{children}</Suspense>
						</BlurPage>
						I
					</div>
				</div>
			</ModalProvider>
			<Toaster />
		</div>
	);
}
export default Layout;
