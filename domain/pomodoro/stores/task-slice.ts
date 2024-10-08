import {Task} from "@/domain/pomodoro/entities/Task";

export interface TaskSlice {
    tasks: Task[];
    setTasks: (tasks: Task[]) => void;
}

export const createTaskSlice = (set:any): TaskSlice => ({
    tasks: [],
    setTasks: (tasks: Task[]) => set({ tasks }),
});
