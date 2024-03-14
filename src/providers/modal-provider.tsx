"use client";
import { PricesList, TicketDetails } from "@/lib/types";
import { Agency, Contact, Plan, User } from "@prisma/client";
import { createContext, useContext, useMemo, useState } from "react";

export type ModalData = {
	user?: User;
	agency?: Agency;
	ticket?: TicketDetails[0];
	contact?: Contact;
	plans?: {
		defaultPriceId: Plan;
		plans: PricesList["data"];
	};
};

type ModalContextType = {
	data: ModalData;
	isOpen: boolean;
	setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => void;
	setClose: () => void;
};

export const ModalContext = createContext<ModalContextType>({
	data: {},
	isOpen: false,
	setOpen: (modal: React.ReactNode, fetchData?: () => Promise<any>) => {},
	setClose: () => {},
});

function ModalProvider({ children }: Children) {
	const [isOpen, setIsOpen] = useState(false);
	const [data, setData] = useState<ModalData>({});
	const [showingModal, setShowingModal] = useState<React.ReactNode>(null);

	async function setOpen(
		modal: React.ReactNode,
		fetchData?: () => Promise<any>,
	) {
		if (modal) {
			if (fetchData) {
				setData({ ...data, ...(await fetchData()) } || {});
			}
			setShowingModal(modal);
			setIsOpen(true);
		}
	}

	function setClose() {
		setIsOpen(false);
		setData({});
	}

	const values = useMemo(() => {
		return {
			data,
			isOpen,
			setOpen,
			setClose,
		};
	}, [data, isOpen]);

	return (
		<ModalContext.Provider value={values}>
			{children}
			{showingModal}
		</ModalContext.Provider>
	);
}

export const useModal = () => {
	const context = useContext(ModalContext);

	if (!context) {
		throw new Error("useModal must be used within the modal provider");
	}
	return context;
};

export default ModalProvider;
