import { createMedia, saveActivityLogsNotification } from "@/lib/queries";
import { useModal } from "@/providers/modal-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { uploadMediaFormSchema } from "../validation/uploadMediaFormSchema";

export function useFormSubmit(subaccountId: string) {
	const { setClose } = useModal();
	const router = useRouter();
	const form = useForm<z.infer<typeof uploadMediaFormSchema>>({
		resolver: zodResolver(uploadMediaFormSchema),
		mode: "onSubmit",
		defaultValues: {
			link: "",
			name: "",
		},
	});

	async function handleSubmit(values: z.infer<typeof uploadMediaFormSchema>) {
		try {
			const response = await createMedia(subaccountId, values);
			await saveActivityLogsNotification({
				agencyId: undefined,
				description: `Uploaded a media file | ${response.name}`,
				subaccountId,
			});

			toast.success("Succes", { description: "Uploaded media" });
			router.refresh();
		} catch (error) {
			toast.error("Failed", {
				description: `Could not uploaded media, ${(error as Error).message}`,
			});
		}

		setClose();
	}

	return { form, handleSubmit };
}
