import {z} from "zod";

export type Roadmap = {
    id: string;
    title: string;
    description: string;
    badge: string;
    selected: boolean;
    upvotes : number
}

export const roadmapSchema = z.object({
    title: z.string().min(1, "Project title is required"),
    type: z.string().min(1, "Type is required"),
    description: z.string().min(1, "Description is required"),
});

export type RoadmapSchema = z.infer<typeof roadmapSchema>;