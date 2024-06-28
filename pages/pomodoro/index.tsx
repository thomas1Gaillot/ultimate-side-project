import {TypographyBlockquote, TypographyH1, TypographyP} from "@/components/ui/typography";
import {PlayIcon, SquareCheckBig, Undo2} from "lucide-react";
import Image from "next/image";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Separator} from "@/components/ui/separator";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import Timer from "@/pages/pomodoro/components/Timer";

export default function Pomodoro() {
    const [isPlaying, setIsPlaying] = useState(false)
    const [numberOfPomodoro, setNumberOfPomodoro] = useState(0)
    const [numberOfShortBreak, setNumberOfShortBreak] = useState(0)
    const [numberOfLongBreak, setNumberOfLongBreak] = useState(0)
    return (
        <div className={"w-full h-full flex flex-col items-center justify-center"}>
        <Card className={'p-4 flex flex-col gap-4'}>
            <TypographyBlockquote>Making the design for the pomodoro page.</TypographyBlockquote>
            <Timer/>
            <div className={"flex w-full justify-between items-center"}>
                <div className={"flex items-center gap-1"}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    className={"flex items-center gap-1 text-gray-500 hover:bg-gray-100 px-2 py-1 rounded"}>
                                    <Image src={'/tomato.svg'} alt={'tomato'} width={50} height={50}
                                           className={'h-5 w-5 '}/>
                                    <p className={"text-sm"}>{numberOfPomodoro}</p>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Numbers of pomodoro of 25 min</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Separator orientation={'vertical'}/>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    className={"flex items-center gap-1 text-gray-500 hover:bg-gray-100 px-2 py-1 rounded"}>
                                    <Image src={'/teapot.svg'} alt={'tomato'} width={50} height={50}
                                           className={'h-5 w-5 '}/>
                                    <p className={"text-sm"}>{numberOfShortBreak}</p>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Numbers of short break of 5 min</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Separator orientation={'vertical'}/>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className={"flex items-center gap-1 text-gray-500 px-2 py-1 rounded hover:bg-gray-100"}>
                                    <Image src={'/beer.svg'} alt={'tomato'} width={50} height={50}
                                           className={'h-5 w-5 '}/>
                                    <p className={"text-sm"}>{numberOfLongBreak}</p>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Numbers of long break of 15 min</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className={"flex gap-2 items-center "}>
                    <Button variant={'default'} className={'px-6'}>
                        <PlayIcon size={24} className={"cursor-pointer text-gray-50 "}/>
                    </Button>
                    <Button variant={'secondary'} className={'px-2'}>
                    <Undo2 size={24} className={"cursor-pointer text-gray-700 "}/>
                    </Button>
                </div>
            </div>

        </Card>
        </div>
    );
}