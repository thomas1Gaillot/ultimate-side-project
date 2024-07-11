import {toast} from "@/components/hooks/use-toast";
import {RoadmapSchema} from "@/domain/roadmap/Roadmap";

export const useAddProjectIdea = () => {

    const addProjectIdea = async (data: RoadmapSchema) => {
        await fetch('/api/roadmap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        toast({
            title: 'Project idea submitted',
            description: 'Your project idea has been submitted successfully.',
        });
    };

    return {addProjectIdea};
};
