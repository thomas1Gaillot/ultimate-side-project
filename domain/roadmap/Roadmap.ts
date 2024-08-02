import {z} from "zod";

// Define the Roadmap schema and type
export const roadmapSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Project title is required"),
    description: z.string().min(1, "Description is required"),
    badge: z.string(),
    selected: z.boolean(),
    upvotes: z.number(),
});

export type Roadmap = z.infer<typeof roadmapSchema>;
export type RoadmapWithoutId = Omit<Roadmap, 'id'>
