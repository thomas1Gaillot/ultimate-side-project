import {create} from "zustand";
import {persist} from "zustand/middleware";
import {createTaskSlice, TaskSlice} from "./task-slice";
import {createTimerSlice, TimerSlice} from "./timer-slice";

interface PomodoroState extends TaskSlice, TimerSlice {
}

const usePomodoroStore = create(
    persist(
        (set: (partial: Partial<PomodoroState>) => void) => ({
            ...createTaskSlice(set),
            ...createTimerSlice(set),
        }),
        {
            name: 'pomodoro-store', // unique name for the storage
        }
    )
);

export default usePomodoroStore;
