import {toast} from "@/components/hooks/use-toast";
import {RoadmapSchema} from "@/domain/roadmap/Roadmap";
import axios from "axios";

export const useAddProjectIdea = () => {

    const addProjectIdea = async (data: RoadmapSchema) => {
        await axios.post('/api/roadmap', {
            body: JSON.stringify(data),
        });
        toast({
            title: 'Project idea submitted',
            description: 'Your project idea has been submitted successfully.',
        });
    };

    return {addProjectIdea};
};
