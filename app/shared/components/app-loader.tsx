import { Loader } from "./ui"

export function AppLoader() {
	return (
		<div className="flex h-screen w-screen items-center justify-center">
			<Loader className="size-10" />
		</div>
	)
}
