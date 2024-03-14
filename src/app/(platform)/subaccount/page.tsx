import Unauthorized from "@/components/unauthorized";
import { getAuthUserDetails, verifyAndAcceptInvite } from "@/lib/queries";
import { redirectToFirstAccessibleSubaccount } from "./_modules/utils/redirectToFirstAccessibleSubaccount";
import { redirectToSubaccountWithState } from "./_modules/utils/redirectToSubaccountWithState";

type Props = {
	searchParams: {
		state: string;
		code: string;
	};
};

async function Page({ searchParams: { state, code } }: Props) {
	const agencyId = await verifyAndAcceptInvite();
	if (!agencyId) {
		return <Unauthorized />;
	}

	const user = await getAuthUserDetails();
	if (!user) {
		return;
	}

	const firstAccessibleSubaccount = user.Permissions.find(
		(permission) => permission.access === true,
	);

	if (state) {
		return redirectToSubaccountWithState(state, code);
	}

	if (firstAccessibleSubaccount) {
		return redirectToFirstAccessibleSubaccount(firstAccessibleSubaccount);
	}

	return <Unauthorized />;
}
export default Page;
