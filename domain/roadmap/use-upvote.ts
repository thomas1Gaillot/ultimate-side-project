import {toast} from "@/components/hooks/use-toast";

export const useUpvote = () => {

    const handleUpvote = async (id: string) => {
        const res = await fetch('/api/roadmap/upvote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id }),
        });
        if (res.ok) {
            toast({
                title: 'Thanks for the vote',
                description: `Thank you for voting !`,
            });
        }
    };

    return { handleUpvote };
};
