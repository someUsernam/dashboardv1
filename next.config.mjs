/** @type {import('next').NextConfig} */
const nextConfig = {
	// logging: {
	// 	fetches: {
	// 		fullUrl: true,
	// 	},
	// },
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "utfs.io",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "img.clerk.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "uploadthing.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "subdomain",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "files.stripe.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
