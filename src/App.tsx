import { Icon } from "@iconify/react"
import { toPng } from "html-to-image"
import { useRef } from "react"
import { twMerge } from "tailwind-merge"

type Card = {
	name: string
	icon: string
	aura: string
	material: string
	sense: string
	effect: string
	className: string
	iconClassName?: string
}

const tw = String.raw

const cards: Card[] = [
	{
		name: "Animosity",
		icon: "lucide:flame",
		aura: "rage, envy, destruction",
		material: "flame, heat, magma",
		sense: "with instinct",
		effect: "Damage 1d6",
		className: tw`bg-aspects-red text-aspects-red-dark`,
		iconClassName: tw`-translate-y-px`,
	},
	{
		name: "Connection",
		icon: "lucide:shield",
		aura: "peace, comfort, protection",
		material: "water, ice, vapor",
		sense: "through touch or atmosphere",
		effect: "Block 1d6",
		className: tw`bg-aspects-blue text-aspects-blue-dark`,
	},
	{
		name: "Freedom",
		icon: "lucide:star",
		aura: "turbulence, swiftness",
		material: "air, sound, acrobatics",
		sense: "through sound or smell",
		effect: "Reroll 1 die",
		className: tw`bg-aspects-green text-aspects-green-dark`,
	},
	{
		name: "Instinct",
		icon: "lucide:compass",
		aura: "knowledge, perception",
		material: "lumen, healing, enhancement",
		sense: "through sight",
		effect: "Heal 1d6",
		className: tw`bg-aspects-yellow text-aspects-yellow-dark`,
	},
	{
		name: "Control",
		icon: "lucide:heart-crack",
		aura: "tension, mistrust, manipulation",
		material: "umbra, illusions, psychology",
		sense: "through emotions",
		effect: "Evade 2d6",
		className: tw`bg-aspects-purple text-aspects-purple-dark`,
	},
]

export function App() {
	const cardGridRef = useRef<HTMLDivElement>(null)

	return (
		<main className="flex flex-col h-dvh gap-4 items-center justify-center">
			<div
				ref={cardGridRef}
				className="
					grid grid-cols-[repeat(3,auto)] gap-2 p-1 place-content-center inset-0 flex-wrap
					[--card-bg-base-color:0.85_0.23]
					[--card-fg-base-color:0.4_0.1]
					[--icon-col-width:--spacing(10)]
				"
			>
				{cards.map((card) => (
					<div
						key={card.name}
						className={twMerge(
							"aspect-[2.5/3.5] h-68 rounded-xl border-4 justify-between pb-8 pt-6 pr-2 flex flex-col gap-4",
							card.className,
						)}
					>
						<div className="flex items-center">
							<div className="w-(--icon-col-width) flex justify-center">
								<Icon
									icon={card.icon}
									className={twMerge("size-6", card.iconClassName)}
								/>
							</div>
							<p className="text-2xl flex-1 font-light">{card.name}</p>
						</div>

						{[
							{ icon: "lucide:sparkles", text: card.aura },
							{ icon: "lucide:atom", text: card.material },
							{ icon: "lucide:eye", text: `Sense ${card.sense}` },
							{ icon: "lucide:box", text: card.effect },
						].map((row, index) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: shut the fuck up
							<div className="flex items-center h-7" key={index}>
								<div className="w-(--icon-col-width) flex justify-center">
									<Icon icon={row.icon} className="size-5" />
								</div>
								<p className="text-sm leading-[1.1] flex-1 font-medium">
									{row.text.slice(0, 1).toLocaleUpperCase() + row.text.slice(1)}
								</p>
							</div>
						))}
					</div>
				))}
				<div
					className={twMerge(
						"aspect-[2.5/3.5] h-68 rounded-xl justify-between pb-8 pt-6 pr-2 flex flex-col gap-4",
						"flex items-center justify-center bg-linear-to-br from-aspects-purple via-aspects-blue to-aspects-green text-black/50 outline-4 outline-current -outline-offset-4",
					)}
				>
					<Icon icon="lucide:pentagon" className="size-32" />
				</div>
			</div>
			<button
				type="button"
				className="bg-aspects-blue text-aspects-blue-dark rounded-md px-3 py-2 hover:brightness-80 transition leading-tight"
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
