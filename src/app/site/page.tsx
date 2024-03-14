import { SITE_NAME, pricingCards } from "@/lib/consts";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@ui/card";
import clsx from "clsx";
import { Check } from "lucide-react";
// import { stripe } from "@/lib/stripe";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	return (
		<>
			<section className="h-full w-full md:pt-44 mt-[-70px] relative flex items-center justify-center flex-col ">
				{/* grid */}

				<div className="absolute inset-0 -z-10 h-full w-full  bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_110%)]  [background-size:16px_16px] " />
				<div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
					<h1 className="text-9xl font-bold text-center md:text-[300px]">
						{SITE_NAME}
					</h1>
				</div>
				<div className="flex justify-center items-center relative md:mt-[-70px]">
					<Image
						src={"/assets/preview.png"}
						alt="banner image"
						height={400}
						width={1200}
						className="rounded-tl-2xl rounded-tr-2xl border-2 border-muted"
					/>
					<div className="bottom-0 top-[50%] bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10" />
				</div>
			</section>
			<section className="flex justify-center items-center flex-col gap-4 md:!mt-20 mt-[-60px]">
				<h2 className="text-4xl text-center"> Choose what fits you right</h2>
				<p className="text-muted-foreground text-center">
					Our straightforward pricing plans are tailored to meet your needs. If
					{" you're"} not <br />
					ready to commit you can get started for free.
				</p>
				<div className="flex  justify-center gap-4 flex-wrap mt-6">
					{/* {prices.data.map((card) => (
						//WIP: Wire up free product from stripe
						<Card
							key={card.nickname}
							className={clsx("w-[300px] flex flex-col justify-between", {
								"border-2 border-primary": card.nickname === "Unlimited Saas",
							})}
						>
							<CardHeader>
								<CardTitle
									className={clsx("", {
										"text-muted-foreground": card.nickname !== "Unlimited Saas",
									})}
								>
									{card.nickname}
								</CardTitle>
								<CardDescription>
									{
										pricingCards.find((c) => c.title === card.nickname)
											?.description
									}
								</CardDescription>
							</CardHeader>
							<CardContent>
								<span className="text-4xl font-bold">
									{card.unit_amount && card.unit_amount / 100}
								</span>
								<span className="text-muted-foreground">
									<span>/ {card.recurring?.interval}</span>
								</span>
							</CardContent>
							<CardFooter className="flex flex-col items-start gap-4">
								<div>
									{pricingCards
										.find((c) => c.title === card.nickname)
										?.features.map((feature) => (
											<div key={feature} className="flex gap-2">
												<Check />
												<p>{feature}</p>
											</div>
										))}
								</div>
								<Link
									href={`/agency?plan=${card.id}`}
									className={clsx(
										"w-full text-center bg-primary p-2 rounded-md",
										{
											"!bg-muted-foreground":
												card.nickname !== "Unlimited Saas",
										},
									)}
								>
									Get Started
								</Link>
							</CardFooter>
						</Card>
					))} */}
					<Card className={clsx("w-[300px] flex flex-col justify-between")}>
						<CardHeader>
							<CardTitle
								className={clsx({
									"text-muted-foreground": true,
								})}
							>
								{pricingCards[0].title}
							</CardTitle>
							<CardDescription>{pricingCards[0].description}</CardDescription>
						</CardHeader>
						<CardContent>
							<span className="text-4xl font-bold">$0</span>
							<span>/ month</span>
						</CardContent>
						<CardFooter className="flex flex-col  items-start gap-4 ">
							<div>
								{pricingCards
									.find((c) => c.title === "Starter")
									?.features.map((feature) => (
										<div key={feature} className="flex gap-2">
											<Check />
											<p>{feature}</p>
										</div>
									))}
							</div>
							<Link
								href="/agency"
								className={clsx(
									"w-full text-center bg-primary p-2 rounded-md",
									{
										"!bg-muted-foreground": true,
									},
								)}
							>
								Get Started
							</Link>
						</CardFooter>
					</Card>
				</div>
			</section>
		</>
	);
}
