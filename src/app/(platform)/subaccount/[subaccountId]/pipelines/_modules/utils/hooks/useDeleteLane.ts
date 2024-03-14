import { deleteLane, saveActivityLogsNotification } from "@/lib/queries";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useDeleteLane(subaccountId: string, laneID: string) {
	const router = useRouter();

	const handleDeleteLane = async () => {
		try {
			const response = await deleteLane(laneID);
			await saveActivityLogsNotification({
				agencyId: undefined,
				description: `Deleted a lane | ${response?.name}`,
				subaccountId,
			});
			router.refresh();
			toast.success("Deleted", {
				description: "Deleted a lane",
			});
		} catch (error) {
			toast.error("Error", {
				description: `Deletion Failed | ${(error as Error).message}`,
			});
		}
	};

	return handleDeleteLane;
}
