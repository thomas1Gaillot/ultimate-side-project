import {z} from "zod";
import {taskSchema} from "@/domain/pomodoro/Task";
import {timerSchema} from "@/domain/pomodoro/Timer";
import {formSchema} from "@/domain/pomodoro/Form";


export const PomodoroSchema = z.object({
    tasks: z.array(taskSchema),
    ...timerSchema.shape,
    ...formSchema.shape,
});

export type Pomodoro = z.infer<typeof PomodoroSchema>;





