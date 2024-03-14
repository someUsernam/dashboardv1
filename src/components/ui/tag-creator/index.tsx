"use client";
import {
	deleteTag,
	getTagsForSubaccount,
	saveActivityLogsNotification,
	upsertTag,
} from "@/lib/queries";
import { Tag } from "@prisma/client";
import { CustomTag } from "@ui/custom-tag";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@ui/command";
import { TagListItem } from "./modules/components/TagListItem";
import TagSearchInput from "./modules/components/TagSearchInput";

type TagCreatorProps = {
	subAccountId: string;
	getSelectedTags: (tags: Tag[]) => void;
	defaultTags?: Tag[];
};

const TagColors = ["BLUE", "ORANGE", "ROSE", "PURPLE", "GREEN"] as const;

export type TagColor = (typeof TagColors)[number];

function TagCreator({
	getSelectedTags,
	subAccountId,
	defaultTags,
}: TagCreatorProps) {
	const router = useRouter();
	const [selectedTags, setSelectedTags] = useState<Tag[]>(defaultTags || []);
	const [tags, setTags] = useState<Tag[]>([]);
	const [value, setValue] = useState("");
	const [selectedColor, setSelectedColor] = useState("");

	useEffect(() => {
		getSelectedTags(selectedTags);
	}, [selectedTags, getSelectedTags]);

	useEffect(() => {
		if (subAccountId) {
			const fetchData = async () => {
				const response = await getTagsForSubaccount(subAccountId);
				if (response) setTags(response.Tags);
			};
			fetchData();
		}
	}, [subAccountId]);

	const handleDeleteSelection = (tagId: string) => {
		setSelectedTags((prev) => prev.filter((tag) => tag.id !== tagId));
	};

	const handleAddTag = async () => {
		if (!value) {
			toast.error("Tags need to have a name");
			return;
		}
		if (!selectedColor) {
			toast.error("Please Select a color");
			return;
		}
		const newTag: Tag = {
			color: selectedColor,
			createdAt: new Date(),
			id: crypto.randomUUID(),
			name: value,
			subAccountId,
			updatedAt: new Date(),
		};

		setTags((prev) => [...prev, newTag]);
		setValue("");
		setSelectedColor("");
		try {
			const response = await upsertTag(subAccountId, newTag);
			toast("Created the tag");

			await saveActivityLogsNotification({
				agencyId: undefined,
				description: `Updated a tag | ${response?.name}`,
				subaccountId: subAccountId,
			});
		} catch (error) {
			toast.error(`Could not create tag | ${(error as Error).message}`);
		}
	};

	const handleAddSelections = (tag: Tag) => {
		if (selectedTags.every((t) => t.id !== tag.id)) {
			setSelectedTags([...selectedTags, tag]);
		}
	};

	const handleDeleteTag = async (tagId: string) => {
		setTags((prev) => prev.filter((tag) => tag.id !== tagId));
		try {
			const response = await deleteTag(tagId);
			toast("Deleted tag", {
				description: "The tag is deleted from your subaccount.",
			});

			await saveActivityLogsNotification({
				agencyId: undefined,
				description: `Deleted a tag | ${response?.name}`,
				subaccountId: subAccountId,
			});

			router.refresh();
		} catch (error) {
			toast(`Could not delete tag | ${(error as Error).message}`);
		}
	};

	return (
		<Command className="bg-transparent">
			{!!selectedTags.length && (
				<div className="flex flex-wrap gap-2 p-2 bg-background border rounded-md">
					{selectedTags.map((tag) => (
						<div key={tag.id} className="flex items-center">
							<CustomTag title={tag.name} colorName={tag.color} />
							<X
								className="p-1 size-7 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
								onClick={() => handleDeleteSelection(tag.id)}
							/>
						</div>
					))}
				</div>
			)}
			<div className="flex items-center gap-2 my-2">
				{TagColors.map((colorName) => (
					<CustomTag
						key={colorName}
						setSelectedColor={setSelectedColor}
						selectedColor={selectedColor}
						title=""
						colorName={colorName}
					/>
				))}
			</div>
			<TagSearchInput
				value={value}
				setValue={setValue}
				handleAddTag={handleAddTag}
			/>
			<CommandList>
				<CommandSeparator />
				<CommandGroup heading="Tags">
					{tags.map((tag) => (
						<CommandItem
							key={tag.id}
							className="hover:!bg-secondary !bg-transparent flex items-center justify-between cursor-pointer"
							// onClick={() => handleAddSelections(tag)}
						>
							<TagListItem
								handleAddSelections={handleAddSelections}
								handleDeleteTag={handleDeleteTag}
								tag={tag}
							/>
						</CommandItem>
					))}
				</CommandGroup>
				<CommandEmpty>No results found.</CommandEmpty>
			</CommandList>
		</Command>
	);
}

export default TagCreator;
