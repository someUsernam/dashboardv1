import { CommandItem } from "@/components/ui/command";
import { SubAccount } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import DeleteModal from "./delete-modal";

type SubaccountItemProps = {
	subaccount: SubAccount;
};

function SubaccountItem({ subaccount }: SubaccountItemProps) {
	return (
		<CommandItem
			key={subaccount.id}
			className="h-32 !bg-background my-2 text-primary border-[1px] border-border p-4 rounded-lg hover:!bg-background cursor-pointer transition-all"
		>
			<Link
				href={`/subaccount/${subaccount.id}`}
				className="flex gap-4 w-full h-full"
			>
				<div className="relative w-32">
					<Image
						src={subaccount.subAccountLogo}
						alt="subaccount logo"
						fill
						className="rounded-md object-contain bg-muted/50 p-4"
					/>
				</div>
				<div className="flex flex-col justify-between">
					<div className="flex flex-col">
						{subaccount.name}
						<span className="text-muted-foreground text-xs">
							{subaccount.address}
						</span>
					</div>
				</div>
			</Link>
			<DeleteModal subaccount={subaccount} />
		</CommandItem>
	);
}
export default SubaccountItem;
