import { getAuthUserDetails } from "@/lib/queries";
import {
	AgencySidebarOption,
	Prisma,
	SubAccount,
	SubAccountSidebarOption,
} from "@prisma/client";

function currentSubaccount(
	user: Prisma.PromiseReturnType<typeof getAuthUserDetails>,
	id: string,
) {
	return user?.Agency?.SubAccount.find((subAccount) => subAccount.id === id);
}

function getSidebarLogo(
	user: Prisma.PromiseReturnType<typeof getAuthUserDetails>,
	subAccount: SubAccount | undefined,
	type: string,
) {
	if (user?.Agency?.whiteLabel) {
		return user.Agency.agencyLogo || "./assets/website_builder.svg";
	}
	if (type === "subaccount") {
		return subAccount?.subAccountLogo || user?.Agency?.agencyLogo;
	}

	return user?.Agency?.agencyLogo;
}

function getSubAccounts(
	user: Prisma.PromiseReturnType<typeof getAuthUserDetails>,
) {
	return user?.Agency?.SubAccount.filter((subAccount) =>
		user.Permissions.find(
			(permission) =>
				permission.subAccountId === subAccount.id && permission.access === true,
		),
	);
}

function getAgencyType(
	user: Prisma.PromiseReturnType<typeof getAuthUserDetails>,
) {
	return user?.Agency?.whiteLabel ? "agency" : "subaccount";
}

function getSidebarOptions(
	agencySidebarOption: AgencySidebarOption[] | undefined,
	subAccountsidebarOption: SubAccountSidebarOption[] | undefined,
	type: string,
) {
	return type === "agency"
		? agencySidebarOption
		: subAccountsidebarOption || [];
}

export async function getSidebarDetails(
	id: string,
	type: "agency" | "subaccount",
) {
	const user = await getAuthUserDetails();
	if (!user || !user.Agency) return null;

	const subAccount = currentSubaccount(user, id);
	const details = type === "agency" ? user.Agency : subAccount;
	const subAccounts = getSubAccounts(user);
	const sidebarLogo = getSidebarLogo(user, subAccount, type);
	const sidebarOptions = getSidebarOptions(
		user.Agency.SidebarOption,
		subAccount?.SidebarOption,
		type,
	);

	return {
		details,
		user,
		subAccounts,
		sidebarLogo,
		sidebarOptions,
	};
}
