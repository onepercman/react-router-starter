import { Slot } from "@radix-ui/react-slot"
import * as React from "react"
import { cn } from "~/shared/utils"
import { Spinner } from "./ui/spinner"

export interface LoaderProps extends React.ComponentProps<"div"> {
  asChild?: boolean
}

export function Loader({
  asChild = false,
  className,
  ref,
  ...props
}: LoaderProps) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp ref={ref} className={cn("flex min-h-56", className)} {...props}>
      <div className="m-auto flex flex-col items-center gap-4 p-4">
        <Spinner />
      </div>
    </Comp>
  )
}
