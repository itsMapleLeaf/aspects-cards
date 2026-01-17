import { Icon } from "@iconify/react"
import { toPng } from "html-to-image"
import { type CSSProperties, useRef } from "react"
import { twMerge } from "tailwind-merge"

type Aspect = {
	name: string
	icon: string
	aura: string
	element: string[]
	found: string
	effect: string
	className: string
	iconClassName?: string
	actions: (string | { name: string; label: string; icon: string })[]
}

const tw = String.raw

const aspect: Aspect[] = [
	{
		name: "Animosity",
		icon: "mingcute:sword-line",
		aura: "rage, envy, drive",
		element: ["Fire", "Lightning"],
		found: "dangerous",
		effect: "Damage (+1 die)",
		className: tw`bg-aspects-red text-aspects-red-dark`,
		actions: ["Strike", "Block", "Push", "Throw", "Endure", "Empower"],
	},
	{
		name: "Connection",
		icon: "mingcute:shield-shape-line",
		aura: "peace, comfort, protection",
		element: ["Ice", "Healing"],
		found: "inviting",
		effect: "Block (1d6)",
		className: tw`bg-aspects-blue text-aspects-blue-dark`,
		actions: ["Protect", "Comfort", "Charm", "Read", "Empower", "Restore"],
	},
	{
		name: "Freedom",
		icon: "mingcute:bling-line",
		aura: "liberation, swiftness, flexibility",
		element: ["Wind", "Sound"],
		found: "curious",
		effect: "Reroll 1 die",
		className: tw`bg-aspects-green text-aspects-green-dark`,
		actions: ["Dash", "Aim", "Sneak", "Deflect", "Finesse", "Evade"],
	},
	{
		name: "Wonder",
		icon: "mingcute:compass-line",
		aura: "knowledge, perception",
		element: ["Light", "Guidance"],
		found: "valuable",
		effect: "Heal (1d6)",
		className: tw`bg-aspects-yellow text-aspects-yellow-dark`,
		actions: ["Evaluate", "Operate", "Create", "Locate", "Read", "Restore"],
	},
	{
		name: "Tension",
		icon: "mingcute:heart-crack-line",
		aura: "suspicion, mistrust, manipulation",
		element: ["Darkness", "Mind"],
		found: "unsettling",
		effect: "Evade (2d6)",
		className: tw`bg-aspects-purple text-aspects-purple-dark`,
		actions: ["Deceive", "Dominate", "Endure", "Deflect", "Evade", "Finesse"],
	},
]

export function App() {
	const cardGridRef = useRef<HTMLDivElement>(null)

	const cardClass = tw`aspect-[2.5/3.5] h-70 overflow-clip rounded-xl border-4`

	return (
		<div className="py-8">
			<main className="flex h-dvh flex-col items-center gap-4">
				<div
					ref={cardGridRef}
					className={twMerge(
						"grid place-content-center gap-2 p-1",
						"[--card-bg-base-color:0.85_0.23]",
						"[--card-fg-base-color:0.4_0.1]",
						"[--icon-col-width:--spacing(10)]",
					)}
				>
					{aspect.map((aspect, aspectIndex) =>
						[...aspect.actions, "Any"]
							.map((action) =>
								typeof action === "string"
									? {
											name: action,
											label: "Action",
											icon: aspect.icon,
											isArt: false,
										}
									: { ...action, isArt: true },
							)
							.map((action, actionIndex) => (
								<div
									key={`${aspect.name}-${action.name}`}
									style={
										{
											"--row": aspectIndex + 1,
											"--col": actionIndex + 1,
										} as CSSProperties
									}
									className={twMerge(
										cardClass,
										"relative col-(--col) row-(--row) flex flex-col justify-center gap-3 text-shadow-black/10 text-shadow-sm uppercase",
										aspect.className,
									)}
								>
									<div className="absolute inset-0 bg-stripes opacity-4"></div>
									<div
										className="absolute inset-0 bg-linear-to-t from-black/20 via-black/5 data-art:from-white/20 data-art:via-40% data-art:via-white/10"
										// data-art={action.isArt || undefined}
									></div>

									<div className="absolute top-0 left-0 p-1.5 opacity-70">
										<Icon icon={action.icon} className="size-6" />
									</div>
									<div className="absolute bottom-0 left-0 p-1.5 opacity-70">
										<Icon icon={action.icon} className="size-6" />
									</div>
									<div className="absolute top-0 right-0 p-1.5 opacity-70">
										<Icon icon={action.icon} className="size-6" />
									</div>
									<div className="absolute right-0 bottom-0 p-1.5 opacity-70">
										<Icon icon={action.icon} className="size-6" />
									</div>

									{/* <div className="absolute top-2.5 left-1/2 -translate-x-1/2 font-medium text-[11px] opacity-80">
										{aspect.name}
									</div> */}
									<div className="-translate-x-1/2 -rotate-90 absolute left-3.5 font-medium text-[11px] opacity-80">
										{action.name}
									</div>
									<div className="absolute right-3.5 translate-x-1/2 rotate-90 font-medium text-[11px] opacity-80">
										{aspect.name}
									</div>

									{/* <div className="absolute top-2.5 self-center font-medium text-[11px] opacity-80">
										{aspect.name}
									</div> */}

									{[
										// { label: "Aspect", text: aspect.name },
										{ label: action.label, text: action.name },
										{ label: "Art", text: aspect.element.join("\n") },
										{ label: "Find Something", text: aspect.found },
									].map((row, index) => (
										<div
											className="relative flex scale-95 flex-col items-center text-center"
											key={index}
										>
											<h2 className="font-medium text-sm opacity-80">
												{row.label}
											</h2>
											<p className="flex-1 whitespace-pre-line text-balance font-medium text-xl">
												{row.text}
											</p>
										</div>
									))}
								</div>
							)),
					)}

					<div
						className={twMerge(
							cardClass,
							"-outline-offset-4 relative flex items-center justify-center border-none text-black/45 outline-4 outline-black/60",
							"bg-linear-to-br from-aspects-purple via-aspects-blue to-aspects-green",
							// "bg-fuchsia-300",
						)}
					>
						<div className="absolute inset-0 bg-stripes opacity-4"></div>
						<div className="absolute inset-0 bg-linear-to-t from-black/15"></div>
						<Icon
							icon="lucide:pentagon"
							className="size-32 drop-shadow-black/20 drop-shadow-md"
						/>
					</div>
				</div>

				<button
					type="button"
					className="rounded-md bg-aspects-blue px-3 py-2 text-aspects-blue-dark leading-tight transition hover:brightness-80"
					onClick={() => {
						const subject = cardGridRef.current as HTMLElement
						const targetSize = 3000

						const scale = Math.min(
							targetSize / subject.clientWidth,
							targetSize / subject.clientHeight,
						)

						toPng(subject, {
							canvasWidth: subject.clientWidth * scale,
							canvasHeight: subject.clientHeight * scale,
						}).then((dataUrl) => {
							const link = document.createElement("a")
							link.download = "aspect-cards.png"
							link.href = dataUrl
							link.click()
						})
					}}
				>
					export
				</button>
			</main>
		</div>
	)
}
