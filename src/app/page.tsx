import { Button } from "@/components/ui/button"
import * as React from "react"


import AppLayout from "@/layouts/AppLayout";
import LandingLayout from "@/components/landing/LandingLayout";
import Image from "next/image";
import LandingFeatureCard from "@/components/landing/LandingFeatureCard";

export default function Home() {
	return <>
		<LandingLayout>
			<div className="w-full h-full flex flex-col items-center justify-center">
				{/* Headline and image */}
				<section className="flex items-center gap-10 w-full mb-20">
					<div className="flex flex-col items-center justify-center gap-4 w-1/2 text-wrap text-white/80">
						<h1 className="text-center text-5xl font-bold">Hire Faster. Hire Smarter with Al-Powered Resume Analysis.</h1>
						<p className="text-center text-lg">Instantly screen, score, and shortlist candidates with unparalleled accuracy. <br/> Stop manual screening; start hiring talent.</p>
					</div>
					<div className="w-1/2 relative h-96 flex flex-col items-center justify-center">
						<Image
							src="/images/landing-image-1.jpg"
							alt="Landing Image 1"
							fill
							priority
							className="object-contain"
						/>
					</div>
				</section>
				<section className="grid grid-cols-3 gap-10 w-full px-4">
					<LandingFeatureCard></LandingFeatureCard>
					<LandingFeatureCard></LandingFeatureCard>
					<LandingFeatureCard></LandingFeatureCard>
				</section>
			</div>
		</LandingLayout>		
		{/* <AppLayout>
			<div>
				<h1>Hello, World</h1>
			</div>
		</AppLayout> */}
	</>;
}
