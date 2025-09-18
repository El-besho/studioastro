import * as React from "react"

import { cn } from "../../lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  variant?: "default" | "enhanced" | "glass"
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, variant = "default", ...props }, ref) => {
    const variantClasses = {
      default: "border-input bg-background hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20",
      enhanced: "input-enhanced hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20",
      glass: "glass-effect border-white/20 bg-white/10 backdrop-blur-sm hover:border-white/30 focus:border-white/40 focus:ring-2 focus:ring-white/20"
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-all duration-200",
          variantClasses[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
