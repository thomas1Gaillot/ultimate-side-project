import index from "@/domain/pomodoro/stores";
import useSound from "@/hooks/use-sound";
import {useEffect} from "react";
import manageTasks from "@/domain/pomodoro/hooks/use-pomodoro/manage-tasks";
import usePomodoroForm from "@/domain/pomodoro/hooks/use-pomodoro/use-pomodoro-form";
import {pomodoroPhases} from "@/domain/pomodoro/entities/Timer";

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

    const {notifyBell} = useSound("/music/notification.mp3");
    const form = usePomodoroForm(formValues, setFormValues);

    const {addTask, deleteTask, updateTaskDuration} = manageTasks(tasks, setTasks, formValues);


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
            const nextIndex = (patternIndex + 1) % pomodoroPhases.length;

            notifyBell();
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
        currentPhase,
        addTask,
        deleteTask,
        secondsLeft,
        isPlaying,
    };
};
