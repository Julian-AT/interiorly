"use client";

import { HeroVideoSection } from "@/components/sections/hero-video-section";
import { siteConfig } from "@/lib/config";
import Link from "next/link";
import { FollowPointer } from "@/components/ui/following-pointer";

export function HeroSection() {
	const { hero } = siteConfig;

	return (
		<section id="hero" className="w-full relative my-3">
			<div className="relative flex flex-col items-center w-full px-6">
				<div className="absolute inset-0">
					<div className="absolute inset-0 -z-10 h-[600px] md:h-[800px] w-full [background:radial-gradient(125%_125%_at_50%_10%,var(--background)_40%,var(--secondary)_100%)] rounded-b-xl" />
				</div>
				<div className="relative z-10 pt-32 max-w-4xl mx-auto h-full w-full flex flex-col gap-10 items-center justify-center">
					{/* <LampContainer> */}
					<FollowPointer
						x={-105}
						y={210}
						title="Emma"
						direction="right"
						colorIndex={0} // #0ea5e9 - sky blue
						animationOffset={153}
					/>
					<FollowPointer
						x={42}
						y={400}
						title="Anthony"
						direction="right"
						colorIndex={2} // #14b8a6 - teal
						animationOffset={250}
					/>
					<FollowPointer
						x={932}
						y={180}
						title="Sophia"
						colorIndex={4} // #3b82f6 - blue
						animationOffset={176}
					/>
					<FollowPointer
						x={791}
						y={372}
						title="Oliver"
						colorIndex={6} // #eab308 - yellow
						animationOffset={30}
					/>
					<div className="flex flex-col items-center justify-center gap-5 relative border border-dotted dark:border-blue-700 border-blue-500 p-5">
						{/* Badge above the box */}
						<div className="absolute -top-8 left-0 px-2 py-0.5 bg-secondary text-xs font-medium rounded-md text-white">
							&lt;h1&gt;
						</div>

						{/* Corner dots */}
						<div className="absolute top-0 left-0 w-1.5 h-1.5 bg-white rounded-xs ring-1 ring-blue-700 -translate-x-1/2 -translate-y-1/2" />
						<div className="absolute top-0 right-0 w-1.5 h-1.5 bg-white rounded-xs ring-1 ring-blue-700 translate-x-1/2 -translate-y-1/2" />
						<div className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-white rounded-xs ring-1 ring-blue-700 -translate-x-1/2 translate-y-1/2" />
						<div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-white rounded-xs ring-1 ring-blue-700 translate-x-1/2 translate-y-1/2" />

						{/* Horizontal bars */}
						<div className="absolute top-0 left-1/2 w-5 h-[1px] bg-muted-foreground -translate-x-1/2 translate-y-[4px]" />
						<div className="absolute bottom-0 left-1/2 w-5 h-[1px] bg-muted-foreground -translate-x-1/2 -translate-y-[4px]" />

						{/* Vertical bars */}
						<div className="absolute top-1/2 left-0 w-[1px] h-5 bg-muted-foreground translate-x-[4px] -translate-y-1/2" />
						<div className="absolute top-1/2 right-0 w-[1px] h-5 bg-muted-foreground -translate-x-[4px] -translate-y-1/2" />

						<h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-medium tracking-tighter text-balance text-center text-primary">
							{hero.title}
						</h1>
					</div>
					<p className="text-base md:text-lg text-center text-muted-foreground font-medium text-balance leading-relaxed tracking-tight -mt-6">
						{hero.description}
					</p>
					{/* </LampContainer> */}
					<div className="flex items-center gap-2.5 flex-wrap justify-center">
						<Link
							href={hero.cta.primary.href}
							className="bg-secondary h-9 flex items-center justify-center text-sm font-normal tracking-wide rounded-full text-primary-foreground dark:text-secondary-foreground w-32 px-4 shadow-[inset_0_1px_2px_rgba(255,255,255,0.25),0_3px_3px_-1.5px_rgba(16,24,40,0.06),0_1px_1px_rgba(16,24,40,0.08)] border border-white/[0.12] hover:bg-secondary/80 transition-all ease-out active:scale-95"
						>
							{hero.cta.primary.text}
						</Link>
						<Link
							href={hero.cta.secondary.href}
							className="h-10 flex items-center justify-center w-32 px-5 text-sm font-normal tracking-wide text-primary rounded-full transition-all ease-out active:scale-95 bg-white dark:bg-background border border-[#E5E7EB] dark:border-[#27272A] hover:bg-white/80 dark:hover:bg-background/80"
						>
							{hero.cta.secondary.text}
						</Link>
					</div>
				</div>
			</div>
			<HeroVideoSection />
		</section>
	);
}
