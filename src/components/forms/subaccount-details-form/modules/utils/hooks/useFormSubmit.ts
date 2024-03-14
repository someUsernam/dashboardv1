import { saveActivityLogsNotification, upsertSubAccount } from "@/lib/queries";
import { useModal } from "@/providers/modal-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Agency, SubAccount } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { subaccountDetailsFormSchema } from "../validation/subaccountDetailsFormSchema";

export function useFormSubmit(
	details: Partial<SubAccount> | undefined,
	agencyDetails: Agency,
	userName: string,
) {
	const { setClose } = useModal();
	const router = useRouter();
	const form = useForm<z.infer<typeof subaccountDetailsFormSchema>>({
		resolver: zodResolver(subaccountDetailsFormSchema),
		defaultValues: {
			name: details?.name || details?.companyEmail?.split("@")[0],
			companyEmail: details?.companyEmail,
			companyPhone: details?.companyPhone,
			address: details?.address,
			city: details?.city,
			zipCode: details?.zipCode,
			state: details?.state,
			country: details?.country,
			subAccountLogo: details?.subAccountLogo,
		},
	});

	async function handleSubmit(
		values: z.infer<typeof subaccountDetailsFormSchema>,
	) {
		try {
			const response = await upsertSubAccount({
				id: details?.id ? details.id : crypto.randomUUID(),
				address: values.address,
				subAccountLogo: values.subAccountLogo,
				city: values.city,
				companyPhone: values.companyPhone,
				country: values.country,
				name: values.name,
				state: values.state,
				zipCode: values.zipCode,
				createdAt: new Date(),
				updatedAt: new Date(),
				companyEmail: values.companyEmail,
				agencyId: agencyDetails.id,
				connectAccountId: "",
				goal: 5,
			});
			if (!response) throw new Error("No response from server");
			await saveActivityLogsNotification({
				agencyId: response.agencyId,
				description: `${userName} | updated sub account | ${response.name}`,
				subaccountId: response.id,
			});

			toast("Subaccount details saved", {
				description: "Successfully saved your subaccount details.",
			});

			setClose();
			router.refresh();
		} catch (error) {
			console.log(error);
			toast.error("Error!", {
				description: "Could not save sub account details.",
			});
		}
	}

	useEffect(() => {
		if (details) {
			form.reset(details);
		}
	}, [details, form]);

	return {
		form,
		handleSubmit,
	};
}
