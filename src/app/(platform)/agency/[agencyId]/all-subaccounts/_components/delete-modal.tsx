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
import { Button } from "@/components/ui/button";
import { DeleteButton } from "./delete-button";

type DeleteModalProps = {
	subaccount: { id: string };
};

function DeleteModal({ subaccount }: DeleteModalProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant={"destructive"} className=" hover:bg-red-700">
					Delete
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are your absolutely sure</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undon. This will delete the subaccount and all
						data related to the subaccount.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction className="bg-destructive">
						<DeleteButton subaccountId={subaccount.id} />
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
export default DeleteModal;
