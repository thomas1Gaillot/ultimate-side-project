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
    return <Card className="w-full max-w-xl">
        <CardHeader>
            <CardTitle className={"flex flex-col gap-2"}>
                <Badge variant={"secondary"} className={'w-max'}>{badge}</Badge>

                {title}
            </CardTitle>
            <CardDescription>
                {description}
            </CardDescription>
        </CardHeader>
        <CardFooter className="justify-between">
            <Button size={'sm'} className={'bg-indigo-500 hover:bg-indigo-500/90 hover:scale-105'}>
                <ThumbsUpIcon className="mr-2 h-4 w-4"/>
                Upvote
            </Button>
            <div className="text-sm text-muted-foreground">{upvotes} upvotes</div>
        </CardFooter>
    </Card>
}