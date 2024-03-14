import { saveActivityLogsNotification, upsertTicket } from "@/lib/queries";
import { useModal } from "@/providers/modal-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createTicketFormSchema } from "../validation/createTicktetFormSchema";
import { toast } from "sonner";

type Props = {
	laneId: string;
	subaccountId: string;
	getNewTicket: (ticket: TicketWithTags[0]) => void;
};

export function useFormSubmit() {
	const router = useRouter();
	const { setClose } = useModal();

	const form = useForm<z.infer<typeof createTicketFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(createTicketFormSchema),
		defaultValues: {
			name: defaultData.ticket?.name || "",
			description: defaultData.ticket?.description || "",
			value: String(defaultData.ticket?.value || 0),
		},
	});

	const handleSubmit = async (
		values: z.infer<typeof createTicketFormSchema>,
	) => {
		if (!laneId) return;
		try {
			const response = await upsertTicket(
				{
					...values,
					laneId,
					id: defaultData.ticket?.id,
					assignedUserId: assignedTo,
					...(contact ? { customerId: contact } : {}),
				},
				tags,
			);

			await saveActivityLogsNotification({
				agencyId: undefined,
				description: `Updated a ticket | ${response?.name}`,
				subaccountId,
			});

			toast.success("Success", {
				description: "Saved  details",
			});
			if (response) getNewTicket(response);
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
