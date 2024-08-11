import usePomodoroStore from "@/domain/pomodoro/stores";
import useSound from "@/hooks/use-sound";
import {useEffect} from "react";
import manageTasks from "@/domain/pomodoro/hooks/use-pomodoro/manage-tasks";
import {pomodoroPhases} from "@/domain/pomodoro/entities/Timer";
import {managePhase} from "@/domain/pomodoro/hooks/use-pomodoro/manage-phase";
import {UseFormReturn} from "react-hook-form";
import {CreateTask} from "@/domain/pomodoro/entities/Task";

export const usePomodoro = (form: UseFormReturn<CreateTask>) => {
    const {
        tasks,
        setTasks,
        setSecondsLeft,
        setPatternIndex,
        setIsPlaying,
        patternIndex,
        secondsLeft,
        isPlaying,
        currentPhase,
        setCurrentPhase,
    } = usePomodoroStore();

    const {play: notifyBell} = useSound("/music/notification.mp3");

    const {addTask, deleteTask, updateTaskDuration, redoTask, renameTask} = manageTasks(tasks, setTasks, form);


    useEffect(() => {
        if (secondsLeft > 0 && isPlaying) {
            const timerId = setInterval(() => {
                setSecondsLeft(secondsLeft - 1);
                updateTaskDuration(1); // Update task-pomodoro-widget duration by 1 second
            }, 1000);

            return () => clearInterval(timerId); // Cleanup interval on component unmount
        } else if (secondsLeft === 0) {
            const nextIndex = (patternIndex + 1) % pomodoroPhases.length;

            notifyBell();
            setPatternIndex(nextIndex);
            setSecondsLeft(pomodoroPhases[nextIndex].duration);
            setIsPlaying(false);
            managePhase({
                type: pomodoroPhases[nextIndex].type,
                setCurrentPhase,
                setFormValue: form.setValue,
            });
        }
    }, [secondsLeft, isPlaying]);

    return {
        tasks,
        form,
        currentPhase,
        addTask,
        deleteTask,
        renameTask,
        redoTask,
        secondsLeft,
        isPlaying,
    };
};
