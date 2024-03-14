"use client";

import { Card } from "@/components/ui/card";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { getNotificationAndUser } from "@/lib/queries";
import { Prisma, Role } from "@prisma/client";
import { Bell } from "lucide-react";
import { useState } from "react";
import NotificationItem from ".";

type NotificationProps = {
	notifications: Prisma.PromiseReturnType<typeof getNotificationAndUser> | [];
	role?: Role;
	subAccountId?: string;
};

function Notification({
	notifications,
	subAccountId,
	role,
}: NotificationProps) {
	const [allNotifications, setAllNotifications] = useState(notifications);
	const [showAll, setShowAll] = useState(true);

	const handleFilterNotifications = () => {
		if (!showAll) {
			setAllNotifications(notifications);
		} else {
			if (notifications?.length !== 0) {
				setAllNotifications(
					notifications?.filter((item) => item.subAccountId === subAccountId) ??
						[],
				);
			}
		}
		setShowAll((prev) => !prev);
	};

	return (
		<Sheet>
			<SheetTrigger>
				<div className="rounded-full size-9 bg-muted flex items-center justify-center">
					<Bell size={17} />
				</div>
			</SheetTrigger>
			<SheetContent className="overflow-auto rounded-lg space-y-3 border mx-4 my-4 h-auto">
				<SheetHeader>
					<SheetTitle>Notifications</SheetTitle>
					<SheetDescription>
						{(role === "AGENCY_ADMIN" || role === "AGENCY_OWNER") && (
							<Card className="flex items-center justify-between p-4">
								Current Subaccount
								<Switch onCheckedChange={handleFilterNotifications} />
							</Card>
						)}
					</SheetDescription>
				</SheetHeader>
				{allNotifications?.map((notification) => (
					<NotificationItem notification={notification} key={notification.id} />
				))}
				{allNotifications?.length === 0 && (
					<div
						className="flex items-center justify-center text-muted-foreground"
						mb-4
					>
						You have no notifications
					</div>
				)}
			</SheetContent>
		</Sheet>
	);
}
export { Notification };
