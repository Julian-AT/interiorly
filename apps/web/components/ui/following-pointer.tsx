import { useEffect, type ReactNode, useRef } from "react";

import { motion, useMotionValue, useSpring } from "motion/react";

export const FollowPointer = ({
	x,
	y,
	title,
	direction = "left",
	animate = true,
	colorIndex = 0,
	color: customColor,
	animationOffset = 0,
}: {
	x: number;
	y: number;
	title?: string | ReactNode;
	direction?: "left" | "right";
	animate?: boolean;
	colorIndex?: number;
	color?: string;
	animationOffset?: number;
}) => {
	const colors = [
		"#0ea5e9",
		"#737373",
		"#14b8a6",
		"#22c55e",
		"#3b82f6",
		"#ef4444",
		"#eab308",
	];

	// Use custom color if provided, otherwise use from colors array
	const color = customColor || colors[colorIndex % colors.length];

	// Determine cursor rotation and position based on direction
	const cursorRotation =
		direction === "left" ? "-rotate-[80deg]" : "-rotate-[0deg]";
	const cursorTranslateX =
		direction === "left" ? "-translate-x-[12px]" : "translate-x-[35px]";

	// Motion values for animated movement
	const mouseX = useMotionValue(x);
	const mouseY = useMotionValue(y);

	// Add springs with optimized settings for ultra-smooth animation
	const springX = useSpring(mouseX, {
		damping: 100,
		stiffness: 150,
		mass: 0.5,
		restDelta: 0.0001,
	});
	const springY = useSpring(mouseY, {
		damping: 25,
		stiffness: 150,
		mass: 0.5,
		restDelta: 0.0001,
	});

	// Use refs to avoid recreating animation functions on each render
	const animationRef = useRef<number | null>(null);
	const isMountedRef = useRef<boolean>(false);

	// Animation with offset and diagonal movement
	useEffect(() => {
		// Set mounted flag to true
		isMountedRef.current = true;

		if (!animate) {
			mouseX.set(x);
			mouseY.set(y);
			return;
		}

		const amplitude = 10;
		let startY = y;
		let startX = x;
		const horizontalAmplitude = 5;
		const phaseOffset = (animationOffset * Math.PI) / 2;
		let progress = phaseOffset;

		const animateCursor = () => {
			if (!isMountedRef.current) return;

			progress += 0.02;

			const verticalOffset = Math.sin(progress) * amplitude;
			const horizontalOffset = Math.cos(progress) * horizontalAmplitude;

			mouseY.set(startY + verticalOffset);
			mouseX.set(startX + horizontalOffset);

			animationRef.current = requestAnimationFrame(animateCursor);
		};

		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
		}

		mouseX.set(x);
		mouseY.set(y);
		startY = y;
		startX = x;
		animationRef.current = requestAnimationFrame(animateCursor);

		return () => {
			isMountedRef.current = false;
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
				animationRef.current = null;
			}
		};
	}, [x, y, animate, mouseX, mouseY, direction, animationOffset]);

	return (
		<motion.div
			className="absolute z-50 h-4 w-4 rounded-full"
			style={{
				top: springY,
				left: springX,
				pointerEvents: "none",
			}}
			initial={{
				scale: 0,
				opacity: 0,
			}}
			animate={{
				scale: 1,
				opacity: 1,
			}}
			exit={{
				scale: 0,
				opacity: 0,
			}}
			transition={{
				type: "spring",
				damping: 20,
				stiffness: 150,
				mass: 0.5,
			}}
		>
			<svg
				stroke="currentColor"
				fill="currentColor"
				strokeWidth="1"
				viewBox="0 0 16 16"
				className={`h-6 w-6 ${cursorTranslateX} -translate-y-[10px] ${cursorRotation} transform`}
				style={{
					color: color,
				}}
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
			</svg>
			{title && (
				<motion.div
					style={{
						backgroundColor: color,
					}}
					initial={{
						scale: 0,
						opacity: 0,
						y: 10,
					}}
					animate={{
						scale: 1,
						opacity: 1,
						y: 0,
					}}
					exit={{
						scale: 0,
						opacity: 0,
						y: 10,
					}}
					transition={{
						type: "spring",
						damping: 20,
						stiffness: 150,
						mass: 0.5,
						delay: 0.05,
					}}
					className="min-w-max rounded-full px-2 py-1 text-xs whitespace-nowrap text-white shadow-md"
				>
					{title}
				</motion.div>
			)}
		</motion.div>
	);
};
