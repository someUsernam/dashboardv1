import { SidebarContent } from "./modules/components/sidebar-content";
import { getSidebarDetails } from "./modules/utils/getSidebarDetails";

type Props = {
	id: string;
	type: "agency" | "subaccount";
};

async function Sidebar({ id, type }: Props) {
	const sidebarData = await getSidebarDetails(id, type);
	const details = sidebarData?.details;
	const user = sidebarData?.user;
	const subAccounts = sidebarData?.subAccounts;
	const sidebarOptions = sidebarData?.sidebarOptions;

	if (!details || !user || !subAccounts || !sidebarOptions) {
		throw new Error("Error! Missing data.");
	}

	return (
		<SidebarContent
			details={details}
			user={user}
			subAccounts={subAccounts}
			sidebarOptions={sidebarOptions}
		/>
	);
}

export { Sidebar };
