import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import usePomodoroStore from "@/domain/pomodoro/use-pomodoro-store";
import { useEffect } from "react";
import useSound from "@/hooks/use-sound";
import { pomodoroPattern } from "@/domain/pomodoro/Pomodoro";

const FormSchema = z.object({
    task: z.string().min(2, {
        message: "Task is required.",
    }),
});

export const usePomodoro = () => {
    const { tasks, setTasks, formValues, setFormValues, setSecondsLeft, setPatternIndex, setIsPlaying, patternIndex, secondsLeft, isPlaying } = usePomodoroStore();
    const { play } = useSound("/music/notification.mp3");

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: formValues,
    });
    form.watch((values) => {
        if (!values.task) return;
        const newValues = {
            task: values.task
        };
        setFormValues(newValues);
    });

    useEffect(() => {
        if (secondsLeft > 0 && isPlaying) {
            const timerId = setInterval(() => {
                setSecondsLeft(secondsLeft - 1);
                updateTaskDuration(1); // Update task duration by 1 second
            }, 1000);

            return () => clearInterval(timerId); // Cleanup interval on component unmount
        } else if (secondsLeft === 0) {
            play();
            const nextIndex = (patternIndex + 1) % pomodoroPattern.length;
            setPatternIndex(nextIndex);
            setSecondsLeft(pomodoroPattern[nextIndex].duration);
            setIsPlaying(false);
            handlePhaseChange(pomodoroPattern[nextIndex].type);
        }
    }, [secondsLeft, isPlaying]);


    const addTask = (taskName: string) => {
        const taskExists = tasks.some((task) => task.name === taskName);
        if (!taskExists) {
            setTasks([
                {
                    id: Math.random(),
                    name: taskName,
                    duration: 0,
                },
                ...tasks,
            ]);
        }
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const updateTaskDuration = (duration: number) => {
        const newtasks = tasks.map((task) => {
            if (task.name === formValues.task) {
                return {
                    ...task,
                    duration: task.duration + duration,
                };
            }
            return task;
        })
        setTasks(newtasks)
    };

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



    const togglePlayPause = () => setIsPlaying(!isPlaying);

    const reset = (e: any) => {
        e.preventDefault();
        setSecondsLeft(pomodoroPattern[patternIndex].duration);
        setIsPlaying(false);
    };

    return {
        tasks,
        form,
        formValues,
        addTask,
        deleteTask,
        updateTaskDuration,
        handlePhaseChange,
        secondsLeft,
        isPlaying,
        togglePlayPause,
        reset,
        currentPhase: pomodoroPattern[patternIndex].type,
    };
};
