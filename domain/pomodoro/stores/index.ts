import {create} from "zustand";
import {persist, PersistOptions} from "zustand/middleware";
import {createTaskSlice, TaskSlice} from "./task-slice";
import {createTimerSlice, TimerSlice} from "./timer-slice";
import {Pomodoro} from "@/domain/pomodoro/entities/Pomodoro";

interface PomodoroState extends TaskSlice, TimerSlice {
}

const usePomodoroStore = create(
    persist(
        (set) => ({
            ...createTaskSlice(set),
            ...createTimerSlice(set),
        }),
        {
            name: 'pomodoro-store', // unique name for the storage
        } as PersistOptions<Pomodoro>
    )
);

export default usePomodoroStore;
