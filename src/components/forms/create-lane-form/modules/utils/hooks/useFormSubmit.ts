import { Lane } from "@prisma/client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
	getPipelineDetails,
	saveActivityLogsNotification,
	upsertLane,
} from "@/lib/queries";

import { useModal } from "@/providers/modal-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createLaneFormSchema } from "../validation/createLaneFormSchema";

export function useFormSubmit(
	defaultData: Lane | undefined,
	pipelineId: string,
) {
	const { setClose } = useModal();
	const router = useRouter();
	const form = useForm<z.infer<typeof createLaneFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(createLaneFormSchema),
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

	const handleSubmit = async (values: z.infer<typeof createLaneFormSchema>) => {
		if (!pipelineId) return;
		try {
			const response = await upsertLane({
				...values,
				id: defaultData?.id,
				pipelineId: pipelineId,
				order: defaultData?.order,
			});

			const d = await getPipelineDetails(pipelineId);
			if (!d) return;

			await saveActivityLogsNotification({
				agencyId: undefined,
				description: `Updated a lane | ${response?.name}`,
				subaccountId: d.subAccountId,
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
	};

	return { form, handleSubmit };
}
