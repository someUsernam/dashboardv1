import { deleteAgency } from "@/lib/queries";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useDeleteAgency(agencyId: string | undefined) {
	const [deletingAgency, setDeletingAgency] = useState(false);
	const router = useRouter();

	const handleDeleteAgency = async () => {
		if (!agencyId) return;
		setDeletingAgency(true);
		//TODO: discontinue the subscription
		try {
			await deleteAgency(agencyId);
			toast.success("Deleted Agency", {
				description: "Deleted your agency and all subaccounts",
			});
			router.refresh();
		} catch (error) {
			console.log(error);
			toast.error("Oppse!", {
				description: "could not delete your agency ",
			});
		}
		setDeletingAgency(false);
	};

	return { deletingAgency, handleDeleteAgency };
}
