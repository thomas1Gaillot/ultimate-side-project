import {toast} from "@/components/hooks/use-toast";
import axios from "axios";

export const useUpvote = () => {

    const handleUpvote = async (id: number) => {
        const res = await axios.post('/api/roadmap/upvote', {
            id: id
        });
        if (res.status === 200) {
            toast({
                title: 'Thanks for the vote',
                description: `Thank you for voting !`,
            });
        }
    };

    return { handleUpvote };
};
