"use client";

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
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteContact } from "@/lib/actions";
import { saveActivityLogsNotification } from "@/lib/queries";
import { Loader2, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type MoreOptionsDropdownProps = {
	contactId: string;
	subAccountId: string;
};

function MoreOptionsDropdown({
	contactId,
	subAccountId,
}: MoreOptionsDropdownProps) {
	const router = useRouter();
	const [status, setStatus] = useState("idle");

	const handleDeleteContact = async () => {
		setStatus("loading");

		try {
			const response = await deleteContact(contactId);

			await saveActivityLogsNotification({
				description: `Deleted contact | ${response.name}`,
				subaccountId: subAccountId,
				agencyId: undefined,
			});

			toast.success("Success", {
				description: "Contact deleted",
			});

			router.refresh();
		} catch (error) {
			toast.error("Error", {
				description: `Failed to delete contact | ${(error as Error).message}`,
			});
		}

		setStatus("idle");
	};

	return (
		<AlertDialog>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<MoreVertical className="text-muted-foreground cursor-pointer" />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Actions</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem>Edit</DropdownMenuItem>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem>Delete</DropdownMenuItem>
					</AlertDialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete this contact? All information
						affiliated with this contact will be lost!
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={status === "loading"}
						className="bg-destructive "
						onClick={handleDeleteContact}
					>
						{status === "loading" && <Loader2 className="animate-spin" />}
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
export default MoreOptionsDropdown;
