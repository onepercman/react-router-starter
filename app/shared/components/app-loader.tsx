import { Loader } from "./ui"

export function AppLoader() {
  return (
    <div className="w-screen flex h-screen items-center justify-center">
      <Loader className="size-10" />
    </div>
  )
}
