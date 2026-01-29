import { Icon } from "@iconify/react"
import * as htmlToImage from "html-to-image"
import {
	type FileSystemDirectoryHandle,
	showDirectoryPicker,
} from "native-file-system-adapter"
import { type ReactNode, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

const tw = String.raw

type AspectCard = {
	name: string
	description?: string
	actions: string[]
	className: string
	icon: string
	perception: string
}

const aspects: AspectCard[] = [
	{
		name: "Aggression",
		description: "violence, brute force, athletic prowess",
		actions: ["Strike", "Hold", "Dash"],
		icon: "mingcute:sword-line",
		perception: "a weakness",
		className: tw`bg-aspects-red text-aspects-red-dark`,
	},
	{
		name: "Evasion",
		description: "isolation, deflection, sidestepping",
		actions: ["Evade", "Sneak", "Finesse"],
		icon: "mingcute:forbid-circle-line",
		perception: "a way out",
		className: tw`bg-aspects-purple text-aspects-purple-dark`,
	},
	{
		name: "Influence",
		description: "social leverage, status, invisible pressure",
		actions: ["Read", "Persuade", "Deceive"],
		icon: "mingcute:eye-line",
		perception: "an opportunity",
		className: tw`bg-aspects-yellow text-aspects-yellow-dark`,
	},
	{
		name: "Connection",
		description: "bonding, protection, safety",
		actions: ["Protect", "Restore", "Charm"],
		icon: "mingcute:shield-shape-line",
		perception: "safety",
		className: tw`bg-aspects-blue text-aspects-blue-dark`,
	},
]

type NatureArtCard = {
	name: string
	description: string
	icon: string
	className: string
}

const arts: NatureArtCard[] = [
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
	const combinedCardGridRef = useRef<HTMLDivElement>(null)
	const splitCardGridRef = useRef<HTMLDivElement>(null)
	const previewRef = useRef<HTMLDivElement>(null)
	const [directoryHandle, setDirectoryHandle] =
		useState<FileSystemDirectoryHandle>()

	const saveImage = async (
		subject: HTMLElement,
		fileName: string,
		directoryHandle: FileSystemDirectoryHandle,
	) => {
		const targetSize = 3000

		const scale = Math.min(
			targetSize / subject.clientWidth,
			targetSize / subject.clientHeight,
			1,
		)

		const image = await htmlToImage.toBlob(subject, {
			canvasWidth: subject.clientWidth * scale,
			canvasHeight: subject.clientHeight * scale,
		})

		const file = await directoryHandle.getFileHandle(fileName, {
			create: true,
		})
		const writer = await file.createWritable()
		await writer.write(image)
		await writer.close()
	}

	const saveAll = async (directoryHandle: FileSystemDirectoryHandle) => {
		try {
			await saveImage(
				combinedCardGridRef.current as HTMLElement,
				"aspect-cards-instincts.png",
				directoryHandle,
			)
			await saveImage(
				splitCardGridRef.current as HTMLElement,
				"aspect-cards-instincts-split.png",
				directoryHandle,
			)
			await saveImage(
				previewRef.current as HTMLElement,
				"aspect-cards-preview.png",
				directoryHandle,
			)
			alert("Saved successfully")
		} catch (error) {
			alert(`Error: ${error}`)
		}
	}

	const cardBack = (
		<div
			className={twMerge(
				cardClass,
				"relative flex items-center justify-center border-none text-black/45 outline-4 outline-black/60 -outline-offset-4",
				"bg-linear-to-br from-aspects-purple via-aspects-blue to-aspects-green",
			)}
		>
			<div className="absolute inset-0 bg-stripes opacity-4"></div>
			<div className="absolute inset-0 bg-linear-to-t from-black/15"></div>
			<Icon
				icon="lucide:pentagon"
				className="size-32 drop-shadow-black/20 drop-shadow-md"
			/>
		</div>
	)

	return (
		<main className="flex h-dvh flex-col items-start gap-4 p-4">
			<div className="flex gap-2">
				<button
					type="button"
					className="rounded-md bg-aspects-blue px-3 py-2 text-aspects-blue-dark leading-tight transition hover:brightness-80"
					onClick={async () => {
						const dir = await showDirectoryPicker({
							mode: "readwrite",
						} as any)
						setDirectoryHandle(dir)
						await saveAll(dir)
					}}
				>
					choose directory
				</button>

				{directoryHandle && (
					<button
						type="button"
						className="rounded-md bg-aspects-blue px-3 py-2 text-aspects-blue-dark leading-tight transition hover:brightness-80"
						onClick={() => saveAll(directoryHandle)}
					>
						save
					</button>
				)}
			</div>

			<div className="flex gap-2" ref={previewRef}>
				{aspects.map((aspect) => (
					<AspectInstinctCard key={aspect.name} aspect={aspect} />
				))}
			</div>

			<div className="flex gap-2" ref={combinedCardGridRef}>
				{aspects.map((aspect) => (
					<AspectInstinctCard key={aspect.name} aspect={aspect} />
				))}
				{cardBack}
			</div>

			<div
				ref={splitCardGridRef}
				className="grid grid-cols-[repeat(4,1fr)] place-content-center gap-2"
			>
				{aspects.map((aspect) =>
					[
						...aspect.actions.sort((a, b) =>
							a.toLocaleLowerCase().localeCompare(b.toLocaleLowerCase()),
						),
						"Any",
					].map((action) => (
						<AspectInstinctCard
							key={`${aspect.name}-${action}`}
							aspect={aspect}
							action={action}
						/>
					)),
				)}

				{cardBack}
			</div>
		</main>
	)
}

function AspectInstinctCard({
	aspect,
	action,
}: {
	aspect: AspectCard
	action?: string
}) {
	return (
		<Card
			className={aspect.className}
			icon={aspect.icon}
			// topLabel={aspect.name}
			// bottomLabel={aspect.name}
			// leftLabel={aspect.name}
			// rightLabel={aspect.name}
			// leftLabel={action}
			// rightLabel={action}
			// sections={[
			// 	{ label: "Aspect", text: aspect.name },
			// 	{ label: `Skill`, text: action },
			// 	// { label: "Art", text: aspect.element.join("\n") },
			// 	{ label: "Find Something", text: aspect.found },
			// ]}
		>
			<div className="flex flex-col items-center gap-4 text-center">
				<section>
					<h2 className="whitespace-pre-line text-balance font-medium text-xl">
						{aspect.name}
					</h2>
					<p className="px-6 font-medium text-sm leading-tight opacity-90">
						{aspect.description}
					</p>
				</section>

				{action ? (
					<section>
						<h2 className="px-6 font-medium text-sm leading-tight opacity-90">
							Action
						</h2>
						<p className="whitespace-pre-line text-balance font-medium leading-tight">
							{action}
						</p>
					</section>
				) : (
					<ul className="flex flex-wrap justify-center gap-x-1 px-4 *:not-last:after:opacity-75 *:not-last:after:content-[',']">
						{aspect.actions.map((action) => (
							<li
								key={action}
								className="whitespace-pre-line text-balance font-medium leading-tight"
							>
								{action}
							</li>
						))}
					</ul>
				)}

				<section>
					<h2 className="px-6 font-medium text-sm leading-tight opacity-90">
						Find
					</h2>
					<p className="whitespace-pre-line text-balance font-medium leading-tight">
						{aspect.perception}
					</p>
				</section>
			</div>
		</Card>
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
	children,
}: {
	className?: string
	icon?: string
	topLabel?: string
	bottomLabel?: string
	leftLabel?: string
	rightLabel?: string
	sections?: { label: string; text: string }[]
	description?: ReactNode
	children?: React.ReactNode
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
				<div className="absolute top-2.5 left-1/2 -translate-x-1/2 font-medium text-[11px] opacity-80">
					{topLabel}
				</div>
			)}
			{bottomLabel && (
				<div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 font-medium text-[11px] opacity-80">
					{bottomLabel}
				</div>
			)}

			{leftLabel && (
				<div className="absolute left-3.5 -translate-x-1/2 -rotate-90 font-medium text-[11px] opacity-80">
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

			{children}
		</div>
	)
}
