import SendInvitation from "@/components/forms/send-invitation";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

type Props = {
	params: { agencyId: string };
};

const Page = async ({ params }: Props) => {
	const teamMembers = await db.user.findMany({
		where: {
			Agency: {
				id: params.agencyId,
			},
		},
		include: {
			Agency: { include: { SubAccount: true } },
			Permissions: { include: { SubAccount: true } },
		},
	});

	const agencyDetails = await db.agency.findUnique({
		where: {
			id: params.agencyId,
		},
		include: {
			SubAccount: true,
		},
	});

	if (!agencyDetails) return;

	return (
		<DataTable
			actionButtonText={
				<>
					<Plus size={15} />
					Add
				</>
			}
			modalChildren={<SendInvitation agencyId={agencyDetails.id} />}
			filterValue="name"
			columns={columns}
			data={teamMembers}
		/>
	);
};

export default Page;
