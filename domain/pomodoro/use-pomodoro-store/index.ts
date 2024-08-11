import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { createTaskSlice, TaskSlice } from "./task-slice";
import { createTimerSlice, TimerSlice } from "./timer-slice";
import { createFormSlice, FormSlice } from "./form-slice";
import {Pomodoro} from "@/domain/pomodoro/Pomodoro";

interface PomodoroState extends TaskSlice, TimerSlice, FormSlice {}

const index = create(
    persist(
        (set) => ({
            ...createTaskSlice(set),
            ...createTimerSlice(set),
            ...createFormSlice(set),
        }),
        {
            name: 'pomodoro-store', // unique name for the storage
        } as PersistOptions<Pomodoro>
    )
);

export default index;
