import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// TypeGallery buttons: sharp-edged, flat, Manrope 500. Hover = color inversion.
// Focus = 2px rust (tertiary) border, never a box-shadow ring.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 border whitespace-nowrap font-sans font-medium transition-colors outline-none select-none focus-visible:border-tertiary focus-visible:border-2 disabled:pointer-events-none disabled:opacity-35 disabled:cursor-not-allowed aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        // Primary: brown fill -> invert to outlined on hover
        default:
          "border-primary bg-primary text-primary-foreground hover:bg-transparent hover:text-primary",
        // Secondary: outlined -> invert to brown fill on hover
        outline:
          "border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        secondary:
          "border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground",
        // Ghost: rust text, borderless -> invert to rust fill on hover
        ghost:
          "border-transparent bg-transparent text-tertiary hover:bg-tertiary hover:text-tertiary-foreground",
        // Destructive: rust fill -> invert to outlined on hover
        destructive:
          "border-destructive bg-destructive text-primary-foreground hover:bg-transparent hover:text-destructive",
        link: "border-transparent bg-transparent text-tertiary underline-offset-4 hover:underline",
      },
      size: {
        // Medium (default): 40px tall
        default: "h-10 px-6 text-sm",
        // Small: 32px tall
        sm: "h-8 px-4 text-xs",
        xs: "h-7 px-3 text-xs [&_svg:not([class*='size-'])]:size-3",
        // Large: 48px tall
        lg: "h-12 px-8 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
