import { create } from "zustand";
import { Task } from "@/domain/pomodoro/Task";
import { pomodoroPhases } from "@/domain/pomodoro/Pomodoro";
import { persist, PersistOptions } from "zustand/middleware";

interface TaskSlice {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

interface TimerSlice {
    patternIndex: number;
    setPatternIndex: (patternIndex: number) => void;
    secondsLeft: number;
    setSecondsLeft: (secondsLeft: number) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    currentPhase: string;
    setCurrentPhase: (phase: string) => void;
}

interface FormSlice {
    formValues: { task: string };
    setFormValues: (values: { task: string }) => void;
}

// Task Slice
const createTaskSlice = (set: any): TaskSlice => ({
    tasks: [],
    setTasks: (tasks: Task[]) => set({ tasks }),
});

// Timer Slice
const createTimerSlice = (set: any): TimerSlice => ({
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

// Form Slice
const createFormSlice = (set: any): FormSlice => ({
    formValues: { task: '' },
    setFormValues: (values: { task: string }) => set({ formValues: values }),
});


interface PomodoroState extends TaskSlice, TimerSlice, FormSlice {}

const usePomodoroStore = create(
    persist(
        (set) => ({
            ...createTaskSlice(set),
            ...createTimerSlice(set),
            ...createFormSlice(set),
        }),
        {
            name: 'pomodoro-store', // unique name for the storage,
        } as PersistOptions<PomodoroState>
    )
);

export default usePomodoroStore;
