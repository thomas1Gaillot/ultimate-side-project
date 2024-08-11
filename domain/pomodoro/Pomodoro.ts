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


export type Pomodoro = z.infer<typeof PomodoroSchema>;


export const pomodoroPhases = [
    {type: 'work', duration: 25 * 60},
    {type: 'break', duration: 5 * 60},
    {type: 'work', duration: 25 * 60},
    {type: 'break', duration: 5 * 60},
    {type: 'work', duration: 25 * 60},
    {type: 'break', duration: 5 * 60},
    {type: 'work', duration: 25 * 60},
    {type: 'longBreak', duration: 15 * 60},
];


