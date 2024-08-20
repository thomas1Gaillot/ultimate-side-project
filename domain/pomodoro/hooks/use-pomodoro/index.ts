import { useEffect, useRef, useState } from "react";
import usePomodoroStore from "@/domain/pomodoro/stores";
import useSound from "@/hooks/use-sound";
import manageTasks from "@/domain/pomodoro/hooks/use-pomodoro/manage-tasks";
import { pomodoroPhases } from "@/domain/pomodoro/entities/Timer";
import { managePhase } from "@/domain/pomodoro/hooks/use-pomodoro/manage-phase";
import { UseFormReturn } from "react-hook-form";
import { CreateTask } from "@/domain/pomodoro/entities/Task";

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

    const { play: notifyBell } = useSound("/music/notification.mp3");

    const {
        addTask,
        deleteTask,
        retimeTask,
        updateCurrentTaskDuration,
        redoTask,
        renameTask
    } = manageTasks(tasks, setTasks, form);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const startTimeRef = useRef<number | null>(null);

    const updateTimer = () => {
        if (!isPlaying || startTimeRef.current === null) return;

        const elapsedTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
        const newSecondsLeft = Math.max(0, secondsLeft - elapsedTime);

        setSecondsLeft(newSecondsLeft);
        updateCurrentTaskDuration(elapsedTime);

        if (newSecondsLeft <= 0) {
            handlePhaseCompletion();
        }
    };

    const handlePhaseCompletion = () => {
        notifyBell();

        const nextIndex = (patternIndex + 1) % pomodoroPhases.length;
        setPatternIndex(nextIndex);
        setSecondsLeft(pomodoroPhases[nextIndex].duration);
        setIsPlaying(false);

        managePhase({
            type: pomodoroPhases[nextIndex].type,
            setCurrentPhase,
            setFormValue: form.setValue,
        });
    };

    useEffect(() => {
        if (isPlaying) {
            startTimeRef.current = Date.now();
            timerRef.current = setInterval(updateTimer, 1000);
        } else if (timerRef.current) {
            clearInterval(timerRef.current);
            startTimeRef.current = null; // Reset the start time when paused
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isPlaying]);

    useEffect(() => {
        if (secondsLeft === 0 && isPlaying) {
            handlePhaseCompletion();
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
        retimeTask
    };
};
