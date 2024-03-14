"use client";

import CreateLaneForm from "@/components/forms/create-lane-form";
import CreateTicketForm from "@/components/forms/create-ticket-form";
import { LaneDetail, TicketWithTags } from "@/lib/types";
import { useModal } from "@/providers/modal-provider";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Badge } from "@ui/badge";
import CustomModal from "@ui/custom-modal";
import { Dispatch, SetStateAction } from "react";
import { formattedAmount } from "../../utils/getFormattedAmount";
import { getLaneAmount } from "../../utils/getLaneAmount";
import { useDeleteLane } from "../../utils/hooks/useDeleteLane";
import PipelineTicket from "../pipeline-ticket";
import { LaneOptionsDropdown } from "./_components/lane-options-dropdown";

interface PipelaneLaneProps {
	setAllTickets: Dispatch<SetStateAction<TicketWithTags>>;
	allTickets: TicketWithTags;
	tickets: TicketWithTags;
	pipelineId: string;
	laneDetails: LaneDetail;
	subaccountId: string;
	index: number;
}

function PipelineLane({
	setAllTickets,
	tickets,
	pipelineId,
	laneDetails,
	subaccountId,
	allTickets,
	index,
}: PipelaneLaneProps) {
	const { setOpen } = useModal();
	const handleDeleteLane = useDeleteLane(subaccountId, laneDetails.id);

	const laneAmt = getLaneAmount(tickets);

	const addNewTicket = (ticket: TicketWithTags[0]) => {
		setAllTickets([...allTickets, ticket]);
	};

	const handleCreateTicket = () => {
		setOpen(
			<CustomModal
				title="Create A Ticket"
				subheading="Tickets are a great way to keep track of tasks"
			>
				<CreateTicketForm
					getNewTicket={addNewTicket}
					laneId={laneDetails.id}
					subaccountId={subaccountId}
				/>
			</CustomModal>,
		);
	};

	const handleEditLane = () => {
		setOpen(
			<CustomModal title="Edit Lane Details" subheading="">
				<CreateLaneForm pipelineId={pipelineId} defaultData={laneDetails} />
			</CustomModal>,
		);
	};

	return (
		<Draggable
			draggableId={String(laneDetails.id)}
			index={index}
			key={laneDetails.id}
		>
			{(provided, snapshot) => {
				if (snapshot.isDragging) {
					//@ts-ignore
					const offset = { x: 0, y: 0 };
					//@ts-ignore
					const x = provided.draggableProps.style?.left - offset.x;
					//@ts-ignore
					const y = provided.draggableProps.style?.top - offset.y;
					//@ts-ignore
					provided.draggableProps.style = {
						...provided.draggableProps.style,
						top: y,
						left: x,
					};
				}
				return (
					<div
						className="bg-foreground/5  h-[700px] w-80 px-3 relative rounded-lg "
						{...provided.draggableProps}
						ref={provided.innerRef}
					>
						<div
							{...provided.dragHandleProps}
							className="backdrop-blur-lg bg-background/40 absolute top-0 left-0 right-0 z-10  "
						>
							<div className="h-full flex justify-between items-center p-4 cursor-grab border-b">
								<span className="font-bold text-sm">{laneDetails.name}</span>
								<div className="flex items-center">
									<Badge>{formattedAmount.format(laneAmt)}</Badge>
									<LaneOptionsDropdown
										handleCreateTicket={handleCreateTicket}
										handleDeleteLane={handleDeleteLane}
										handleEditLane={handleEditLane}
									/>
								</div>
							</div>
						</div>

						<Droppable
							droppableId={String(laneDetails.id)}
							key={laneDetails.id}
							type="ticket"
						>
							{(provided) => (
								<div className="max-h-full overflow-auto pt-12">
									<div
										{...provided.droppableProps}
										ref={provided.innerRef}
										className="mt-2"
									>
										{tickets.map((ticket, index) => (
											<PipelineTicket
												allTickets={allTickets}
												setAllTickets={setAllTickets}
												subaccountId={subaccountId}
												ticket={ticket}
												key={String(ticket.id)}
												index={index}
											/>
										))}
										{provided.placeholder}
									</div>
								</div>
							)}
						</Droppable>
					</div>
				);
			}}
		</Draggable>
	);
}

export default PipelineLane;
