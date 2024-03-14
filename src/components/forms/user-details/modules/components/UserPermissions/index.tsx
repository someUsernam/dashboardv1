import { getAuthUserDetails } from "@/lib/queries";
import { Prisma, SubAccount, User } from "@prisma/client";
import { UserPermissionsLayout } from "./modules/components/UserPermissionsLayout";
import { UserPermissionsToggle } from "./modules/components/UserPermissionsToggle";

type UserPermissionsProps = {
	type: "agency" | "subaccount";
	userData?: Partial<User>;
	subAccounts?: SubAccount[];
	authUserData: Prisma.PromiseReturnType<typeof getAuthUserDetails>;
	subAccountId: string | null;
};

function UserPermissions({
	type,
	subAccounts,
	authUserData,
	userData,
	subAccountId,
}: UserPermissionsProps) {
	return (
		<UserPermissionsLayout>
			{subAccounts?.map((subAccount) => (
				<UserPermissionsToggle
					subAccount={subAccount}
					authUserData={authUserData}
					userData={userData}
					subAccountId={subAccountId}
					key={subAccount.id}
					type={type}
				/>
			))}
		</UserPermissionsLayout>
	);
}
export { UserPermissions };
