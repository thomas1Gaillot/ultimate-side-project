import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Timer from "@/pages/pomodoro/components/Timer";
import PomodoroStats from "@/pages/pomodoro/components/PomodoroStats";
import { Button } from "@/components/ui/button";
import { PauseIcon, PlayIcon, TrashIcon, Undo2 } from "lucide-react";
import Head from "next/head";
import { Separator } from "@/components/ui/separator";
import { TypographySmall } from "@/components/ui/typography";
import { formatSecondsToMmss } from "@/lib/format-seconds-to-mmss";
import { formatStringToXChar } from "@/lib/format-string-to-X-char";
import { usePomodoro } from "@/hooks/usePomodoro";
import { useTasks } from "@/hooks/useTasks";
import { usePomodoroStats } from "@/hooks/usePomodoroStats";

export default function PomodoroWidget() {
    const { tasks, form, addTask, deleteTask, updateTaskDuration } = useTasks();

    const { numberOfPomodoro, numberOfShortBreak, numberOfLongBreak } = usePomodoroStats(tasks);

    const handlePhaseChange = (type: string) => {
        switch (type) {
            case 'work':
                form.setValue("task", "new task");
                break;
            case 'break':
                form.setValue("task", "5 min break");
                break;
            case 'longBreak':
                form.setValue("task", "15 min break");
                break;
            default:
                form.setValue("task", "");
        }
    };

    const {
        secondsLeft,
        isPlaying,
        togglePlayPause,
        reset,
        currentPhase,
    } = usePomodoro(handlePhaseChange, updateTaskDuration);

    const onSubmit = () => {
        togglePlayPause();
        if (!isPlaying) {
            addTask(form.getValues("task"));
        }
    };

    function currentPhaseIcon(type: string) {
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

    return (
        <>
            <Head>
                <title>{`${formatSecondsToMmss(secondsLeft)} 🍅 - ${formatStringToXChar(tasks[tasks.length - 1]?.name, 20)} `}</title>
                <meta name="description" content="Building Things front-end side" />
                <link rel="icon" href="/avocado.ico" />
            </Head>
            <Card className={"p-4 py-2 flex flex-col gap-4"}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 ">
                        <FormField
                            control={form.control}
                            name="task"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className={"flex items-center gap-2"}>
                                            <Image src={currentPhaseIcon(currentPhase)} alt={"icon"} width={50} height={50} className={"h-5 w-5 "} />
                                            <Input className={"border-none bg-gray-50 "} placeholder="Add a task" {...field} />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Timer secondsLeft={secondsLeft} />
                        <div className={"flex w-full justify-between items-center gap-4 md:gap-16"}>
                            <PomodoroStats pomodoro={numberOfPomodoro} shortBreak={numberOfShortBreak} longBreak={numberOfLongBreak} />
                            <div className={"flex gap-2 items-center "}>
                                <Button onClick={form.handleSubmit(onSubmit)} variant={"default"} disabled={!form.watch("task")} className={"px-6"}>
                                    {isPlaying ? <PauseIcon size={24} className={"cursor-pointer text-gray-50 "} /> : <PlayIcon size={24} className={"cursor-pointer text-gray-50 "} />}
                                </Button>
                                <Button onClick={reset} variant={"outline"} className={"px-2"}>
                                    <Undo2 size={24} className={"cursor-pointer text-gray-700 "} />
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>
            </Card>
            <Separator className={"my-7 w-[150px]"} />
            <div className="grid gap-2 w-full">
                {tasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between gap-8 bg-muted rounded-md pr-2 pl-4 py-1">
                        <TypographySmall>{task.name}</TypographySmall>
                        <div className="flex items-center gap-2">
                            <TypographySmall>{formatSecondsToMmss(task.duration)}</TypographySmall>
                            <Button variant="outline" size="icon" onClick={() => deleteTask(task.id)}>
                                <TrashIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
