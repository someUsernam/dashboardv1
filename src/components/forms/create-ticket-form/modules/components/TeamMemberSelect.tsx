import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { User2 } from "lucide-react";

type TeamMemberSelectProps = {
	assignedTo: string;
	setAssignedTo: (value: string) => void;
	allTeamMembers: { id: string; avatarUrl: string; name: string }[];
};

function TeamMemberSelect({
	assignedTo,
	setAssignedTo,
	allTeamMembers,
}: TeamMemberSelectProps) {
	return (
		<Select onValueChange={setAssignedTo} defaultValue={assignedTo}>
			<SelectTrigger>
				<SelectValue
					placeholder={
						<div className="flex items-center gap-2">
							<Avatar className="w-8 h-8">
								<AvatarImage alt="contact" />
								<AvatarFallback className="bg-primary text-sm text-white">
									<User2 size={14} />
								</AvatarFallback>
							</Avatar>

							<span className="text-sm text-muted-foreground">
								Not Assigned
							</span>
						</div>
					}
				/>
			</SelectTrigger>
			<SelectContent>
				{allTeamMembers.map((teamMember) => (
					<SelectItem key={teamMember.id} value={teamMember.id}>
						<div className="flex items-center gap-2">
							<Avatar className="w-8 h-8">
								<AvatarImage alt="contact" src={teamMember.avatarUrl} />
								<AvatarFallback className="bg-primary text-sm text-white">
									<User2 size={14} />
								</AvatarFallback>
							</Avatar>

							<span className="text-sm text-muted-foreground">
								{teamMember.name}
							</span>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
export default TeamMemberSelect;
