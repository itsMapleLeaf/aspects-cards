import { Icon } from "@iconify/react"
import { toPng } from "html-to-image"
import { useRef } from "react"
import { twMerge } from "tailwind-merge"

type Card = {
	name: string
	icon: string
	aura: string
	material: string
	found: string
	effect: string
	className: string
	iconClassName?: string
}

const tw = String.raw

const cards: Card[] = [
	{
		name: "Animosity",
		icon: "lucide:flame",
		aura: "rage, envy, drive",
		material: "flame, heat, magma",
		found: "dangerous",
		effect: "Damage (+1 die)",
		className: tw`bg-aspects-red text-aspects-red-dark`,
		iconClassName: tw`-translate-y-px`,
	},
	{
		name: "Connection",
		icon: "lucide:shield",
		aura: "peace, comfort, protection",
		material: "water, ice, vapor",
		found: "\ninviting",
		effect: "Block (1d6)",
		className: tw`bg-aspects-blue text-aspects-blue-dark`,
	},
	{
		name: "Fluidity",
		icon: "lucide:star",
		aura: "liberation, swiftness, flexibility",
		material: "air, sound, acrobatics",
		found: "unorthodox",
		effect: "Reroll 1 die",
		className: tw`bg-aspects-green text-aspects-green-dark`,
	},
	{
		name: "Wonder",
		icon: "lucide:compass",
		aura: "knowledge, perception",
		material: "lumen, healing, enhancement",
		found: "valuable",
		effect: "Heal (1d6)",
		className: tw`bg-aspects-yellow text-aspects-yellow-dark`,
	},
	{
		name: "Tension",
		icon: "lucide:heart-crack",
		aura: "suspicion, mistrust, manipulation",
		material: "umbra, illusions, psychology",
		found: "unsettling",
		effect: "Evade (2d6)",
		className: tw`bg-aspects-purple text-aspects-purple-dark`,
	},
]

export function App() {
	const cardGridRef = useRef<HTMLDivElement>(null)

	const cardClass = tw`aspect-[2.5/3.5] h-70 rounded-xl border-4`

	return (
		<main className="flex h-dvh flex-col items-center justify-center gap-4">
			<div
				ref={cardGridRef}
				className={twMerge(
					"grid grid-cols-[repeat(3,auto)] flex-wrap place-content-center gap-2 p-1",
					"[--card-bg-base-color:0.85_0.23]",
					"[--card-fg-base-color:0.4_0.1]",
					"[--icon-col-width:--spacing(10)]",
				)}
			>
				{cards.map((card) => (
					<div
						key={card.name}
						className={twMerge(
							cardClass,
							"flex flex-col gap-7 pt-7 pr-4 text-shadow-black/10 text-shadow-sm",
							card.className,
						)}
					>
						<div className="flex items-center">
							<div className="flex w-(--icon-col-width) justify-center">
								<Icon
									icon={card.icon}
									className={twMerge(
										"size-6 drop-shadow-black/20 drop-shadow-xs",
										card.iconClassName,
									)}
								/>
							</div>
							<p className="flex-1 font-light text-2xl">{card.name}</p>
						</div>

						<div className="flex flex-col gap-6">
							{[
								{ icon: "lucide:sparkles", text: card.aura },
								{ icon: "lucide:atom", text: card.material },
								{ icon: "lucide:search", text: `Something ${card.found}` },
								// { icon: "lucide:box", text: card.effect },
							].map((row, index) => (
								<div className="flex h-7 items-center" key={index}>
									<div className="flex w-(--icon-col-width) justify-center">
										<Icon
											icon={row.icon}
											className="size-5 drop-shadow-black/20 drop-shadow-xs"
										/>
									</div>
									<p className="flex-1 whitespace-pre-wrap text-balance font-medium text-sm leading-[1.1]">
										{row.text.slice(0, 1).toLocaleUpperCase() +
											row.text.slice(1)}
									</p>
								</div>
							))}
						</div>
					</div>
				))}

				<div
					className={twMerge(
						cardClass,
						"-outline-offset-4 flex items-center justify-center border-none bg-linear-to-br from-aspects-purple via-aspects-blue to-aspects-green text-black/45 outline-4 outline-black/60",
					)}
				>
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

					toPng(subject, {
						canvasWidth: subject.clientWidth * 2,
						canvasHeight: subject.clientHeight * 2,
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
	)
}
