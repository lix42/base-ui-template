import { Moon, Sparkles, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

function App() {
	const [dark, setDark] = useState(() =>
		document.documentElement.classList.contains("dark"),
	);

	useEffect(() => {
		document.documentElement.classList.toggle("dark", dark);
	}, [dark]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-background p-6">
			<Card className="w-full max-w-md">
				<CardHeader>
					<div className="flex items-start justify-between">
						<div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
							<Sparkles className="h-5 w-5" />
						</div>
						<Button
							variant="ghost"
							size="icon"
							onClick={() => setDark((d) => !d)}
						>
							{dark ? (
								<Sun className="h-4 w-4" />
							) : (
								<Moon className="h-4 w-4" />
							)}
						</Button>
					</div>
					<CardTitle className="text-xl">Welcome</CardTitle>
					<CardDescription>
						React 19, Vite 8, Tailwind v4, and shadcn/ui — all wired up and
						ready to go.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-sm text-muted-foreground">
						Edit{" "}
						<code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
							src/App.tsx
						</code>{" "}
						to start building.
					</p>
				</CardContent>
			</Card>
		</div>
	);
}

export default App;
