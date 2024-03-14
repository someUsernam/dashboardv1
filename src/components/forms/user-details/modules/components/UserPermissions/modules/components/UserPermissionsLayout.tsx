import { FormDescription, FormLabel } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";

function UserPermissionsLayout({ children }: Children) {
	return (
		<div>
			<Separator className="my-4" />
			<FormLabel> User Permissions</FormLabel>
			<FormDescription className="mb-4">
				You can give Sub Account access to team member by turning on access
				control for each Sub Account. This is only visible to agency owners
			</FormDescription>
			<div className="flex flex-col gap-4">{children}</div>
		</div>
	);
}
export { UserPermissionsLayout };
