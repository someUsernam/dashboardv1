"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NotificationWithUser } from "@/lib/types";

type NotificationItemProps = {
	notification: NotificationWithUser;
};

function NotificationItem({ notification }: NotificationItemProps) {
	const [part1, part2, part3] = notification.notification.split("|");

	return (
		<div
			key={notification.id}
			className="flex flex-col gap-y-2 mb-2 overflow-x-auto text-ellipsis "
		>
			<div className="flex gap-2">
				<Avatar>
					<AvatarImage
						src={notification.User.avatarUrl}
						alt="Profile Picture"
					/>
					<AvatarFallback className="bg-primary">
						{notification.User.name.slice(0, 2).toUpperCase()}
					</AvatarFallback>
				</Avatar>
				<div className="flex flex-col">
					<p>
						<span className="font-bold">{part1}</span>
						<span className="text-muted-foreground">{part2}</span>
						<span className="font-bold">{part3}</span>
					</p>
					<small className="text-xs text-muted-foreground">
						{new Date(notification.createdAt).toLocaleDateString()}
					</small>
				</div>
			</div>
		</div>
	);
}
export default NotificationItem;
