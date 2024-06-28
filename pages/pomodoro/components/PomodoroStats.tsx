import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Image from "next/image";
import {Separator} from "@/components/ui/separator";

export default function PomodoroStats({pomodoro, shortBreak, longBreak}: {
    pomodoro: number,
    shortBreak: number,
    longBreak: number
}) {
    return <div className={"flex items-center gap-1 h-max"}>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={"flex items-center gap-1 text-gray-500 hover:bg-gray-100 px-2 py-1 rounded"}>
                        <Image src={'/tomato.svg'} alt={'tomato'} width={50} height={50}
                               className={'h-5 w-5 '}/>
                        <p className={"text-sm"}>{pomodoro}</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Numbers of pomodoro of 25 min</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className={"flex items-center gap-1 text-gray-500 hover:bg-gray-100 px-2 py-1 rounded"}>
                        <Image src={'/teapot.svg'} alt={'tomato'} width={50} height={50}
                               className={'h-5 w-5 '}/>
                        <p className={"text-sm"}>{shortBreak}</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Numbers of short break of 5 min</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div className={"flex items-center gap-1 text-gray-500 px-2 py-1 rounded hover:bg-gray-100"}>
                        <Image src={'/beer.svg'} alt={'tomato'} width={50} height={50}
                               className={'h-5 w-5 '}/>
                        <p className={"text-sm"}>{longBreak}</p>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Numbers of long break of 15 min</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    </div>
}