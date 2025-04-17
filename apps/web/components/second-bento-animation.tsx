import { Icons } from "@/components/icons";
import { OrbitingCircles } from "@/components/ui/orbiting-circle";
import Image from "next/image";

export function SecondBentoAnimation() {
	return (
		<div className="relative flex h-full w-full items-center justify-center overflow-hidden">
			<div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-gradient-to-t from-background to-transparent z-20"></div>
			<div className="pointer-events-none absolute top-0 left-0 h-20 w-full bg-gradient-to-b from-background to-transparent z-20"></div>

			<div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 size-16 bg-secondary p-2 rounded-full z-30 md:bottom-0 md:top-auto">
				<Icons.logo className="text-white size-10" />
			</div>
			<div className="relative flex h-full w-full items-center justify-center overflow-hidden">
				<div className="relative flex h-full w-full items-center justify-center translate-y-0 md:translate-y-32">
					<OrbitingCircles
						index={0}
						iconSize={60}
						radius={100}
						reverse
						speed={1}
					>
						<Image
							src="https://randomuser.me/api/portraits/women/8.jpg"
							alt="User avatar"
							width={60}
							height={60}
							className="rounded-full"
						/>
						<Image
							src="https://randomuser.me/api/portraits/men/12.jpg"
							alt="User avatar"
							width={60}
							height={60}
							className="rounded-full"
						/>
						<Image
							src="https://randomuser.me/api/portraits/women/23.jpg"
							alt="User avatar"
							width={60}
							height={60}
							className="rounded-full"
						/>
					</OrbitingCircles>

					<OrbitingCircles index={1} iconSize={60} speed={0.5}>
						<Image
							src="https://randomuser.me/api/portraits/men/45.jpg"
							alt="User avatar"
							width={60}
							height={60}
							className="rounded-full"
						/>
						<Image
							src="https://randomuser.me/api/portraits/women/32.jpg"
							alt="User avatar"
							width={60}
							height={60}
							className="rounded-full"
						/>
						<Image
							src="https://randomuser.me/api/portraits/men/67.jpg"
							alt="User avatar"
							width={60}
							height={60}
							className="rounded-full"
						/>
					</OrbitingCircles>

					<OrbitingCircles
						index={2}
						iconSize={60}
						radius={230}
						reverse
						speed={0.5}
					>
						<Image
							src="https://randomuser.me/api/portraits/women/54.jpg"
							alt="User avatar"
							width={60}
							height={60}
							className="rounded-full"
						/>
						<Image
							src="https://randomuser.me/api/portraits/men/33.jpg"
							alt="User avatar"
							width={60}
							height={60}
							className="rounded-full"
						/>
						<Image
							src="https://randomuser.me/api/portraits/women/76.jpg"
							alt="User avatar"
							width={60}
							height={60}
							className="rounded-full"
						/>
					</OrbitingCircles>
				</div>
			</div>
		</div>
	);
}
