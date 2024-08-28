"use client"

import {Button} from "@/components/ui/button"
import {cn} from "@/lib/utils"
import {CheckIcon} from "lucide-react"
import RadialChart from "@/app/(locale)/poc-enostart/components/RadialChart";
import {usePathname, useRouter} from "next/navigation";

interface SmallStepProps {
    label: string
    index?: number
    link?: string
    disabled?: boolean
    numberOfTaskDone?: number
    numberOfTask?: number
    done?: boolean
}


const SmallStep = ({
                       label,
                       index,
                       link,
                       disabled,
                       numberOfTaskDone,
                       numberOfTask,
                       done
                   }: SmallStepProps) => {

    // Calculate progress as a percentage
    const progress = (!numberOfTaskDone || !numberOfTask) ? null : (numberOfTaskDone / numberOfTask) * 100
    const isDone = done || progress === 100
    const router = useRouter()
    const pathName = usePathname()
    return (
        <Button
            disabled={disabled || isDone}
            onClick={() => link ?router.push(link) : undefined}
            variant="ghost"
            size="sm"
            className={cn("flex items-center justify-start w-max gap-2",
                pathName === link ? "bg-primary/10 text-primary" : "")}
        >
            <div
                className={cn("mr-2 text-xs size-6 min-w-6 rounded-full flex justify-center items-center border text-gray-700",
                    index === undefined && 'opacity-0')}>
                {isDone ? <CheckIcon className={"size-4"}/> : (index || 0) + 1}
            </div>


            <div className="flex gap-2 text-wrap">
                <span className={cn(isDone && "line-through text-gray-700")}>{label}</span>
            </div>
            {!disabled && numberOfTaskDone && numberOfTask &&
                <RadialChart current={numberOfTaskDone} total={numberOfTask}/>}
        </Button>
    )
}

export default SmallStep


