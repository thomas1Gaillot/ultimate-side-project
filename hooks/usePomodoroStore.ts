import {create} from "zustand";
import {Task} from "@/domain/pomodoro/Task";
import {pomodoroPattern} from "@/domain/pomodoro/Pomodoro";
import {persist, PersistOptions} from "zustand/middleware";
import {createJSONStorage} from "zustand/middleware";


interface PomodoroState {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
    patternIndex: number;
    setPatternIndex: (patternIndex: number) => void;
    secondsLeft: number;
    setSecondsLeft: (secondsLeft: number) => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    formValues: { task: string };
    setFormValues: (values: { task: string }) => void;
}

const usePomodoroStore = create(
    persist(
        (set, get) => ({
            tasks: [],
            setTasks: (tasks: Task[]) => set({tasks}),
            patternIndex: 0,
            setPatternIndex: (patternIndex: number) => set({patternIndex}),
            secondsLeft: pomodoroPattern[0].duration,
            setSecondsLeft: (secondsLeft: number) => set({secondsLeft}),
            isPlaying: false,
            setIsPlaying: (isPlaying: boolean) => set({isPlaying}),
            formValues: {task: ''},
            setFormValues: (values: { task: string }) => set({formValues: values}),
        }),
        {
            name: 'pomodoro-store', // unique name for the storage,
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        } as PersistOptions<PomodoroState> // Type assertion for PersistOptions
    )
);

export default usePomodoroStore;




