import { useEffect, useState } from "react";

const pomodoroPattern = [
    { type: 'work', duration: 25 * 60 },
    { type: 'break', duration: 5 * 60 },
    { type: 'work', duration: 25 * 60 },
    { type: 'break', duration: 5 * 60 },
    { type: 'work', duration: 25 * 60 },
    { type: 'break', duration: 5 * 60 },
    { type: 'work', duration: 25 * 60 },
    { type: 'longBreak', duration: 15 * 60 },
];
/**
 * Custom hook to manage the Pomodoro timer
 * @param onPhaseChange
 * @param updateTaskDuration
 */

export const usePomodoro = (onPhaseChange: (type: string) => void, updateTaskDuration: (duration: number) => void) => {
    const [patternIndex, setPatternIndex] = useState(0);
    const [secondsLeft, setSecondsLeft] = useState(pomodoroPattern[0].duration);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        if (secondsLeft > 0 && isPlaying) {
            const timerId = setInterval(() => {
                setSecondsLeft((prev) => prev - 1);
                if (pomodoroPattern[patternIndex].type === 'work') {
                    updateTaskDuration(1); // Update task duration by 1 second
                }
            }, 1000);

            return () => clearInterval(timerId); // Cleanup interval on component unmount
        } else if (secondsLeft === 0) {
            const nextIndex = (patternIndex + 1) % pomodoroPattern.length;
            setPatternIndex(nextIndex);
            setSecondsLeft(pomodoroPattern[nextIndex].duration);
            setIsPlaying(false);
            onPhaseChange(pomodoroPattern[nextIndex].type);
        }
    }, [secondsLeft, isPlaying]);

    const togglePlayPause = () => setIsPlaying((prev) => !prev);

    const reset = (e: any) => {
        e.preventDefault();
        setSecondsLeft(pomodoroPattern[patternIndex].duration);
        togglePlayPause();
    };

    return {
        secondsLeft,
        isPlaying,
        togglePlayPause,
        reset,
        currentPhase: pomodoroPattern[patternIndex].type,
    };
};
