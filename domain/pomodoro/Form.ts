import { z } from "zod";

export const formSchema = z.object({
    formValues: z.object({
        task: z.string(),
    }),
});

export type Form = z.infer<typeof formSchema>;
