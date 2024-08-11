import {z} from "zod";
import {taskSchema} from "@/domain/pomodoro/entities/Task";
import {timerSchema} from "@/domain/pomodoro/entities/Timer";
import {formSchema} from "@/domain/pomodoro/entities/Form";


export const PomodoroSchema = z.object({
    tasks: z.array(taskSchema),
    ...timerSchema.shape,
    ...formSchema.shape,
});

export type Pomodoro = z.infer<typeof PomodoroSchema>;





