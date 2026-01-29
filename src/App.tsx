import { Icon } from "@iconify/react"
import { assert } from "es-toolkit"
import * as htmlToImage from "html-to-image"
import {
	type FileSystemDirectoryHandle,
	showDirectoryPicker,
} from "native-file-system-adapter"
import { type ReactNode, useActionState, useRef, useState } from "react"
import { twMerge } from "tailwind-merge"

const tw = String.raw

type AspectCard = {
	name: string
	description?: string
	actions: string[]
	className: string
	icon: string
	perception: string
	arts: string[]
}

type SkillName = (typeof aspects)[number]["actions"][number]

const aspects = [
	{
		name: "Aggression",
		description: "violence, brute force, athletic prowess",
		actions: ["Strike", "Exert", "Dash"],
		icon: "mingcute:sword-line",
		perception: "an ending",
		className: tw`bg-aspects-red text-aspects-red-dark`,
		arts: ["Fire", "Lightning"],
	},
	{
		name: "Influence",
		description: "social leverage, status, invisible pressure",
		actions: ["Intuit", "Persuade", "Deceive"],
		icon: "mingcute:star-line",
		perception: "a lead",
		className: tw`bg-aspects-yellow text-aspects-yellow-dark`,
		arts: ["Reality", "Mind"],
	},
	{
		name: "Evasion",
		description: "isolation, deflection, sidestepping",
		actions: ["Evade", "Sneak", "Finesse"],
		icon: "mingcute:forbid-circle-line",
		perception: "a way out",
		className: tw`bg-aspects-green text-aspects-green-dark`,
		arts: ["Wind", "Sound"],
	},
	{
		name: "Connection",
		description: "bonding, protection, safety",
		actions: ["Protect", "Restore", "Charm"],
		icon: "mingcute:shield-shape-line",
		perception: "a way in",
		className: tw`bg-aspects-blue text-aspects-blue-dark`,
		arts: ["Water", "Healing"],
	},
] as const satisfies AspectCard[]

type NatureArtCard = {
	name: string
	description: string
	icon: string
	className: string
	skill: SkillName
}

const arts: NatureArtCard[] = [
	{
		name: "Life",
		description: "Alter vitality through touch",
		icon: "mingcute:heartbeat-2-line",
		className: tw`bg-pink-800 text-pink-200 saturate-60`,
		skill: "Restore",
	},
	{
		name: "Ember",
		description: "Conjure flame and generate heat",
		icon: "mingcute:flame-line",
		className: tw`bg-red-800 text-red-200 saturate-60`,
		skill: "Strike",
	},
	{
		name: "Spark",
		description: "Summon and direct lightinng",
		icon: "mingcute:lightning-line",
		className: tw`bg-yellow-800 text-yellow-200 saturate-60`,
		skill: "Dash",
	},
	{
		name: "Verdance",
		description: "Commune with and alter plant life",
		icon: "mingcute:leaf-line",
		className: tw`bg-green-800 text-green-200 saturate-60`,
		skill: "Persuade",
	},
	{
		name: "Tempest",
		description: "Control wind and weather",
		icon: "mingcute:cloud-windy-line",
		className: tw`bg-teal-800 text-teal-200 saturate-60`,
		skill: "Evade",
	},
	{
		name: "Resonance",
		description: "Amplify, dampen, and project noise",
		icon: "mingcute:voice-line",
		className: tw`bg-cyan-800 text-cyan-200 saturate-60`,
		skill: "Sneak",
	},
	{
		name: "Flow",
		description: "Shape and propel natural liquids",
		icon: "mingcute:drop-line",
		className: tw`bg-blue-800 text-blue-200 saturate-60`,
		skill: "Charm",
	},
	{
		name: "Psyche",
		description: "Query and manipulate the psyche of others",
		icon: "mingcute:thought-line",
		className: tw`bg-indigo-800 text-indigo-200 saturate-60`,
		skill: "Intuit",
	},
	{
		name: "Void",
		description: "Manifest pure featureless darkness",
		icon: "mingcute:moon-line",
		className: tw`bg-purple-800 text-purple-200 saturate-30`,
		skill: "Deceive",
	},
	{
		name: "Nebula",
		description: "Shape the fabric of reality",
		icon: "mingcute:planet-line",
		className: tw`bg-stone-800 text-stone-200 saturate-60`,
		skill: "Finesse",
	},
	{
		name: "Stone",
		description: "Shift rocks and bend metals",
		icon: "mingcute:cloud-windy-line",
		className: tw`bg-neutral-700 text-neutral-200 saturate-60`,
		skill: "Exert",
	},
	{
		name: "Frost",
		description: "Freeze moisture and sculpt ice",
		icon: "mingcute:snow-line",
		className: tw`bg-slate-700 text-slate-100`,
		skill: "Protect",
	},
	// {
	// 	name: "Lumen",
	// 	description: "Coalesce solid illumination",
	// 	icon: "mingcute:sun-line",
	// 	className: tw`bg-yellow-800 text-yellow-200 saturate-60`,
	// },
	// {
	// 	name: "Healing",
	// 	description: "Mend wounds and restore vitality",
	// 	icon: "mingcute:heartbeat-2-line",
	// 	className: tw`bg-pink-800 text-pink-200 saturate-60`,
	// },
]

const cardClass = tw`aspect-[2.5/3.5] h-75 overflow-clip rounded-xl border-4`

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

	const [_saveAllState, saveAll, saveAllPending] = useActionState(
		async (_: unknown, directoryHandle: FileSystemDirectoryHandle) => {
			assert(combinedCardGridRef.current, "combinedCardGridRef.current")
			assert(splitCardGridRef.current, "splitCardGridRef.current")
			assert(previewRef.current, "previewRef.current")

			const results = await Promise.allSettled([
				saveImage(
					combinedCardGridRef.current,
					"aspect-cards-instincts.png",
					directoryHandle,
				),
				saveImage(
					splitCardGridRef.current,
					"aspect-cards-instincts-actions.png",
					directoryHandle,
				),
				saveImage(
					previewRef.current,
					"aspect-cards-preview.png",
					directoryHandle,
				),
				directoryHandle
					.getDirectoryHandle("cards", { create: true })
					.then((individualImagesDir) =>
						[...ensure(combinedCardGridRef.current).children].map(
							(el, index) => {
								assert(
									el instanceof HTMLElement,
									`element ${index} is not an HTMLElement`,
								)

								const baseName = el.dataset.imageName || `card`

								return saveImage(
									el as HTMLElement,
									`${String(index).padStart(2, "0")}_${baseName}.png`,
									individualImagesDir,
								)
							},
						),
					),
			])

			const rejections = results.filter(
				(result) => result.status === "rejected",
			)

			if (rejections.length > 0) {
				console.error(rejections)
				alert(`${rejections.length} errors found; check console for details`)
			}
		},
		null,
	)

	const [_saveToDirectoryState, saveToDirectory, saveToDirectoryPending] =
		useActionState(async (_: unknown) => {
			try {
				const dir = await showDirectoryPicker({
					mode: "readwrite",
				} as any)
				setDirectoryHandle(dir)
				saveAll(dir)
			} catch (error) {
				if (error instanceof Error && error.name === "AbortError") {
					return
				}
				alert(`Error: ${error}`)
			}
		}, null)

	const cardBack = (
		<div
			data-image-name="back"
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

	const natureArtCards = arts.map((art) => (
		<Card
			key={art.name}
			className={art.className}
			icon={art.icon}
			data-image-name={art.name.toLocaleLowerCase()}
			// description={art.description}
			// sections={[
			// 	{ label: "Nature Art", text: art.name },
			// 	{ label: "Skill", text: art.skill },
			// ]}
		>
			<div className="flex flex-col gap-4">
				<section className="flex min-h-20 flex-col">
					<h2 className="whitespace-pre-line text-balance font-medium text-xl">
						{art.name}
					</h2>
					<p className="flex flex-1 flex-col justify-center px-6 font-medium text-sm leading-tight opacity-90">
						{art.description}
					</p>
				</section>
				<CardSection heading="Skill" body={art.skill} />
			</div>
		</Card>
	))

	return (
		<main className="grid min-h-dvh w-fit justify-items-start gap-4 p-4">
			<div className="flex h-10 items-stretch gap-2">
				{saveToDirectoryPending || saveAllPending ? (
					<Icon
						icon="mingcute:loading-3-fill"
						className="size-8 animate-spin self-center"
					/>
				) : (
					<>
						{directoryHandle && (
							<form action={() => saveAll(directoryHandle)}>
								<button
									type="submit"
									className="rounded-md bg-aspects-blue px-3 py-2 text-aspects-blue-dark leading-tight transition hover:brightness-80"
								>
									save
								</button>
							</form>
						)}
						<form action={saveToDirectory}>
							<button
								type="submit"
								className="rounded-md bg-aspects-blue px-3 py-2 text-aspects-blue-dark leading-tight transition hover:brightness-80"
							>
								choose directory
							</button>
						</form>
					</>
				)}
			</div>

			<div className="flex gap-2" ref={previewRef}>
				{aspects.map((aspect) => (
					<AspectInstinctCard key={aspect.name} aspect={aspect} />
				))}
			</div>

			<div
				className="grid grid-cols-[repeat(4,1fr)] gap-2"
				ref={combinedCardGridRef}
			>
				{aspects.map((aspect) => (
					<AspectInstinctCard key={aspect.name} aspect={aspect} />
				))}
				{natureArtCards}
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
							aspect={{
								...aspect,
								description: "",
							}}
							action={action}
							arts={aspect.arts}
						/>
					)),
				)}
				{/* {natureArtCards} */}
				{cardBack}
			</div>
		</main>
	)
}

function AspectInstinctCard({
	aspect,
	action,
	arts,
}: {
	aspect: AspectCard
	action?: string
	arts?: string[]
}) {
	return (
		<Card
			className={aspect.className}
			icon={aspect.icon}
			// topLabel={aspect.name}
			// bottomLabel={aspect.name}
			leftLabel={action}
			rightLabel={action}
			// leftLabel={action}
			// rightLabel={action}
			// sections={[
			// 	{ label: "Aspect", text: aspect.name },
			// 	{ label: `Skill`, text: action },
			// 	// { label: "Art", text: aspect.element.join("\n") },
			// 	{ label: "Find Something", text: aspect.found },
			// ]}
			data-image-name={(
				aspect.name + (action ? `-${action}` : "")
			).toLowerCase()}
		>
			<div className="flex flex-col items-center gap-4 text-center">
				<section className="">
					<h2 className="mb-0.5 whitespace-pre-line text-balance font-medium text-xl leading-snug">
						{aspect.name}
					</h2>
					{aspect.description && (
						<p className="flex items-center px-8 font-medium text-sm leading-snug opacity-90">
							{aspect.description}
						</p>
					)}
				</section>

				{action ? (
					<CardSection heading="Action" body={action} />
				) : (
					<ul className="flex h-12 flex-wrap items-center justify-center gap-x-1 px-6 *:not-last:after:opacity-75 *:not-last:after:content-[',']">
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

				{arts && <CardSection heading="Nature Art" body={arts.join("\n")} />}

				<CardSection heading="Find" body={aspect.perception} />
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
	...props
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
			{...props}
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
				<CardSection key={index} heading={section.label} body={section.text} />
			))}

			{description && <CardDescription>{description}</CardDescription>}

			{children}
		</div>
	)
}

function CardSection({
	heading,
	body,
}: {
	heading: ReactNode
	body: ReactNode
}) {
	return (
		<section>
			<h2 className="px-6 font-medium text-sm leading-tight opacity-80">
				{heading}
			</h2>
			<p className="whitespace-pre-line text-balance font-medium leading-tight">
				{body}
			</p>
		</section>
	)
}

function CardDescription({ children }: { children: React.ReactNode }) {
	return (
		<p className="flex h-16 items-center text-balance px-5 leading-tight">
			{children}
		</p>
	)
}

const ensure = <T,>(value: T, message: string = "value is nullish") => {
	if (value == null) {
		throw new Error(message)
	}
	return value
}
