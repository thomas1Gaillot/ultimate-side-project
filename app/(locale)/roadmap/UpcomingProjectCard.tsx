import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ThumbsUpIcon} from "lucide-react";
import {Badge} from "@/components/ui/badge";

export default function UpcomingProjectCard({title, description, upvotes, badge}: {
    title: string,
    description: string,
    upvotes: number,
    badge: string
}) {
    return <Card className="w-full max-w-xl ">
        <CardHeader>
            <CardTitle className="flex flex-col gap-2">
                <Badge variant="secondary" className="w-max">{badge}</Badge>
                <span className="text-xl font-semibold text-gray-800">{title}</span>
            </CardTitle>
            <CardDescription >
                {description}
            </CardDescription>
        </CardHeader>
        <CardFooter className="justify-between items-center">
            <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 transition-transform duration-300 transform hover:scale-105 flex items-center">
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
