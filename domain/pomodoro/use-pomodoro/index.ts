import index from "@/domain/pomodoro/use-pomodoro-store";
import useSound from "@/hooks/use-sound";
import { pomodoroPhases } from "@/domain/pomodoro/Pomodoro";
import { useEffect } from "react";
import managePomodoroTasks from "@/domain/pomodoro/use-pomodoro/manage-pomodoro-tasks";
import usePomodoroForm from "@/domain/pomodoro/use-pomodoro/use-pomodoro-form";

export const usePomodoro = () => {
    const {
        tasks,
        setTasks,
        formValues,
        setFormValues,
        setSecondsLeft,
        setPatternIndex,
        setIsPlaying,
        patternIndex,
        secondsLeft,
        isPlaying,
        currentPhase,
        setCurrentPhase,
    } = index();

    const { play } = useSound("/music/notification.mp3");
    const form = usePomodoroForm(formValues, setFormValues);

    const { addTask, deleteTask, updateTaskDuration } = managePomodoroTasks(tasks, setTasks, formValues);

    const controls = {
        togglePlayPause: () => setIsPlaying(!isPlaying),
        reset: (e: any) => {
            e.preventDefault();
            setSecondsLeft(pomodoroPhases[patternIndex].duration);
            setIsPlaying(false);
        },
    };

    const phaseManagement = {
        handlePhaseChange: (type: string) => {
            setCurrentPhase(type); // Update the current phase in the store
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
        },
    };

    useEffect(() => {
        if (secondsLeft > 0 && isPlaying) {
            const timerId = setInterval(() => {
                setSecondsLeft(secondsLeft - 1);
                updateTaskDuration(1); // Update task duration by 1 second
            }, 1000);

            return () => clearInterval(timerId); // Cleanup interval on component unmount
        } else if (secondsLeft === 0) {
            play();
            const nextIndex = (patternIndex + 1) % pomodoroPhases.length;
            setPatternIndex(nextIndex);
            setSecondsLeft(pomodoroPhases[nextIndex].duration);
            setIsPlaying(false);
            phaseManagement.handlePhaseChange(pomodoroPhases[nextIndex].type);
        }
    }, [secondsLeft, isPlaying]);

    return {
        tasks,
        form,
        formValues,
        ...controls,
        currentPhase,
        addTask,
        deleteTask,
        updateTaskDuration,
        secondsLeft,
        isPlaying,
    };
};
