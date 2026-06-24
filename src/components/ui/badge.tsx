import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

// TypeGallery chips: square, 28px tall, 12px Manrope 500, uppercase, tracking 0.08em.
const badgeVariants = cva(
  "group/badge inline-flex h-7 w-fit shrink-0 items-center justify-center gap-1.5 overflow-hidden border px-2.5 text-xs font-medium uppercase tracking-[0.08em] whitespace-nowrap transition-colors focus-visible:border-2 focus-visible:border-tertiary [&>svg]:pointer-events-none [&>svg]:size-3.5!",
  {
    variants: {
      variant: {
        // Published / primary
        default:
          "border-primary bg-primary text-primary-foreground [a]:hover:bg-transparent [a]:hover:text-primary",
        // Archived
        secondary: "border-transparent bg-[#EDE8DE] text-[#B5A99A]",
        // Featured / error (rust)
        destructive:
          "border-destructive bg-destructive text-primary-foreground [a]:hover:bg-transparent [a]:hover:text-destructive",
        // Draft
        outline:
          "border-border bg-transparent text-muted-foreground [a]:hover:border-primary [a]:hover:text-foreground",
        ghost:
          "border-transparent bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
        link: "border-transparent text-tertiary underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
