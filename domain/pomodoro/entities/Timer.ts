import { z } from "zod";

export const timerSchema = z.object({
    patternIndex: z.number(),
    secondsLeft: z.number(),
    isPlaying: z.boolean(),
    currentPhase: z.string(),
});

export type Timer = z.infer<typeof timerSchema>;

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
