import { saveActivityLogsNotification, sendInvitation } from "@/lib/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { sendInvitationScheme } from "../validation/sendInvitationScheme";

export function useFormSubmit(agencyId: string) {
	const form = useForm<z.infer<typeof sendInvitationScheme>>({
		resolver: zodResolver(sendInvitationScheme),
		mode: "onChange",
		defaultValues: {
			email: "",
			role: "SUBACCOUNT_USER",
		},
	});

	const onSubmit = async (values: z.infer<typeof sendInvitationScheme>) => {
		try {
			const res = await sendInvitation(values.role, values.email, agencyId);
			console.log(res, agencyId);
			await saveActivityLogsNotification({
				agencyId: agencyId,
				description: `Invited | ${values.email}`,
				subaccountId: undefined,
			});
			toast.success("Success", {
				description: "Created and sent invitation",
			});
		} catch (error) {
			toast.error("Oppse!", {
				description: `Could not send invitation ${(error as Error).message}`,
			});
		}
	};

	return {
		form,
		onSubmit,
	};
}
