import {Card} from "@/components/ui/card";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import Image from "next/image";
import {Input} from "@/components/ui/input";
import Timer from "@/pages/pomodoro/components/Timer";
import PomodoroStats from "@/pages/pomodoro/components/PomodoroStats";
import {Button} from "@/components/ui/button";
import {PauseIcon, PlayIcon, TrashIcon, Undo2} from "lucide-react";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {Separator} from "@/components/ui/separator";
import {TypographySmall} from "@/components/ui/typography";
import {formatSecondsToMmss} from "@/lib/format-seconds-to-mmss";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;

const FormSchema = z.object({
    task: z.string().min(2, {
        message: "Task is required.",
    }),
})

type Task = {
    id: number;
    name: string;
    duration: number;
}

export default function PomodoroWidget() {
    const [secondsLeft, setSecondsLeft] = useState(25 * 60);

    const [numberOfPomodoro, setNumberOfPomodoro] = useState(0)
    const [numberOfShortBreak, setNumberOfShortBreak] = useState(0)
    const [numberOfLongBreak, setNumberOfLongBreak] = useState(0)
    const [resetTimer, setResetTimer] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false)
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        if (secondsLeft > 0 && isPlaying) {
            const timerId = setInterval(() => {
                setSecondsLeft(secondsLeft - 1);
                setTasks((prevTasks) => prevTasks.map((task) => {
                    if (task.name === form.getValues('task')) {
                        return {
                            ...task,
                            duration: task.duration + 1
                        }
                    }
                    return {
                        ...task,
                        duration: task.duration === 0 ? 25 * 60 : task.duration
                    }
                }))
            }, 1000);

            return () => clearInterval(timerId); // Cleanup interval on component unmount
        }
    }, [secondsLeft, isPlaying]);

    const handleDeleteTask = (id: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id))
        setNumberOfPomodoro(prev => prev - 1)
    }
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            task: "",
        },
    })

    function onSubmit() {
        setIsPlaying(prev => !prev)
        const thisTaskDoesntExist = tasks.every(task => task.name !== form.getValues('task'))
        if (!isPlaying && thisTaskDoesntExist) {
            setTasks((prevTasks) => [
                ...prevTasks,
                {
                    id: Math.random(),
                    name: form.getValues('task'),
                    duration: 0
                }
            ])
            setNumberOfPomodoro(prev => prev + 1)
        }
    }

    const reset = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setResetTimer(true); // Change the reset key to trigger the timer reset
        setIsPlaying(false);
    };

    return <>
        <Card className={'p-4 py-2 flex flex-col gap-4'}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 ">
                    <FormField
                        control={form.control}
                        name="task"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <div className={"flex items-center gap-2"}>
                                        <Image src={'/tomato.svg'} alt={'tomato'} width={50} height={50}
                                               className={'h-5 w-5 '}/>
                                        <Input className={"border-none bg-gray-50 "}
                                               placeholder="Add a task"  {...field} />
                                    </div>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Timer secondsLeft={secondsLeft}
                           setSecondsLeft={setSecondsLeft}
                           resetTimer={resetTimer} setResetTimer={setResetTimer}/>
                    <div className={"flex w-full justify-between items-center gap-4 md:gap-16"}>
                        <PomodoroStats pomodoro={numberOfPomodoro} shortBreak={numberOfShortBreak}
                                       longBreak={numberOfLongBreak}/>
                        <div className={"flex gap-2 items-center "}>
                            <Button onClick={() => submit}
                                    variant={'default'}
                                    disabled={!form.watch('task')}
                                    className={'px-6'}>
                                {isPlaying ? <PauseIcon size={24} className={"cursor-pointer text-gray-50 "}/>
                                    : <PlayIcon size={24} className={"cursor-pointer text-gray-50 "}/>}
                            </Button>
                            <Button onClick={reset} variant={'outline'} className={'px-2'}>
                                <Undo2 size={24} className={"cursor-pointer text-gray-700 "}/>
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </Card>
        <Separator className={'my-7 w-[150px]'}/>
        <div className="grid gap-2 w-full">
            {tasks.map((task) => (
                <div key={task.id}
                     className="flex items-center justify-between gap-8 bg-muted rounded-md pr-2 pl-4 py-1">
                    <TypographySmall>{task.name}</TypographySmall>

                    <div className="flex items-center gap-2">
                        <TypographySmall>{formatSecondsToMmss(task.duration)}</TypographySmall>
                        <Button variant="outline" size="icon" onClick={() => handleDeleteTask(task.id)}>
                            <TrashIcon className="w-4 h-4"/>
                        </Button>
                    </div>

                </div>
            ))}
        </div>
    </>

}