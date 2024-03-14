import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { agencyDetailsFormSchema } from "../../utils/validation/agencyDetailsFormSchema";

type FormType = UseFormReturn<z.infer<typeof agencyDetailsFormSchema>>;

type WhiteLabelFieldProps = {
	form: FormType;
};

function WhiteLabelField({ form }: WhiteLabelFieldProps) {
	return (
		<FormField
			disabled={form.formState.isSubmitting}
			control={form.control}
			name="whiteLabel"
			render={({ field }) => {
				return (
					<FormItem className="flex flex-row items-center justify-between rounded-lg border gap-4 p-4">
						<div>
							<FormLabel>Whitelabel Agency</FormLabel>
							<FormDescription>
								Turning on whilelabel mode will show your agency logo to all sub
								accounts by default. You can overwrite this functionality
								through sub account settings.
							</FormDescription>
						</div>

						<FormControl>
							<Switch checked={field.value} onCheckedChange={field.onChange} />
						</FormControl>
					</FormItem>
				);
			}}
		/>
	);
}
export { WhiteLabelField };
