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
import { Edit, MoreVertical, PlusCircleIcon, Trash } from "lucide-react";

type LaneOptionsDropdownProps = {
	handleCreateTicket: () => void;
	handleDeleteLane: () => void;
	handleEditLane: () => void;
};

function LaneOptionsDropdown({
	handleCreateTicket,
	handleDeleteLane,
	handleEditLane,
}: LaneOptionsDropdownProps) {
	return (
		<AlertDialog>
			<DropdownMenu>
				<DropdownMenuTrigger>
					<MoreVertical className="text-muted-foreground cursor-pointer" />
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuLabel>Options</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<AlertDialogTrigger asChild>
						<DropdownMenuItem className="flex items-center gap-2">
							<Trash size={15} />
							Delete
						</DropdownMenuItem>
					</AlertDialogTrigger>
					<DropdownMenuItem
						className="flex items-center gap-2"
						onClick={handleEditLane}
					>
						<Edit size={15} />
						Edit
					</DropdownMenuItem>
					<DropdownMenuItem
						className="flex items-center gap-2"
						onClick={handleCreateTicket}
					>
						<PlusCircleIcon size={15} />
						Create Ticket
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className="bg-destructive"
						onClick={handleDeleteLane}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
export { LaneOptionsDropdown };
