'use client'
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {UseFormReturn} from "react-hook-form";
import index from "@/domain/pomodoro/stores";
import {displayCurrentPhaseIcon, getNumberOfPomodoro, Phase} from "@/domain/pomodoro/entities/Timer";
import usePomodoroStore from "@/domain/pomodoro/stores";
import {Badge} from "@/components/ui/badge";



const TaskForm = ({form, currentPhase, onSubmit}: {
    form: UseFormReturn<{ task: string }, any, undefined>;
    currentPhase: string;
    onSubmit: () => void;
}) => {
    const {setIsPlaying} = index();
    const {patternIndex} = usePomodoroStore()
    return (
        form &&
        <Form {...form}>
            <form onSubmit={form?.handleSubmit(onSubmit)} className="w-full space-y-6 ">
                <FormField
                    control={form?.control}
                    name="task"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <div className={"flex items-center gap-2"}>
                                    <div className={'flex gap-1'}>
                                        <Badge  variant="solid" className="rounded-lg px-3 py-1.5 bg-secondary text-secondary-foreground">
                                            <p className={'font-bold'}>{getNumberOfPomodoro(patternIndex)}</p>
                                            <p className={'font-light px-1 pl-0.5 opacity-60'}>{'/4'}</p>
                                            <Image src={displayCurrentPhaseIcon(currentPhase)} alt={"icon"} width={50}
                                                   height={50} className={"h-5 w-5 "}/>

                                        </Badge>
                                    </div>

                                    <Input
                                        onChange={(e) => {
                                            field.onChange(e);
                                            setIsPlaying(false);
                                        }}
                                        value={field.value}
                                        className={"border-none bg-gray-50 "}
                                        placeholder="Add a task"
                                    />
                                </div>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
};

export default TaskForm;
