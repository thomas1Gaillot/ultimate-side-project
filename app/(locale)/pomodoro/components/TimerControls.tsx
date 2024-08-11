'use client'
import {Button} from "@/components/ui/button";
import {PauseIcon, PlayIcon, Undo, Undo2} from "lucide-react";
import {DotsVerticalIcon} from "@radix-ui/react-icons";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const TimerControls = ({isPlaying, form, onSubmit, reset, resetPomodoro}: {
    isPlaying: boolean;
    form: any;
    onSubmit: () => void;
    reset: (e: any) => void;
    resetPomodoro: (e: any) => void;
}) => {
    return (
        <div className={"flex gap-2 items-center "}>
            <Button onClick={form?.handleSubmit(onSubmit)} variant={"default"} disabled={!form?.watch("task")}
                    className={"px-6 md:px-12 "}>
                {isPlaying ? <PauseIcon size={24} className={"cursor-pointer text-gray-50 "}/> :
                    <PlayIcon size={24} className={"cursor-pointer text-gray-50 "}/>}
            </Button>
            <Button onClick={reset} variant={"outline"} className={"px-2"}>
                <Undo size={24} className={"cursor-pointer text-gray-700 "}/>
            </Button>

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button onClick={reset} variant={"ghost"} size={'sm'} className={"px-2"}>
                        <DotsVerticalIcon size={24} className={"cursor-pointer text-gray-700 "}/>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-max">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator/>
                    <DropdownMenuGroup className={'grid gap-1 py-1 px-0.5'}>
                    <Button  className={"px-2 flex gap-2 hover:scale-100 justify-start"}
                        onClick={form?.handleSubmit(onSubmit)} variant={"default"} disabled={!form?.watch("task")}>
                        <p className={"text-xs "}>Start / Pause  </p>
                        {isPlaying ?
                        <PauseIcon size={16} className={"cursor-pointer text-gray-50 "}/> :
                        <PlayIcon size={16} className={"cursor-pointer text-gray-50 "}/>}
                    </Button>
                    <Button className={"px-2 flex gap-2 justify-start"}
                            onClick={reset}  variant={"ghost"}>
                        <p className={"text-xs  text-gray-600"}>Restart Timer </p>
                        <Undo size={16} className={"cursor-pointer text-gray-700 "}/>
                    </Button>
                    <Button onClick={resetPomodoro} variant={"ghost"}
                                className={"px-2 flex gap-2"}>
                            <p className={"text-xs text-gray-600"}>Restart to first pattern  </p>
                            <Undo2 size={16} className={"cursor-pointer text-gray-700 "}/>
                        </Button>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>


        </div>
    );
};

export default TimerControls;
