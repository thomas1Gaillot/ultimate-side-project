import {z} from "zod";

export const taskSchema = z.object({
    id: z.number(),
    name: z.string(),
    duration: z.number(),
});

export type TaskSchema = z.infer<typeof taskSchema>;