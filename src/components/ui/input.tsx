import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // TypeGallery input: square, flat, 40px tall, 16px Manrope.
        // Border: muted default -> brown hover -> 2px rust focus -> rust on error.
        "h-10 w-full min-w-0 border border-input bg-card px-3 py-2 font-sans text-base text-foreground transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-primary focus-visible:border-2 focus-visible:border-tertiary disabled:pointer-events-none disabled:cursor-not-allowed disabled:border-border disabled:bg-muted disabled:opacity-100 aria-invalid:border-destructive aria-invalid:bg-[#FDF6F5]",
        className
      )}
      {...props}
    />
  )
}

export { Input }
