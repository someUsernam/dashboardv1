"use client";
import { deleteMedia, saveActivityLogsNotification } from "@/lib/queries";
import { Media } from "@prisma/client";
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
} from "@ui/alert-dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import { Copy, MoreHorizontal, Trash } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = { file: Media };

function MediaCard({ file }: Props) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	return (
		<AlertDialog>
			<DropdownMenu>
				<article className="w-full rounded-lg bg-input">
					<div className="relative w-full h-40">
						<Image
							src={file.link}
							alt="preview image"
							fill
							className="object-cover bg-center rounded-b-lg"
						/>
					</div>
					<div className="p-4 text-primary">
						<div className="flex items-center justify-between">
							<p>{file.createdAt.toDateString()}</p>
							<DropdownMenuTrigger>
								<MoreHorizontal />
							</DropdownMenuTrigger>
						</div>
						<p>{file.name}</p>
					</div>
					<DropdownMenuContent>
						<DropdownMenuLabel>Menu</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="flex gap-2"
							onClick={() => {
								navigator.clipboard.writeText(file.link);
								toast("Copied To Clipboard");
							}}
						>
							<Copy size={15} />
							Copy Image Link
						</DropdownMenuItem>
						<AlertDialogTrigger asChild>
							<DropdownMenuItem className="flex gap-2">
								<Trash size={15} />
								Delete File
							</DropdownMenuItem>
						</AlertDialogTrigger>
					</DropdownMenuContent>
				</article>
			</DropdownMenu>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						Are you sure you want to delete this file? All subaccount using this
						file will no longer have access to it!
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						className="bg-destructive "
						onClick={async () => {
							setLoading(true);
							const response = await deleteMedia(file.id);
							await saveActivityLogsNotification({
								agencyId: undefined,
								description: `Deleted a media file | ${response?.name}`,
								subaccountId: response.subAccountId,
							});
							toast.success("Deleted File", {
								description: "Successfully deleted the file",
							});
							setLoading(false);
							router.refresh();
						}}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export { MediaCard };
