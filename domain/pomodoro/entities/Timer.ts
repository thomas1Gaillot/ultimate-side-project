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

export const getNumberOfPomodoro = (patternIndex: number) => {
    return Math.floor(patternIndex / 2) + 1 ;

}
export function displayCurrentPhaseIcon(type: Phase) {
    switch (type) {
        case  PhaseEnum.enum.work:
            return '/tomato.svg';
        case  PhaseEnum.enum.break:
            return '/teapot.svg';
        case  PhaseEnum.enum.longBreak:
            return '/beer.svg';
        default:
            return '/tomato.svg';
    }
}

