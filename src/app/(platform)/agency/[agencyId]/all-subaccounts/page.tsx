import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandList,
} from "@/components/ui/command";
import { getAuthUserDetails } from "@/lib/queries";
import { SubAccount } from "@prisma/client";

import CreateSubaccountButton from "./_components/create-subaccount-btn";
import SubaccountItem from "./_components/subaccount-item";

type Props = {
	params: { agencyId: string };
};

async function Page({ params }: Props) {
	const user = await getAuthUserDetails();
	if (!user) return null;

	return (
		<>
			<CreateSubaccountButton user={user} id={params.agencyId} />
			<Command className="rounded-lg bg-transparent">
				<CommandInput placeholder="Search Account..." />
				<CommandList>
					<CommandEmpty>No Results Found.</CommandEmpty>
					<CommandGroup heading="Sub Accounts">
						{user.Agency?.SubAccount.length ? (
							user.Agency.SubAccount.map((subaccount: SubAccount) => (
								<SubaccountItem key={subaccount.id} subaccount={subaccount} />
							))
						) : (
							<div className="text-muted-foreground text-center p-4">
								No Sub accounts
							</div>
						)}
					</CommandGroup>
				</CommandList>
			</Command>
		</>
	);
}

export default Page;
