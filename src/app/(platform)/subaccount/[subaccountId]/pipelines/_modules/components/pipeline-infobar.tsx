"use client";
import CreatePipelineForm from "@/components/forms/create-pipeline-form";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandItem,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useModal } from "@/providers/modal-provider";
import { Pipeline } from "@prisma/client";
import CustomModal from "@ui/custom-modal";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type Props = {
	subAccountId: string;
	pipelines: Pipeline[];
	pipelineId: string;
};

function PipelineInfoBar({ pipelineId, pipelines, subAccountId }: Props) {
	const { setOpen: setOpenModal, setClose } = useModal();
	const [open, setOpen] = useState(false);
	const [currentPipelineId, setCurrentPipelineId] = useState(pipelineId);

	const handleClickCreatePipeline = () => {
		setOpenModal(
			<CustomModal
				title="Create A Pipeline"
				subheading="Pipelines allows you to group tickets into lanes and track your business processes all in one place."
			>
				<CreatePipelineForm subAccountId={subAccountId} />
			</CustomModal>,
		);
	};

	return (
		<div className="flex items-end gap-2">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between"
					>
						{currentPipelineId
							? pipelines.find((pipeline) => pipeline.id === currentPipelineId)
									?.name
							: "Select a pipeline..."}
						<ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandEmpty>No pipelines found.</CommandEmpty>
						<CommandGroup>
							{pipelines.map((pipeline) => (
								<Link
									key={pipeline.id}
									href={`/subaccount/${subAccountId}/pipelines/${pipeline.id}`}
								>
									<CommandItem
										key={pipeline.id}
										value={pipeline.id}
										onSelect={(value) => {
											setCurrentPipelineId(value);
										}}
									>
										<Check
											className={cn(
												"size-4 mr-2",
												currentPipelineId === pipeline.id
													? "opacity-100"
													: "opacity-0",
											)}
										/>
										{pipeline.name}
									</CommandItem>
								</Link>
							))}
							<Button
								variant="secondary"
								className="flex gap-2 w-full mt-4"
								onClick={handleClickCreatePipeline}
							>
								<Plus size={15} />
								Create Pipeline
							</Button>
						</CommandGroup>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}

export default PipelineInfoBar;
