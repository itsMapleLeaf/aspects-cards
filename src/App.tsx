import { Icon } from "@iconify/react"
import { toPng } from "html-to-image"
import { type ReactNode, useRef } from "react"
import { twMerge } from "tailwind-merge"

const tw = String.raw

type Aspect = {
	name: string
	icon: string
	aura: string
	element: string[]
	found: string
	effect: string
	className: string
	iconClassName?: string
	actions: string[]
}

const aspects: Aspect[] = [
	{
		name: "Animosity",
		icon: "mingcute:sword-line",
		aura: "rage, envy, drive",
		element: ["Fire", "Lightning"],
		found: "dangerous",
		effect: "Damage (+1 die)",
		className: tw`bg-aspects-red text-aspects-red-dark`,
		actions: ["Strike", "Block", "Push", "Throw", "Endure", "Dominate"],
	},
	{
		name: "Connection",
		icon: "mingcute:shield-shape-line",
		aura: "peace, comfort, protection",
		element: ["Water", "Healing"],
		found: "inviting",
		effect: "Block (1d6)",
		className: tw`bg-aspects-blue text-aspects-blue-dark`,
		actions: ["Protect", "Comfort", "Charm", "Empower", "Read", "Restore"],
	},
	{
		name: "Freedom",
		icon: "mingcute:bling-line",
		aura: "liberation, swiftness, flexibility",
		element: ["Wind", "Sound"],
		found: "curious",
		effect: "Reroll 1 die",
		className: tw`bg-aspects-green text-aspects-green-dark`,
		actions: ["Dash", "Aim", "Finesse", "Sneak", "Deflect", "Evade"],
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
		actions: ["Deceive", "Endure", "Dominate", "Sneak", "Deflect", "Evade"],
	},
]

type Art = {
	name: string
	description: string
	icon: string
	className: string
}

const arts: Art[] = [
	{
		name: "Ember",
		description: "Conjure flame and generate heat",
		icon: "mingcute:flame-line",
		className: tw`bg-red-800 text-red-200 saturate-60`,
	},
	{
		name: "Flow",
		description: "Shape and propel natural liquids",
		icon: "mingcute:drop-line",
		className: tw`bg-blue-800 text-blue-200 saturate-60`,
	},
	{
		name: "Tempest",
		description: "Control wind and weather",
		icon: "mingcute:cloud-windy-line",
		className: tw`bg-teal-800 text-teal-200 saturate-60`,
	},
	{
		name: "Spark",
		description: "Summon and direct electrical energy",
		icon: "mingcute:lightning-line",
		className: tw`bg-yellow-800 text-yellow-200 saturate-60`,
	},
	{
		name: "Stone",
		description: "Shift rocks and bend metals",
		icon: "mingcute:cloud-windy-line",
		className: tw`bg-neutral-700 text-neutral-200 saturate-60`,
	},
	{
		name: "Verdance",
		description: "Manipulate or speak with plantlife",
		icon: "mingcute:leaf-line",
		className: tw`bg-green-800 text-green-200 saturate-60`,
	},
	// {
	// 	name: "Lumen",
	// 	description: "Coalesce solid illumination",
	// 	icon: "mingcute:sun-line",
	// 	className: tw`bg-yellow-800 text-yellow-200 saturate-60`,
	// },
	{
		name: "Void",
		description: "Manifest pure featureless darkness",
		icon: "mingcute:moon-line",
		className: tw`bg-purple-800 text-purple-200 saturate-30`,
	},
	{
		name: "Frost",
		description: "Freeze moisture and sculpt ice",
		icon: "mingcute:snow-line",
		className: tw`bg-slate-700 text-slate-100`,
	},
	{
		name: "Resonance",
		description: "Amplify, dampen, and project noise",
		icon: "mingcute:voice-line",
		className: tw`bg-cyan-800 text-cyan-200 saturate-60`,
	},
	{
		name: "Psyche",
		description: "Manipulate the psyche of others",
		icon: "mingcute:brain-line",
		className: tw`bg-indigo-800 text-indigo-200 saturate-60`,
	},
	{
		name: "Nebula",
		description: "Shape the fabric of reality",
		icon: "mingcute:planet-line",
		className: tw`bg-stone-800 text-stone-200 saturate-60`,
	},
	// {
	// 	name: "Healing",
	// 	description: "Mend wounds and restore vitality",
	// 	icon: "mingcute:heartbeat-2-line",
	// 	className: tw`bg-pink-800 text-pink-200 saturate-60`,
	// },
]

const cardClass = tw`aspect-[2.5/3.5] h-70 overflow-clip rounded-xl border-4`

export function App() {
	const cardGridRef = useRef<HTMLDivElement>(null)
	const previewRef = useRef<HTMLDivElement>(null)

	return (
		<main className="flex h-dvh flex-col items-start gap-4 p-4">
			<button
				type="button"
				className="rounded-md bg-aspects-blue px-3 py-2 text-aspects-blue-dark leading-tight transition hover:brightness-80"
				onClick={async () => {
					{
						const subject = cardGridRef.current as HTMLElement
						const targetSize = 3000

						const scale = Math.min(
							targetSize / subject.clientWidth,
							targetSize / subject.clientHeight,
						)

						const dataUrl = await toPng(subject, {
							canvasWidth: subject.clientWidth * scale,
							canvasHeight: subject.clientHeight * scale,
						})
						const link = document.createElement("a")
						link.download = "aspect-cards.png"
						link.href = dataUrl
						link.click()
					}
					{
						const subject = previewRef.current as HTMLElement
						const targetSize = 3000

						const scale = Math.min(
							targetSize / subject.clientWidth,
							targetSize / subject.clientHeight,
						)

						const dataUrl = await toPng(subject, {
							canvasWidth: subject.clientWidth * scale,
							canvasHeight: subject.clientHeight * scale,
						})

						const link = document.createElement("a")
						link.download = "aspect-cards-preview.png"
						link.href = dataUrl
						link.click()
					}
				}}
			>
				export
			</button>

			<div className="flex gap-2" ref={previewRef}>
				{aspects.map((aspect) => (
					<AspectSkillCard
						key={aspect.name}
						aspect={aspect}
						action={aspect.actions[0]}
					/>
				))}
			</div>

			<div
				ref={cardGridRef}
				className="grid grid-cols-[repeat(7,1fr)] place-content-center gap-2"
			>
				{aspects.map((aspect, aspectIndex) =>
					[
						...aspect.actions.sort((a, b) =>
							a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()),
						),
						"Any",
					].map((action, actionIndex) => (
						<div
							key={`${aspect.name}-${action}`}
							// style={{
							// 	gridRow: aspectIndex + 1,
							// 	gridColumn: actionIndex + 1,
							// }}
						>
							<AspectSkillCard
								key={aspect.name}
								aspect={aspect}
								action={action}
							/>
						</div>
					)),
				)}

				{arts.map((art) => (
					<Card
						key={art.name}
						className={twMerge(art.className, "gap-5")}
						icon={art.icon}
						topLabel={art.name}
						bottomLabel={art.name}
						sections={[{ label: "Art", text: art.name }]}
						description={art.description}
					/>
				))}

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
		</main>
	)
}

function AspectSkillCard({
	aspect,
	action,
}: {
	aspect: Aspect
	action: string
}) {
	return (
		<Card
			className={aspect.className}
			icon={aspect.icon}
			topLabel={aspect.name}
			bottomLabel={aspect.name}
			leftLabel={action}
			rightLabel={action}
			sections={[
				{ label: "Aspect", text: aspect.name },
				{ label: `Skill`, text: action },
				// { label: "Art", text: aspect.element.join("\n") },
				{ label: "Find Something", text: aspect.found },
			]}
		/>
	)
}

function Card({
	className,
	icon,
	topLabel,
	bottomLabel,
	leftLabel,
	rightLabel,
	sections,
	description,
}: {
	className?: string
	icon?: string
	topLabel?: string
	bottomLabel?: string
	leftLabel?: string
	rightLabel?: string
	sections?: { label: string; text: string }[]
	description?: ReactNode
}) {
	return (
		<div
			className={twMerge(
				cardClass,
				"relative flex flex-col items-center justify-center gap-3 text-center text-shadow-black/10 text-shadow-sm uppercase",
				className,
			)}
		>
			<div className="absolute inset-0 bg-stripes opacity-4"></div>
			<div className="absolute inset-0 bg-linear-to-t from-black/20 via-black/5 data-art:from-white/20 data-art:via-40% data-art:via-white/10"></div>

			{icon && (
				<>
					<div className="absolute top-0 left-0 p-1.5 opacity-70">
						<Icon icon={icon} className="size-6" />
					</div>
					<div className="absolute bottom-0 left-0 p-1.5 opacity-70">
						<Icon icon={icon} className="size-6" />
					</div>
					<div className="absolute top-0 right-0 p-1.5 opacity-70">
						<Icon icon={icon} className="size-6" />
					</div>
					<div className="absolute right-0 bottom-0 p-1.5 opacity-70">
						<Icon icon={icon} className="size-6" />
					</div>
				</>
			)}

			{topLabel && (
				<div className="-translate-x-1/2 absolute top-2.5 left-1/2 font-medium text-[11px] opacity-80">
					{topLabel}
				</div>
			)}
			{bottomLabel && (
				<div className="-translate-x-1/2 absolute bottom-2.5 left-1/2 font-medium text-[11px] opacity-80">
					{bottomLabel}
				</div>
			)}

			{leftLabel && (
				<div className="-translate-x-1/2 -rotate-90 absolute left-3.5 font-medium text-[11px] opacity-80">
					{leftLabel}
				</div>
			)}
			{rightLabel && (
				<div className="absolute right-3.5 translate-x-1/2 rotate-90 font-medium text-[11px] opacity-80">
					{rightLabel}
				</div>
			)}

			{sections?.map((section, index) => (
				<div
					className="relative flex scale-95 flex-col items-center text-center"
					key={index}
				>
					<h2 className="font-medium text-sm opacity-80">{section.label}</h2>
					<p className="flex-1 whitespace-pre-line text-balance font-medium text-xl">
						{section.text}
					</p>
				</div>
			))}

			{description && (
				<p className="flex h-16 items-center text-balance px-5 leading-tight">
					{description}
				</p>
			)}
		</div>
	)
}
