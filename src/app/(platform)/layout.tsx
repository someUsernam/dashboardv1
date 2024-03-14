import ModalProvider from "@/providers/modal-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";

function Layout({ children }: Children) {
	return (
		<ClerkProvider>
			<ThemeProvider>
				<ModalProvider>
					{/* <div className="overflow-hidden grid grid-cols-[auto_1fr]"> */}
					{children}
					{/* </div> */}
				</ModalProvider>
			</ThemeProvider>
		</ClerkProvider>
	);
}
export default Layout;
