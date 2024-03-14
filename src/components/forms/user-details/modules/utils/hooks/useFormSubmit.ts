import {
	getAuthUserDetails,
	saveActivityLogsNotification,
	updateUser,
} from "@/lib/queries";

import { useModal } from "@/providers/modal-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { userDetailsFormSchema } from "../validation/userDetailsFormSchema";

export function useFormSubmit(
	userData: Partial<User> | undefined,
	id: string | null,
	authUserData: Prisma.PromiseReturnType<typeof getAuthUserDetails>,
) {
	const router = useRouter();
	const { data, setClose } = useModal();

	console.log("userData", userData);
	console.log("data", data);

	const form = useForm<z.infer<typeof userDetailsFormSchema>>({
		resolver: zodResolver(userDetailsFormSchema),
		mode: "onChange",
		defaultValues: {
			name: userData ? userData.name : data?.user?.name,
			email: userData ? userData.email : data?.user?.email,
			avatarUrl: userData ? userData.avatarUrl : data?.user?.avatarUrl,
			role: userData ? userData.role : data?.user?.role,
		},
	});

	useEffect(() => {
		if (data.user) {
			form.reset(data.user);
		}
		if (userData) {
			form.reset(userData);
		}
	}, [userData, data.user, form.reset]);

	const handleSubmit = async (
		values: z.infer<typeof userDetailsFormSchema>,
	) => {
		if (!id) return;
		if (userData) {
			const updatedUser = await updateUser(values);

			const getAccessibleSubAccounts = authUserData?.Agency?.SubAccount.filter(
				(subacc) =>
					authUserData.Permissions.find(
						(p) => p.subAccountId === subacc.id && p.access,
					),
			);

			if (!getAccessibleSubAccounts) return;

			for (const subaccount of getAccessibleSubAccounts) {
				await saveActivityLogsNotification({
					agencyId: undefined,
					description: `Updated | ${userData?.name} information`,
					subaccountId: subaccount.id,
				});
			}

			if (updatedUser) {
				toast.success("Success", {
					description: "Update User Information",
				});
				setClose();
				router.refresh();
			} else {
				toast.error("Error!", {
					description: "Could not update user information",
				});
			}
		} else {
			console.log("Error could not submit");
		}
	};

	return { form, handleSubmit };
}
