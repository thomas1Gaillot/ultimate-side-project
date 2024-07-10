import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ThumbsUpIcon} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {toast} from "@/components/hooks/use-toast";

export default function UpcomingProjectCard({id, title, description, upvotes, badge}: {
    id: string,
    title: string,
    description: string,
    upvotes: number,
    badge: string
}) {
    const handleUpvote = async () => {
        const res = await fetch('/api/roadmap/upvote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id}),
        });

        if (res.ok) {
            const updatedRoadmap = await res.json();
            toast({title: 'success', description: `Upvoted ${title}`});
        }
    };

    return <Card className="w-full max-w-xl ">
        <CardHeader>
            <CardTitle className="flex flex-col gap-2">
                <Badge variant="secondary" className="w-max">{badge}</Badge>
                <span className="text-xl font-semibold text-gray-800">{title}</span>
            </CardTitle>
            <CardDescription>
                {description}
            </CardDescription>
        </CardHeader>
        <CardFooter className="justify-between items-center">
            <Button onClick={handleUpvote} size="sm" className="bg-indigo-500 hover:bg-indigo-600  flex items-center">
                <ThumbsUpIcon className="mr-2 h-4 w-4"/>
                Upvote
            </Button>
            <div className="flex items-center text-sm text-gray-500">
                <ThumbsUpIcon className="mr-1 h-4 w-4"/>
                {upvotes} upvotes
            </div>
        </CardFooter>
    </Card>
}
