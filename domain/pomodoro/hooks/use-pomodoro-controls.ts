import { pomodoroPhases } from "@/domain/pomodoro/entities/Timer";
import usePomodoroStore from "@/domain/pomodoro/stores";

export const usePomodoroControls = () => {

    const { setSecondsLeft, setIsPlaying, patternIndex, isPlaying } = usePomodoroStore()
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const reset = (e: any) => {
        e.preventDefault();
        setSecondsLeft(pomodoroPhases[patternIndex].duration);
        setIsPlaying(false);
    };

    return {
        togglePlayPause,
        reset,
    };
};
