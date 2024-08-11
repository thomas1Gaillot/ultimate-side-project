import {z} from "zod";

export const taskSchema = z.object({
    id: z.number(),
    name: z.string(),
    duration: z.number(),
});

export type Task = z.infer<typeof taskSchema>;


export const createTaskSchema = z.object({
    task: z.string().min(2, {
        message: "Task is required.",
    }),
});
export type CreateTask = z.infer<typeof createTaskSchema>;
