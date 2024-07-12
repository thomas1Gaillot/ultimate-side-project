import {Card, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ThumbsUpIcon} from "lucide-react";
import {Badge} from "@/components/ui/badge";
import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

export default function UpcomingProjectCard({id, title, description, upvotes, badge, handleUpvote}: {
    id: string,
    title: string,
    description: string,
    upvotes: number,
    badge: string,
    handleUpvote: () => void,
}) {


    return <Card className="w-full max-w-md flex flex-col justify-between ">
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


export function UpcomingProjectCardSkeleton() {
    return <Card key={'UpcomingProjectCardSkeleton'} className="w-full max-w-xl ">
        <CardHeader>
            <Skeleton className="w-20 h-4"/>
            <Skeleton className="w-32 h-6"/>
            <Skeleton className="w-full h-4"/>
        </CardHeader>
        <CardFooter className="justify-between items-center">
            <Skeleton className="w-[100px] h-4"/>
            <Skeleton className="w-[100px] h-4"/>
        </CardFooter>
    </Card>
}