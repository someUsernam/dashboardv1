import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import BlurPage from "@/components/ui/blur-page";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { CraeteContactButton } from "./_modules/components/create-contact-btn";
import MoreOptionsDropdown from "./_modules/components/more-options-dropdown";
import { formatTotal } from "./_modules/utils/formatTotal";
import { getContactBySubAccountId } from "./_modules/utils/queries";

type Props = {
	params: { subaccountId: string };
};

async function Page({ params }: Props) {
	const contacts = await getContactBySubAccountId(params.subaccountId);

	const allContacts = contacts.Contact;

	return (
		<BlurPage>
			<div className="flex items-center justify-between">
				<h1 className="text-4xl pb-4">Contacts</h1>
				<CraeteContactButton subaccountId={params.subaccountId} />
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[200px]">Name</TableHead>
						<TableHead className="w-[300px]">Email</TableHead>
						<TableHead className="w-[200px]">Active</TableHead>
						<TableHead>Created Date</TableHead>
						<TableHead className="text-right">Total Value</TableHead>
						<TableHead className="text-right">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="font-medium truncate">
					{allContacts.map((contact) => (
						<TableRow key={contact.id}>
							<TableCell>
								<Avatar>
									<AvatarImage alt={`${contact.name} image`} />
									<AvatarFallback className="bg-secondary text-primary">
										{contact.name.slice(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							</TableCell>
							<TableCell>{contact.email}</TableCell>
							<TableCell>
								{formatTotal(contact.Ticket) === "$0.00" ? (
									<Badge variant={"destructive"}>Inactive</Badge>
								) : (
									<Badge className="bg-emerald-700">Active</Badge>
								)}
							</TableCell>
							<TableCell>{contact.createdAt.toLocaleDateString()}</TableCell>
							<TableCell className="text-right">
								{formatTotal(contact.Ticket)}
							</TableCell>
							<TableCell className="text-right">
								<MoreOptionsDropdown
									contactId={contact.id}
									subAccountId={params.subaccountId}
								/>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</BlurPage>
	);
}
export default Page;
