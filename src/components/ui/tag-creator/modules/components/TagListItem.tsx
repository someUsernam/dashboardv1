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
import { CustomTag } from "@/components/ui/custom-tag";
import { Tag } from "@prisma/client";
import { TrashIcon } from "lucide-react";

type TagListItemProps = {
	tag: Tag;
	handleAddSelections: (tag: Tag) => void;
	handleDeleteTag: (tagId: string) => void;
};

function TagListItem({
	tag,
	handleAddSelections,
	handleDeleteTag,
}: TagListItemProps) {
	return (
		<AlertDialog>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div onClick={() => handleAddSelections(tag)}>
				<CustomTag title={tag.name} colorName={tag.color} />
			</div>

			<AlertDialogTrigger>
				<TrashIcon
					size={16}
					className="cursor-pointer text-muted-foreground hover:text-rose-400  transition-all"
				/>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your the
						tag and remove it from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						className="bg-destructive"
						onClick={() => handleDeleteTag(tag.id)}
					>
						Delete Tag
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
export { TagListItem };
