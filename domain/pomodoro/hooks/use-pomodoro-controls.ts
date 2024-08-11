import { pomodoroPhases } from "@/domain/pomodoro/entities/Timer";
import usePomodoroStore from "@/domain/pomodoro/stores";
import {managePhase} from "@/domain/pomodoro/hooks/use-pomodoro/manage-phase";
import {UseFormReturn} from "react-hook-form";
import {CreateTask} from "@/domain/pomodoro/entities/Task";

export const usePomodoroControls = (form:  UseFormReturn<CreateTask>) => {

    const { setSecondsLeft, setIsPlaying, patternIndex, isPlaying, setPatternIndex, setCurrentPhase } = usePomodoroStore()
    const togglePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    const resetTimer = (e: any) => {
        e.preventDefault();
        setSecondsLeft(pomodoroPhases[patternIndex].duration);
        setIsPlaying(false);
    };

    const resetPomodoro = (e:any) => {
        const patternReset = 0;
        setPatternIndex(patternReset);
        setSecondsLeft(pomodoroPhases[patternReset].duration)
        setIsPlaying(false);
        managePhase({
            type: pomodoroPhases[patternReset].type,
            setCurrentPhase,
            setFormValue: form.setValue,
        });
    }
    return {
        togglePlayPause,
        resetTimer,
        resetPomodoro
    };
};
