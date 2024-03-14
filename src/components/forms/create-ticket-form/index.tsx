"use client";
import { Form, FormLabel } from "@/components/ui/form";
import { SubmitButton } from "@/components/ui/submit-button";
import TagCreator from "@/components/ui/tag-creator";
import {
	getSubAccountTeamMembers,
	saveActivityLogsNotification,
	searchContacts,
	upsertTicket,
} from "@/lib/queries";
import { TicketWithTags } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useModal } from "@/providers/modal-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact, Tag, User } from "@prisma/client";
import { Button } from "@ui/button";
import { Card, CardContent } from "@ui/card";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
	DescriptionField,
	NameField,
	ValueFiled,
} from "./modules/components/Fields";
import { Header } from "./modules/components/Header";
import TeamMemberSelect from "./modules/components/TeamMemberSelect";
import { createTicketFormSchema } from "./modules/utils/validation/createTicktetFormSchema";

type Props = {
	laneId: string;
	subaccountId: string;
	getNewTicket: (ticket: TicketWithTags[0]) => void;
};

function CreateTicketForm({ getNewTicket, laneId, subaccountId }: Props) {
	const { data: defaultData, setClose } = useModal();
	const router = useRouter();
	const [tags, setTags] = useState<Tag[]>([]);
	const [contact, setContact] = useState("");
	const [search, setSearch] = useState("");
	const [contactList, setContactList] = useState<Contact[]>([]);
	const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();
	const [allTeamMembers, setAllTeamMembers] = useState<User[]>([]);
	const [assignedTo, setAssignedTo] = useState(
		defaultData.ticket?.Assigned?.id || "",
	);

	const form = useForm<z.infer<typeof createTicketFormSchema>>({
		mode: "onChange",
		resolver: zodResolver(createTicketFormSchema),
		defaultValues: {
			name: defaultData.ticket?.name || "",
			description: defaultData.ticket?.description || "",
			value: String(defaultData.ticket?.value || 0),
		},
	});

	useEffect(() => {
		if (subaccountId) {
			const fetchData = async () => {
				const response = await getSubAccountTeamMembers(subaccountId);
				if (response) setAllTeamMembers(response);
			};
			fetchData();
		}
	}, [subaccountId]);

	useEffect(() => {
		if (defaultData.ticket) {
			form.reset({
				name: defaultData.ticket.name || "",
				description: defaultData.ticket?.description || "",
				value: String(defaultData.ticket?.value || 0),
			});
			if (defaultData.ticket.customerId)
				setContact(defaultData.ticket.customerId);

			const fetchData = async () => {
				const response = await searchContacts(
					//@ts-ignore
					defaultData.ticket?.Customer?.name,
				);
				setContactList(response);
			};
			fetchData();
		}
	}, [defaultData, form.reset]);

	const onSubmit = async (values: z.infer<typeof createTicketFormSchema>) => {
		if (!laneId) return;
		try {
			const response = await upsertTicket(
				{
					...values,
					value: Number(values.value),
					laneId,
					id: defaultData.ticket?.id,
					assignedUserId: assignedTo,
					...(contact ? { customerId: contact } : {}),
				},
				tags,
			);

			await saveActivityLogsNotification({
				agencyId: undefined,
				description: `Updated a ticket | ${response?.name}`,
				subaccountId,
			});

			toast.success("Success", {
				description: "Saved  details",
			});
			if (response) getNewTicket(response);
			router.refresh();
		} catch (error) {
			toast.error("Oppse!", {
				description: "Could not save pipeline details",
			});
		}
		setClose();
	};

	return (
		<Card className="w-full">
			<Header />
			<CardContent>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
						<NameField form={form} />
						<DescriptionField form={form} />
						<ValueFiled form={form} />
						<h3>Add tags</h3>
						<TagCreator
							subAccountId={subaccountId}
							getSelectedTags={setTags}
							defaultTags={defaultData.ticket?.Tags || []}
						/>
						<FormLabel>Assigned To Team Member</FormLabel>
						<TeamMemberSelect
							allTeamMembers={allTeamMembers}
							assignedTo={assignedTo}
							setAssignedTo={setAssignedTo}
						/>
						<FormLabel>Customer</FormLabel>
						<Popover>
							<PopoverTrigger asChild className="w-full">
								<Button
									variant="outline"
									role="combobox"
									className="justify-between"
								>
									{contact
										? contactList.find((c) => c.id === contact)?.name
										: "Select Customer..."}
									<ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-[400px] p-0">
								<Command>
									<CommandInput
										placeholder="Search..."
										className="h-9"
										value={search}
										onChangeCapture={async (value) => {
											//@ts-ignore
											setSearch(value.target.value);
											if (saveTimerRef.current)
												clearTimeout(saveTimerRef.current);
											saveTimerRef.current = setTimeout(async () => {
												const response = await searchContacts(
													//@ts-ignore
													value.target.value,
												);
												setContactList(response);
												setSearch("");
											}, 1000);
										}}
									/>
									<CommandEmpty>No Customer found.</CommandEmpty>
									<CommandGroup>
										{contactList.map((c) => (
											<CommandItem
												key={c.id}
												value={c.id}
												onSelect={(currentValue) => {
													setContact(
														currentValue === contact ? "" : currentValue,
													);
												}}
											>
												{c.name}
												<CheckIcon
													className={cn(
														"ml-auto h-4 w-4",
														contact === c.id ? "opacity-100" : "opacity-0",
													)}
												/>
											</CommandItem>
										))}
									</CommandGroup>
								</Command>
							</PopoverContent>
						</Popover>
						<SubmitButton isSubmitting={form.formState.isSubmitting} />
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}

export default CreateTicketForm;
