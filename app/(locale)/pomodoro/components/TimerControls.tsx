'use client'
import {Button} from "@/components/ui/button";
import {PauseIcon, PlayIcon, Undo2} from "lucide-react";

const TimerControls = ({isPlaying, form, onSubmit, reset}: {
    isPlaying: boolean;
    form: any;
    onSubmit: () => void;
    reset: (e: any) => void;
}) => {
    return (
        <div className={"flex gap-2 items-center "}>
            <Button onClick={form?.handleSubmit(onSubmit)} variant={"default"} disabled={!form?.watch("task")}
                    className={"px-6"}>
                {isPlaying ? <PauseIcon size={24} className={"cursor-pointer text-gray-50 "}/> :
                    <PlayIcon size={24} className={"cursor-pointer text-gray-50 "}/>}
            </Button>
            <Button onClick={reset} variant={"outline"} className={"px-2"}>
                <Undo2 size={24} className={"cursor-pointer text-gray-700 "}/>
            </Button>
        </div>
    );
};

export default TimerControls;
