import { Card } from "@/components/ui/card";
import Head from "next/head";
import { Separator } from "@/components/ui/separator";
import { formatSecondsToMmss } from "@/lib/format-seconds-to-mmss";
import { formatStringToXChar } from "@/lib/format-string-to-X-char";
import { usePomodoro } from "@/hooks/usePomodoro";
import { useTasks } from "@/hooks/useTasks";
import { usePomodoroStats } from "@/hooks/usePomodoroStats";
import Timer from "@/pages/pomodoro/components/Timer";
import PomodoroStats from "@/pages/pomodoro/components/PomodoroStats";
import TaskForm from "@/pages/pomodoro/components/TaskForm";
import TimerControls from "@/pages/pomodoro/components/TimerControls";
import TaskList from "@/pages/pomodoro/components/TaskList";

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

    return (
        <>
            <Head>
                <title>{`${formatSecondsToMmss(secondsLeft)} 🍅 - ${formatStringToXChar(tasks[tasks.length - 1]?.name, 20)} `}</title>
                <meta name="description" content="Building Things front-end side" />
                <link rel="icon" href="/public/avocado.ico" />
            </Head>
            <Card className={"p-4 py-2 flex flex-col gap-4"}>
                <TaskForm form={form} currentPhase={currentPhase} onSubmit={onSubmit} />
                <Timer secondsLeft={secondsLeft} />
                <div className={"flex w-full justify-between items-center gap-4 md:gap-16"}>
                    <PomodoroStats pomodoro={numberOfPomodoro} shortBreak={numberOfShortBreak} longBreak={numberOfLongBreak} />
                    <TimerControls
                        isPlaying={isPlaying}
                        form={form}
                        onSubmit={onSubmit}
                        reset={reset}
                    />
                </div>
            </Card>
            <TaskList tasks={tasks} deleteTask={deleteTask} />
        </>
    );
}
