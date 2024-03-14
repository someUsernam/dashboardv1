"use client";

import { Switch } from "@/components/ui/switch";
import {
	changeUserPermissions,
	getAuthUserDetails,
	getUserPermissions,
	saveActivityLogsNotification,
} from "@/lib/queries";
import { useModal } from "@/providers/modal-provider";
import { Prisma, SubAccount, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type UserPermissionsToggleProps = {
	subAccount: SubAccount;
	authUserData: Prisma.PromiseReturnType<typeof getAuthUserDetails>;
	userData: Partial<User>;
	subAccountId: string | null;
	type: "agency" | "subaccount";
};

function UserPermissionsToggle({
	subAccount,
	subAccountId,
	authUserData,
	userData,
	type,
}: UserPermissionsToggleProps) {
	const [subAccountPermissions, setSubAccountsPermissions] =
		useState<Prisma.PromiseReturnType<typeof getUserPermissions> | null>(null);
	const [loadingPermissions, setLoadingPermissions] = useState(false);
	const router = useRouter();
	const { data } = useModal();

	const subAccountWithPermissions = subAccountPermissions?.Permissions.find(
		(p) => p.subAccountId === subAccountId,
	)?.SubAccount;

	async function onToggleChange(
		subAccountId: string,
		val: boolean,
		permissionsId: string | undefined,
	) {
		if (!data.user?.email) return;
		setLoadingPermissions(true);
		const response = await changeUserPermissions(
			permissionsId ? permissionsId : crypto.randomUUID(),
			data.user.email,
			subAccountId,
			val,
		);
		if (type === "agency") {
			await saveActivityLogsNotification({
				agencyId: authUserData?.Agency?.id,
				description: `Gave ${userData?.name} access to | ${subAccountWithPermissions?.name} `,
				subaccountId: subAccountWithPermissions?.id,
			});
		}

		if (response) {
			toast.success("Success", {
				description: "The request was successfull",
			});
			if (subAccountPermissions) {
				subAccountPermissions.Permissions.find((perm) => {
					if (perm.subAccountId === subAccountId) {
						return { ...perm, access: !perm.access };
					}
					return perm;
				});
			}
		} else {
			toast.error("Failed", {
				description: "Could not update permissions",
			});
		}
		router.refresh();
		setLoadingPermissions(false);
	}

	useEffect(() => {
		if (!data.user) return;
		const getPermissions = async () => {
			if (!data.user) return;
			const permission = await getUserPermissions(data.user.id);
			if (!permission) return;
			setSubAccountsPermissions(permission);
		};
		getPermissions();
	}, [data.user]);

	const subAccountPermissionsDetails = subAccountPermissions?.Permissions.find(
		(p) => p.subAccountId === subAccount.id,
	);

	return (
		<>
			<div
				key={subAccount.id}
				className="flex items-center justify-between rounded-lg border p-4"
			>
				<div>
					<p>{subAccount.name}</p>
				</div>
				<Switch
					disabled={loadingPermissions}
					checked={subAccountPermissionsDetails?.access}
					onCheckedChange={(permission) => {
						onToggleChange(
							subAccount.id,
							permission,
							subAccountPermissionsDetails?.id,
						);
					}}
				/>
			</div>
		</>
	);
}
export { UserPermissionsToggle };
