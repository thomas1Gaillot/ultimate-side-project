import { z } from "zod";

export const timerSchema = z.object({
    patternIndex: z.number(),
    secondsLeft: z.number(),
    isPlaying: z.boolean(),
    currentPhase: z.string(),
});

export type Timer = z.infer<typeof timerSchema>;
