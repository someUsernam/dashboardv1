import { saveActivityLogsNotification, upsertPipeline } from "@/lib/queries";
import { useModal } from "@/providers/modal-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { createPipelineFormSchema } from "../validation/createPipelineFormSchema";
import { Pipeline } from "@prisma/client";

export function useFormSubmit(
	defaultData: Pipeline | undefined,
	subAccountId: string,
) {
	const router = useRouter();
	const { setClose } = useModal();

	const form = useForm<z.infer<typeof createPipelineFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(createPipelineFormSchema),
		defaultValues: {
			name: defaultData?.name || "",
		},
	});

	useEffect(() => {
		if (defaultData) {
			form.reset({
				name: defaultData.name || "",
			});
		}
	}, [defaultData, form.reset]);

	async function handleSubmit(
		values: z.infer<typeof createPipelineFormSchema>,
	) {
		if (!subAccountId) return;
		try {
			const response = await upsertPipeline({
				...values,
				id: defaultData?.id,
				subAccountId: subAccountId,
			});

			await saveActivityLogsNotification({
				agencyId: undefined,
				description: `Updates a pipeline | ${response?.name}`,
				subaccountId: subAccountId,
			});

			toast.success("Success", {
				description: "Saved pipeline details",
			});
			router.refresh();
		} catch (error) {
			toast.error("Oppse!", {
				description: "Could not save pipeline details",
			});
		}

		setClose();
	}

	return { form, handleSubmit };
}
