import { ThemeProvider } from "@/providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "./_components/Navbar";

function layout({ children }: Children) {
	return (
		<ClerkProvider>
			<ThemeProvider>
				<Navbar />
				{children}
			</ThemeProvider>
		</ClerkProvider>
	);
}
export default layout;
