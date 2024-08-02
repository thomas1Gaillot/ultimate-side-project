import {toast} from "@/components/hooks/use-toast";
import axios from "axios";
import {RoadmapWithoutId} from "@/domain/roadmap/Roadmap";

export const useAddProjectIdea = () => {

    const addProjectIdea = async (data: RoadmapWithoutId) => {
        await axios.post('/api/roadmap', {
            title: data.title,
            badge: data.badge,
            description: data.description,
            upvotes: data.upvotes,
            selected: data.selected
        });
        toast({
            title: 'Project idea submitted',
            description: 'Your project idea has been submitted successfully.',
        });
    };

    return {addProjectIdea};
};
