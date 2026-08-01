/**
 * shadcn-styled Button on Base UI.
 *
 * Fallback note: no pre-copied shadcn Button existed in-repo; Base UI's
 * `Button` primitive supplies accessible press behavior under local styles.
 */
import { Button as BaseButton } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils.ts"

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md border text-sm font-semibold transition-[transform,background-color,border-color,color] duration-150 ease-out outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    defaultVariants: { size: "default", variant: "default" },
    variants: {
      size: { default: "h-10 px-4 py-2", icon: "size-10", lg: "h-11 px-6", sm: "h-9 px-3" },
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        ghost: "border-transparent hover:bg-muted",
        outline: "border-border bg-background hover:bg-muted",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
      },
    },
  },
)

type ButtonProps = ComponentProps<typeof BaseButton> & VariantProps<typeof buttonVariants>

export function Button({ className, size, variant, ...props }: ButtonProps) {
  return <BaseButton className={cn(buttonVariants({ className, size, variant }))} {...props} />
}
