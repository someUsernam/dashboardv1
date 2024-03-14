import {
	Contact,
	Lane,
	Notification,
	Prisma,
	Role,
	Tag,
	Ticket,
	User,
} from "@prisma/client";
import Stripe from "stripe";
import { db } from "./db";
import {
	_getTicketsWithAllRelations,
	getAuthUserDetails,
	getMedia,
	getPipelineDetails,
	getTicketsWithTags,
	getUserPermissions,
} from "./queries";

export type NotificationWithUser = {
	User: {
		id: string;
		name: string;
		avatarUrl: string;
		email: string;
		createdAt: Date;
		updatedAt: Date;
		role: Role;
		agencyId: string | null;
	};
} & Notification;

export type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type UserWithPermissionsAndSubAccounts = Prisma.PromiseReturnType<
	typeof getUserPermissions
>;

export type AuthUserWithAgencySigebarOptionsSubAccounts =
	Prisma.PromiseReturnType<typeof getAuthUserDetails>;

const __getUsersWithAgencySubAccountPermissionsSidebarOptions = async (
	agencyId: string,
) => {
	return await db.user.findFirst({
		where: { Agency: { id: agencyId } },
		include: {
			Agency: { include: { SubAccount: true } },
			Permissions: { include: { SubAccount: true } },
		},
	});
};

export type UsersWithAgencySubAccountPermissionsSidebarOptions =
	Prisma.PromiseReturnType<
		typeof __getUsersWithAgencySubAccountPermissionsSidebarOptions
	>;

export type CreateMediaType = Prisma.MediaCreateWithoutSubaccountInput;

export type GetMediaFiles = Prisma.PromiseReturnType<typeof getMedia>;

export type TicketAndTags = Ticket & {
	Tags: Tag[];
	Assigned: User | null;
	Customer: Contact | null;
};

export type LaneDetail = Lane & {
	Tickets: TicketAndTags[];
};

export type PipelineDetailsWithLanesCardsTagsTickets = Prisma.PromiseReturnType<
	typeof getPipelineDetails
>;

export type TicketWithTags = Prisma.PromiseReturnType<
	typeof getTicketsWithTags
>;

export type TicketDetails = Prisma.PromiseReturnType<
	typeof _getTicketsWithAllRelations
>;

export type Address = {
	city: string;
	country: string;
	line1: string;
	postal_code: string;
	state: string;
};

export type ShippingInfo = {
	address: Address;
	name: string;
};

export type StripeCustomerType = {
	email: string;
	name: string;
	shipping: ShippingInfo;
	address: Address;
};

export type PricesList = Stripe.ApiList<Stripe.Price>;
