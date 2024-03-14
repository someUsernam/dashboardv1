import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";

type DeleteAgencyZoneProps = {
	agencyId: string | undefined;
	isSubmitting: boolean;
	deletingAgency: boolean;
	handleDeleteAgency: () => void;
};

function DeleteAgencyZone({
	agencyId,
	isSubmitting,
	deletingAgency,
	handleDeleteAgency,
}: DeleteAgencyZoneProps) {
	return (
		<AlertDialog>
			{agencyId && (
				<div className="flex flex-col md:flex-row items-center justify-between rounded-lg border border-destructive gap-4 p-3 mt-4">
					<div>
						<div>Danger Zone</div>
					</div>
					<div className="text-muted-foreground line-clamp-3">
						Deleting your agency cannpt be undone. This will also delete all sub
						accounts and all data related to your sub accounts.
					</div>
					<AlertDialogTrigger
						disabled={isSubmitting || deletingAgency}
						className="bg-destructive hover:bg-red-700 transition-colors text-secondary p-2 rounded-md whitespace-nowrap"
					>
						{deletingAgency && <Loader2 className="animate-spin" />}
						Delete Agency
					</AlertDialogTrigger>
				</div>
			)}

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete the
						Agency account and all related sub accounts.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={deletingAgency}
						className="bg-destructive"
						onClick={handleDeleteAgency}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
export { DeleteAgencyZone };
