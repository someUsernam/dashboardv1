import { icons } from "@/lib/consts";
import { AgencySidebarOption, SubAccountSidebarOption } from "@prisma/client";
import Link from "next/link";

type SidebarOptionsProps = {
	sidebarOption: AgencySidebarOption | SubAccountSidebarOption;
};

function SidebarOptions({ sidebarOption }: SidebarOptionsProps) {
	const Icon = icons.find((icon) => icon.value === sidebarOption.icon);

	return (
		<Link href={sidebarOption.link} className="flex items-center gap-2 w-full">
			{Icon ? <Icon.path /> : null}
			<span>{sidebarOption.name}</span>
		</Link>
	);
}
export default SidebarOptions;
