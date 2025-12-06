import { StrictMode } from "react"
import "./styles.css"
import { createRoot } from "react-dom/client"
import { App } from "./App.tsx"
import "@fontsource-variable/lexend/index.css"

createRoot(document.getElementById("root") as HTMLElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
)
