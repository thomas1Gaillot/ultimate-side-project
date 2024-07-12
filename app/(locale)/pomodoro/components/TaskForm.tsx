'use client'
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import {UseFormReturn} from "react-hook-form";
import usePomodoroStore from "@/domain/pomodoro/use-pomodoro-store";

function displayCurrentPhaseIcon(type: string) {
    switch (type) {
        case 'work':
            return '/tomato.svg';
        case 'break':
            return '/teapot.svg';
        case 'longBreak':
            return '/beer.svg';
        default:
            return '/tomato.svg';
    }
}

const TaskForm = ({form, currentPhase, onSubmit}: {
    form: UseFormReturn<{ task: string }, any, undefined>;
    currentPhase: string;
    onSubmit: () => void;
}) => {
    const {setIsPlaying} = usePomodoroStore();
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
                                    <Image src={displayCurrentPhaseIcon(currentPhase)} alt={"icon"} width={50}
                                           height={50} className={"h-5 w-5 "}/>
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
