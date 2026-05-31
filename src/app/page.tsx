import { Button } from "@/components/ui/button"
import * as React from "react"


import AppLayout from "@/layouts/AppLayout";
import LandingLayout from "@/components/landing/LandingLayout";
import Image from "next/image";
import LandingFeatureCard from "@/components/landing/LandingFeatureCard";

export default function Home() {
	const features = [
		{
			title: "AI-Powered Resume Screening",
			description: "Leverage advanced AI algorithms to automatically screen and analyze resumes, saving you hours of manual work and ensuring you never miss out on top talent.",
			icon: "/icons/flash.png"
		},
		{
			title: "Candidate Scoring and Shortlisting",
			description: "Our platform scores candidates based on their qualifications, experience, and fit for the role, providing you with a ranked shortlist of the best candidates for your open positions.",
			icon: "/icons/target.png"
		},
		{
			title: "Seamless Integration with ATS",
			description: "Easily integrate TalentScan with your existing Applicant Tracking System (ATS) to streamline your hiring workflow and ensure a smooth transition to AI-powered recruitment.",
			icon: "/icons/scales-of-justice.png"
		}
	];

	const footerIcons = [
		{ name: "Instagram", icon: "/icons/instagram.png" },
		{ name: "Facebook", icon: "/icons/facebook.png" },
		{ name: "Gmail", icon: "/icons/gmail.png" },
		{ name: "Discord", icon: "/icons/discord.png" },
	];
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
						<Image src="/images/landing-image-1.jpg" alt="Landing Image 1" fill priority className="object-contain" />
					</div>
				</section>
				<section className="grid grid-cols-3 gap-10 w-full px-4">
					{ features.map((feature, index) => <LandingFeatureCard key={index} title={feature.title} description={feature.description} icon={feature.icon} />) }
				</section>
				<section>
					<ul className="text-slate-400 mt-20 flex gap-10">
						{ footerIcons.map((icon, index) => (
							<li key={index} className="cursor-pointer hover:text-slate-200 transition-colors duration-300	">
								<Image src={icon.icon} alt={icon.name} width={24} height={24} />
							</li>
						)) }
					</ul>
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
