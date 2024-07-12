'use client'
import {Card} from "@/components/ui/card";
import {usePomodoro} from "@/domain/pomodoro/use-pomodoro";
import {usePomodoroStats} from "@/domain/pomodoro/use-pomodoro-stats";
import Timer from "@/app/(locale)/pomodoro/components/Timer";
import PomodoroStats from "@/app/(locale)/pomodoro/components/PomodoroStats";
import TaskForm from "@/app/(locale)/pomodoro/components/TaskForm";
import TimerControls from "@/app/(locale)/pomodoro/components/TimerControls";
import TaskList from "@/app/(locale)/pomodoro/components/TaskList";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Thomas Gaillot",
    description: "Building Things front-end side",
    icons: {
        icon: "/avocado.ico",
    },
};

export default function PomodoroWidget() {
    const {
        tasks, form, addTask, deleteTask, updateTaskDuration, secondsLeft,
        isPlaying,
        togglePlayPause,
        reset,
        currentPhase
    } = usePomodoro();
    const {numberOfPomodoro, numberOfShortBreak, numberOfLongBreak} = usePomodoroStats(tasks);


    const onSubmit = () => {
        togglePlayPause();
        if (!isPlaying) {
            addTask(form.getValues("task"));
        }
    };

    return (
        <div className={"max-w-2xl"}>
            <Card className={"p-4 py-2 flex flex-col gap-4 "}>
                <TaskForm form={form} currentPhase={currentPhase} onSubmit={onSubmit}/>
                <Timer secondsLeft={secondsLeft}/>
                <div className={"flex w-full justify-between items-center gap-4 md:gap-16"}>
                    <PomodoroStats pomodoro={numberOfPomodoro} shortBreak={numberOfShortBreak}
                                   longBreak={numberOfLongBreak}/>
                    <TimerControls
                        isPlaying={isPlaying}
                        form={form}
                        onSubmit={onSubmit}
                        reset={reset}
                    />
                </div>
            </Card>
            <TaskList tasks={tasks} deleteTask={deleteTask} currentTask={form.getValues('task')}/>
        </div>
    );
}
