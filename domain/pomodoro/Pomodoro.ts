import {z} from "zod";


export const PomodoroSchema = z.object({
    tasks: z.array(z.object({
        id: z.number(),
        name: z.string(),
        duration: z.number(),
    })),
    patternIndex: z.number(),

    secondsLeft: z.number(),
    isPlaying: z.boolean(),
    formValues: z.object({
        task: z.string(),
    }),
});



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


