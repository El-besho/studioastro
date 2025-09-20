import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 touch-target",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg active:scale-95 transition-all duration-200 focus:ring-2 focus:ring-primary/20",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:scale-95 transition-all duration-200 focus:ring-2 focus:ring-destructive/20",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-primary/20 active:scale-95 transition-all duration-200 focus:ring-2 focus:ring-primary/20",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95 transition-all duration-200 focus:ring-2 focus:ring-secondary/20",
        ghost: "hover:bg-accent hover:text-accent-foreground active:scale-95 transition-all duration-200 focus:ring-2 focus:ring-accent/20",
        link: "text-primary underline-offset-4 hover:underline active:scale-95 transition-all duration-200 focus:ring-2 focus:ring-primary/20",
        gradient: "bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90 hover:shadow-lg active:scale-95 transition-all duration-200 focus:ring-2 focus:ring-primary/20",
        glass: "bg-white/10 backdrop-blur-sm border border-white/20 text-foreground hover:bg-white/20 active:scale-95 transition-all duration-200 focus:ring-2 focus:ring-white/20",
        premium: "bg-gradient-to-r from-primary via-accent to-primary bg-size-200 hover:bg-pos-0 text-white font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 focus:ring-2 focus:ring-primary/20",
        neon: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)] active:scale-95 transition-all duration-200 focus:ring-2 focus:ring-primary/20",
        soft: "bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all duration-200 focus:ring-2 focus:ring-primary/20",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-sm",
        lg: "h-11 rounded-md px-8 text-base",
        xl: "h-12 rounded-lg px-10 text-lg",
        "2xl": "h-14 rounded-lg px-12 text-xl",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-lg": "h-12 w-12",
        "icon-xl": "h-14 w-14",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
