'use client'
import {Card, CardContent, CardFooter, CardHeader} from "@/components/ui/card";
import {usePomodoro} from "../../../domain/pomodoro/hooks/use-pomodoro";
import {usePomodoroStats} from "@/domain/pomodoro/hooks/use-pomodoro-stats";
import Timer from "@/app/(locale)/pomodoro/components/Timer";
import PomodoroStats from "@/app/(locale)/pomodoro/components/PomodoroStats";
import TaskForm from "@/app/(locale)/pomodoro/components/TaskForm";
import TimerControls from "@/app/(locale)/pomodoro/components/TimerControls";
import {Metadata} from "next";
import {usePomodoroControls} from "@/domain/pomodoro/hooks/use-pomodoro-controls";
import {UseFormReturn} from "react-hook-form";
import {CreateTask} from "@/domain/pomodoro/entities/Task";

export const metadata: Metadata = {
    title: "Thomas Gaillot",
    description: "Building Things front-end side",
    icons: {
        icon: "/avocado.ico",
    },
};

export default function PomodoroWidget({form}: { form: UseFormReturn<CreateTask> }) {
    const {
        addTask, secondsLeft,
        isPlaying,
        currentPhase
    } = usePomodoro(form);
    const {togglePlayPause, resetTimer, resetPomodoro} = usePomodoroControls(form);
    const {numberOfPomodoro, numberOfShortBreak, numberOfLongBreak} = usePomodoroStats();


    const onSubmit = () => {
        togglePlayPause();
        if (!isPlaying) {
            addTask(form.getValues("task"));
        }
    };

    return (
        <Card>
            <CardHeader>
                <TaskForm form={form} currentPhase={currentPhase} onSubmit={onSubmit}/>
            </CardHeader>
            <CardContent>
                <Timer secondsLeft={secondsLeft}/>
            </CardContent>
            <CardFooter className={'w-full flex justify-between gap-4 md:gap-16'}>
                <PomodoroStats pomodoro={numberOfPomodoro} shortBreak={numberOfShortBreak}
                               longBreak={numberOfLongBreak}/>
                <TimerControls
                    isPlaying={isPlaying}
                    form={form}
                    onSubmit={onSubmit}
                    reset={resetTimer}
                    resetPomodoro={resetPomodoro}
                />
            </CardFooter>
        </Card>
    );
}
