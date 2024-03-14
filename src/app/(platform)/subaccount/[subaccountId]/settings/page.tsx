import SubAccountDetailsForm from "@/components/forms/subaccount-details-form";
import UserDetails from "@/components/forms/user-details";
import BlurPage from "@/components/ui/blur-page";
import {
	getAgencyByIdAndIncludeSubaccount,
	getCurrentUserEmail,
} from "@/lib/actions";
import { getUserByEmail } from "@/lib/actions/getUserByEmail";
import { redirect } from "next/navigation";
import { getSubaccountById } from "./_queries";

type Props = {
	params: { subaccountId: string };
};

async function Page({ params }: Props) {
	const email = await getCurrentUserEmail();
	if (!email) return redirect("/sign-in");

	const user = await getUserByEmail(email);
	if (!user) return redirect("/sign-in");

	const subAccount = await getSubaccountById(params.subaccountId);
	if (!subAccount) return;

	const agencyDetails = await getAgencyByIdAndIncludeSubaccount(
		subAccount.agencyId,
	);
	if (!agencyDetails) return;

	return (
		<BlurPage>
			<div className="flex lg:flex-row flex-col gap-4">
				<SubAccountDetailsForm
					agencyDetails={agencyDetails}
					details={subAccount}
					userId={user.id}
					userName={user.name}
				/>
				<UserDetails
					id={params.subaccountId}
					type="subaccount"
					subAccounts={agencyDetails.SubAccount}
					userData={user}
				/>
			</div>
		</BlurPage>
	);
}
export default Page;
