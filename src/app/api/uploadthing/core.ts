import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

async function authenticateUser() {
	const user = auth();
	// If you throw, the user will not be able to upload
	if (!user) throw new UploadThingError("Unauthorized");
	// Whatever is returned here is accessible in onUploadComplete as `metadata`
	return user;
}

// async function uploadComleteMessage({ metadata, file }) {
// 	console.log("Upload complete for userId:", metadata.userId);

// 	console.log("file url", file.url);
// }

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	subaccountLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(authenticateUser)
		.onUploadComplete(() => {}),
	avatar: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(authenticateUser)
		.onUploadComplete(() => {}),
	agencyLogo: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(authenticateUser)
		.onUploadComplete(() => {}),
	media: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
		.middleware(authenticateUser)
		.onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
