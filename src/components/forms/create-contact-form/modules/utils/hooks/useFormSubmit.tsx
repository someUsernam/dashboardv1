import { upsertContact } from "@/lib/actions";
import { saveActivityLogsNotification } from "@/lib/queries";
import { useModal } from "@/providers/modal-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createContactFormSchema } from "../validation/createContactFormSchema";

type useFormSubmitProps = {
	subaccountId: string;
};

export function useFormSubit({ subaccountId }: useFormSubmitProps) {
	const { data, setClose } = useModal();
	const router = useRouter();

	const form = useForm<z.infer<typeof createContactFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(createContactFormSchema),
		defaultValues: {
			name: "",
			email: "",
		},
	});

	useEffect(() => {
		if (data.contact) {
			form.reset(data.contact);
		}
	}, [data, form.reset]);

	const handleSubmit = async (
		values: z.infer<typeof createContactFormSchema>,
	) => {
		try {
			const response = await upsertContact({
				email: values.email,
				subAccountId: subaccountId,
				name: values.name,
			});
			await saveActivityLogsNotification({
				agencyId: undefined,
				description: `Updated a contact | ${response?.name}`,
				subaccountId: subaccountId,
			});
			toast.success("Success", {
				description: "Saved contact details",
			});
			setClose();
			router.refresh();
		} catch (error) {
			toast.error("Error", {
				description: `Could not save contact details | ${
					(error as Error).message
				}`,
			});
		}
	};

	return { form, handleSubmit };
}
