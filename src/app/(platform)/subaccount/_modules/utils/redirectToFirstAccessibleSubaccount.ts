import { redirect } from "next/navigation";

type redirectToFirstAccessibleSubaccountProps = {
	id: string;
	email: string;
	subAccountId: string;
	access: boolean;
};

export async function redirectToFirstAccessibleSubaccount(
	getFirstSubaccountWithAccess: redirectToFirstAccessibleSubaccountProps,
) {
	const { subAccountId } = getFirstSubaccountWithAccess;
	return redirect(`/subaccount/${subAccountId}`);
}
