"use client";

import { getAuthUserDetails } from "@/lib/queries";
import {
	Agency,
	AgencySidebarOption,
	Prisma,
	SubAccount,
	SubAccountSidebarOption,
} from "@prisma/client";
import { Button } from "@ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@ui/command";
import { Sheet, SheetContent, SheetTrigger } from "@ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import SelectAccount from "./select-account";
import SidebarOptions from "./sidebar-options";

type Props = {
	defaultOpen?: boolean;
	subAccounts: SubAccount[];
	sidebarOptions: AgencySidebarOption[] | SubAccountSidebarOption[];
	details: SubAccount | Agency;
	user: Prisma.PromiseReturnType<typeof getAuthUserDetails>;
};
function SidebarContent({
	defaultOpen = true,
	subAccounts,
	sidebarOptions,
	details,
	user,
}: Props) {
	const [openSidebar, setOpenSidebar] = useState(defaultOpen);

	return (
		<Sheet
			modal={false}
			defaultOpen={defaultOpen}
			open={openSidebar}
			// onOpenChange={() => {
			// 	setOpenSidebar((prev) => !prev);
			// }}
		>
			<SheetTrigger asChild className="absolute left-4 top-4 z-10">
				<Button variant="outline" size="icon">
					<Menu />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-full md:w-[300px]">
				<SelectAccount
					details={details}
					subAccounts={subAccounts}
					user={user}
					defaultOpen={defaultOpen}
				/>
				<nav className="relative">
					<Command className="bg-transparent">
						<CommandInput placeholder="Search..." />
						<CommandList className="py-4 max-h-full ">
							<CommandEmpty>No Results Found</CommandEmpty>
							<CommandGroup>
								{sidebarOptions.map((sidebarOption) => (
									<CommandItem key={sidebarOption.id}>
										<SidebarOptions sidebarOption={sidebarOption} />
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</nav>
			</SheetContent>
		</Sheet>
	);
}
export { SidebarContent };
