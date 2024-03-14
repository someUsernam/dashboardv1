"use client";

import SubAccountDetailsForm from "@/components/forms/subaccount-details-form";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import CustomModal from "@/components/ui/custom-modal";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { SheetClose } from "@/components/ui/sheet";
import { getAuthUserDetails } from "@/lib/queries";
import { useModal } from "@/providers/modal-provider";
import { Agency, Prisma, SubAccount } from "@prisma/client";
import { ChevronsUpDown, PlusCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type SelectAccountProps = {
	defaultOpen?: boolean;
	subAccounts: SubAccount[];
	details: any;
	user: Prisma.PromiseReturnType<typeof getAuthUserDetails>;
};

function SelectAccount({
	defaultOpen,
	subAccounts,
	details,
	user,
}: SelectAccountProps) {
	const { setOpen } = useModal();

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className="w-full mt-4 flex items-center justify-between py-8"
					variant="ghost"
				>
					<div className="flex items-center gap-2">
						<div className="size-8 relative">
							<Image
								src={details.agencyLogo}
								alt="Agency Logo"
								fill
								className="rounded-md object-contain"
							/>
						</div>
						<div className="flex flex-col">{details.name}</div>
					</div>
					<div>
						<ChevronsUpDown size={16} className="text-muted-foreground" />
					</div>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="size-80 mt-4 z-[200]">
				<Command className="rounded-lg">
					<CommandInput placeholder="Search Accounts..." />
					<CommandList className="pb-16">
						<CommandEmpty> No results found</CommandEmpty>
						{(user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") &&
							user?.Agency && (
								<CommandGroup heading="Agency">
									<CommandItem className="!bg-transparent my-2 text-primary broder-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
										{defaultOpen ? (
											<Link
												href={`/agency/${user?.Agency?.id}`}
												className="flex gap-4 w-full h-full"
											>
												<div className="relative w-16">
													<Image
														src={user?.Agency?.agencyLogo}
														alt="Agency Logo"
														fill
														className="rounded-md object-contain"
													/>
												</div>
												<div className="flex flex-col flex-1">
													{user?.Agency?.name}
													<span className="text-muted-foreground">
														{user?.Agency?.address}
													</span>
												</div>
											</Link>
										) : (
											<SheetClose asChild>
												<Link
													href={`/agency/${user?.Agency?.id}`}
													className="flex gap-4 w-full h-full"
												>
													<div className="relative w-16">
														<Image
															src={user?.Agency?.agencyLogo}
															alt="Agency Logo"
															fill
															className="rounded-md object-contain"
														/>
													</div>
													<div className="flex flex-col flex-1">
														{user?.Agency?.name}
														<span className="text-muted-foreground">
															{user?.Agency?.address}
														</span>
													</div>
												</Link>
											</SheetClose>
										)}
									</CommandItem>
								</CommandGroup>
							)}
						<CommandGroup heading="Accounts">
							{subAccounts
								? subAccounts.map((subaccount) => (
										<CommandItem key={subaccount.id}>
											{defaultOpen ? (
												<Link
													href={`/subaccount/${subaccount.id}`}
													className="flex gap-4 size-full"
												>
													<div className="relative w-16">
														<Image
															src={subaccount.subAccountLogo}
															alt="subaccount Logo"
															fill
															className="rounded-md object-contain"
														/>
													</div>
													<div className="flex flex-col flex-1">
														{subaccount.name}
														<span className="text-muted-foreground">
															{subaccount.address}
														</span>
													</div>
												</Link>
											) : (
												<SheetClose asChild>
													<Link
														href={`/subaccount/${subaccount.id}`}
														className="flex gap-4 w-full h-full"
													>
														<div className="relative w-16">
															<Image
																src={subaccount.subAccountLogo}
																alt="subaccount Logo"
																fill
																className="rounded-md object-contain"
															/>
														</div>
														<div className="flex flex-col flex-1">
															{subaccount.name}
															<span className="text-muted-foreground">
																{subaccount.address}
															</span>
														</div>
													</Link>
												</SheetClose>
											)}
										</CommandItem>
								  ))
								: "No Accounts"}
						</CommandGroup>
					</CommandList>
					{(user?.role === "AGENCY_OWNER" || user?.role === "AGENCY_ADMIN") && (
						<SheetClose>
							<Button
								className="w-full flex gap-2"
								onClick={() => {
									setOpen(
										<CustomModal
											title="Create A Subaccount"
											subheading="You can switch between your agency account and the subaccount from the sidebar"
										>
											<SubAccountDetailsForm
												agencyDetails={user?.Agency as Agency}
												userId={user?.id as string}
												userName={user?.name}
											/>
										</CustomModal>,
									);
								}}
							>
								<PlusCircleIcon size={15} />
								Create Sub Account
							</Button>
						</SheetClose>
					)}
				</Command>
			</PopoverContent>
		</Popover>
	);
}
export default SelectAccount;
