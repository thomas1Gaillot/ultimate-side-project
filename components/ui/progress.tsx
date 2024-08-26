"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
    label?: string; // Prop for the text on the top-right
    labelLeft?: string; // New prop for the text on the top-left
}

const Progress = React.forwardRef<
    React.ElementRef<typeof ProgressPrimitive.Root>,
    ProgressProps
>(({ className, value, label, labelLeft, ...props }, ref) => (
    <div className="flex flex-col w-max py-1">
        <div className="flex justify-between mb-0.5">
                <span className="text-xs text-gray-700">
                    {labelLeft || ''}
                </span>
            {label && (
                <span className="text-xs text-gray-700 tracking-wider">
                    {label}
                </span>
            )}
        </div>
        <ProgressPrimitive.Root
            ref={ref}
            className={cn(
                "relative h-1.5 w-full overflow-hidden rounded-full bg-primary/20",
                className
            )}
            {...props}
        >
            <ProgressPrimitive.Indicator
                className="h-full w-full flex-1 bg-primary transition-all"
                style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
            />
        </ProgressPrimitive.Root>
    </div>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
