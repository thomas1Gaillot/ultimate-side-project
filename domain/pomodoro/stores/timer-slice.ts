import {pomodoroPhases} from "@/domain/pomodoro/entities/Timer";

export interface TimerSlice {
    patternIndex: number;
    setPatternIndex: (patternIndex: number) => void;
    secondsLeft: number;
    setSecondsLeft: (secondsLeft: number) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    currentPhase: string;
    setCurrentPhase: (phase: string) => void;
}

export const createTimerSlice = (set: any): TimerSlice => ({
    patternIndex: 0,
    setPatternIndex: (patternIndex: number) => {
        const phase = pomodoroPhases[patternIndex].type;
        set({ patternIndex, currentPhase: phase });
    },
    secondsLeft: pomodoroPhases[0].duration,
    setSecondsLeft: (secondsLeft: number) => set({ secondsLeft }),
    isPlaying: false,
    setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
    currentPhase: pomodoroPhases[0].type,
    setCurrentPhase: (phase: string) => set({ currentPhase: phase }),
});
