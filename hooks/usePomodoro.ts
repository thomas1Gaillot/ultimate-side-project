import {useEffect, useState} from "react";
import useSound from "@/hooks/useSound";
import {pomodoroPattern} from "@/domain/pomodoro/Pomodoro";
import usePomodoroStore from "./usePomodoroStore";


/**
 * Custom hook to manage the Pomodoro timer
 * @param onPhaseChange
 * @param updateTaskDuration
 */

export const usePomodoro = (onPhaseChange: (type: string) => void, updateTaskDuration: (duration: number) => void) => {
    const {play} = useSound("/ding.mp3");
    const {setSecondsLeft, setPatternIndex, setIsPlaying, patternIndex, secondsLeft, isPlaying} = usePomodoroStore();

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
            onPhaseChange(pomodoroPattern[nextIndex].type);
        }
    }, [secondsLeft, isPlaying]);

    const togglePlayPause = () => setIsPlaying(!isPlaying);

    const reset = (e: any) => {
        e.preventDefault();
        setSecondsLeft(pomodoroPattern[patternIndex].duration);
        setIsPlaying(false)
    };

    return {
        secondsLeft,
        isPlaying,
        togglePlayPause,
        reset,
        currentPhase: pomodoroPattern[patternIndex].type,
    };
};
