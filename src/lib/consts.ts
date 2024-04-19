import {
	BarChart,
	Cable,
	Calendar,
	CheckCircle,
	Clipboard,
	Compass,
	Database,
	Flag,
	Home,
	Info,
	LayoutDashboard,
	Link as LinkIcon,
	Lock,
	MessageCircle as Message,
	Bell as Notification,
	CreditCard as Payment,
	UserRound as Person,
	Power,
	Receipt,
	Send,
	Settings,
	Shield,
	Star,
	SlidersHorizontal as Tune,
	Wallet,
	AlertCircle as Warning,
} from "lucide-react";

export const icons = [
	{
		value: "chart",
		label: "Bar Chart",
		path: BarChart,
	},

	{
		value: "send",
		label: "Send",
		path: Send,
	},
	{
		value: "pipelines",
		label: "Pipelines",
		path: Cable,
	},
	{
		value: "calendar",
		label: "Calendar",
		path: Calendar,
	},
	{
		value: "settings",
		label: "Settings",
		path: Settings,
	},
	{
		value: "check",
		label: "Check Circled",
		path: CheckCircle,
	},

	{
		value: "compass",
		label: "Compass",
		path: Compass,
	},
	{
		value: "database",
		label: "Database",
		path: Database,
	},
	{
		value: "flag",
		label: "Flag",
		path: Flag,
	},
	{
		value: "home",
		label: "Home",
		path: Home,
	},
	{
		value: "info",
		label: "Info",
		path: Info,
	},
	{
		value: "link",
		label: "Link",
		path: LinkIcon,
	},
	{
		value: "lock",
		label: "Lock",
		path: Lock,
	},
	{
		value: "messages",
		label: "Messages",
		path: Message,
	},
	{
		value: "notification",
		label: "Notification",
		path: Notification,
	},
	{
		value: "payment",
		label: "Payment",
		path: Payment,
	},
	{
		value: "power",
		label: "Power",
		path: Power,
	},
	{
		value: "receipt",
		label: "Receipt",
		path: Receipt,
	},
	{
		value: "shield",
		label: "Shield",
		path: Shield,
	},
	{
		value: "star",
		label: "Star",
		path: Star,
	},
	{
		value: "tune",
		label: "Tune",
		path: Tune,
	},

	{
		value: "wallet",
		label: "Wallet",
		path: Wallet,
	},
	{
		value: "warning",
		label: "Warning",
		path: Warning,
	},
	{
		value: "person",
		label: "Person",
		path: Person,
	},
	{
		value: "category",
		label: "Category",
		path: LayoutDashboard,
	},
	{
		value: "clipboardIcon",
		label: "Clipboard Icon",
		path: Clipboard,
	},
];

export const pricingCards = [
	{
		title: "Starter",
		description: "Perfect for trying out our services",
		price: "Free",
		duration: "",
		highlight: "Key features",
		features: ["3 Sub accounts", "2 Team members", "Unlimited pipelines"],
		priceId: "",
	},
	{
		title: "Unlimited Saas",
		description: "The ultimate agency kit",
		price: "$199",
		duration: "month",
		highlight: "Key features",
		features: ["Rebilling", "24/7 Support team"],
		priceId: "price_1OoODQEcG9X6kavYiNocC1Rs",
	},
	{
		title: "Basic",
		description: "For serious agency owners",
		price: "$49",
		duration: "month",
		highlight: "Everything in Starter, plus",
		features: ["Unlimited Sub accounts", "Unlimited Team members"],
		priceId: "price_1OoODQEcG9X6kavYw7sLsY6d",
	},
];

export const addOnProducts = [
	{ title: "Priority Support", id: "prod_PdfhEW2gsdTpqN" },
];

export const SITE_NAME = "Acme";
