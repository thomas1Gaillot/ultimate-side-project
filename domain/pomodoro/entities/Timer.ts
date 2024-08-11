import { z } from "zod";
export const PhaseEnum = z.enum(['work', 'break', 'longBreak']);
export const timerSchema = z.object({
    patternIndex: z.number(),
    secondsLeft: z.number(),
    isPlaying: z.boolean(),
    currentPhase: PhaseEnum,
});

export type Timer = z.infer<typeof timerSchema>;
export type Phase = z.infer<typeof PhaseEnum>;
export const pomodoroPhases = [
    {type: PhaseEnum.enum.work, duration: 25*60},
    {type: PhaseEnum.enum.break, duration: 5*60},
    {type: PhaseEnum.enum.work, duration: 25*60},
    {type: PhaseEnum.enum.break, duration: 5*60},
    {type: PhaseEnum.enum.work, duration: 25*60},
    {type: PhaseEnum.enum.break, duration: 5*60},
    {type: PhaseEnum.enum.work, duration: 25*60},
    {type: PhaseEnum.enum.longBreak, duration: 15*60},
];
