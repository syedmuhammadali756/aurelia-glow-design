import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        solid:
          "btn-luxe bg-espresso text-ivory hover:text-espresso border border-espresso",
        outline:
          "btn-luxe border border-espresso text-espresso bg-transparent hover:text-ivory hover:[&::before]:bg-espresso",
        "outline-luxe":
          "border border-espresso text-espresso bg-transparent hover:bg-espresso hover:text-ivory",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-espresso underline-offset-4 hover:underline",
        pill: "btn-luxe bg-espresso text-ivory rounded-full hover:text-espresso border border-espresso",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "h-11 px-6 text-sm tracking-wide",
        sm: "h-9 px-4 text-xs tracking-wide",
        lg: "h-12 px-8 text-sm tracking-wider uppercase",
        xl: "h-14 px-10 text-sm tracking-[0.18em] uppercase",
        icon: "h-10 w-10 rounded-full",
      },
      shape: {
        sharp: "rounded-none",
        soft: "rounded-md",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "soft",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, shape, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, shape, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
