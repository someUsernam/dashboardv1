import { CommandInput } from "@/components/ui/command";
import { PlusCircleIcon } from "lucide-react";

type TagSearchInputProps = {
	value: string;
	setValue: (value: string) => void;
	handleAddTag: () => void;
};

function TagSearchInput({
	value,
	setValue,
	handleAddTag,
}: TagSearchInputProps) {
	return (
		<div className="relative">
			<CommandInput
				placeholder="Search for tag..."
				value={value}
				onValueChange={(value) => setValue(value)}
			/>
			<PlusCircleIcon
				onClick={handleAddTag}
				size={20}
				className="absolute top-1/2 transform -translate-y-1/2 right-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer "
			/>
		</div>
	);
}
export default TagSearchInput;
