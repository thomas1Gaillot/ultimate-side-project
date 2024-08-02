import {z} from "zod";

export const taskSchema = z.object({
    id: z.number(),
    name: z.string(),
    duration: z.number(),
});

export type Task = z.infer<typeof taskSchema>;