'use client'
import {TypographyH1, TypographyLead} from "@/components/ui/typography";
import UpcomingProjectCard from "@/app/(locale)/roadmap/UpcomingProjectCard";
import {Roadmap} from "@/data/roadmap";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useEffect, useState} from "react";
import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {toast} from "@/components/hooks/use-toast";


export default function RoadMapPage() {
    const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap[]>([]);
    const [votingRoadmap, setVotingRoadmap] = useState<Roadmap[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRoadmaps = async () => {
            const response = await fetch('/api/roadmap');
            const data: Roadmap[] = await response.json();
            setSelectedRoadmap(data
                .filter(roadmap => roadmap.selected)
                .sort((a, b) => b.upvotes - a.upvotes));
            setVotingRoadmap(data
                .filter(roadmap => !roadmap.selected)
                .sort((a, b) => b.upvotes - a.upvotes));
            setIsLoading(false);
        };

        fetchRoadmaps();
    }, []);

    const handleUpvote = async (id: string) => {

        const res = await fetch('/api/roadmap/upvote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id}),
        });
        const response = await fetch('/api/roadmap');
        const data: Roadmap[] = await response.json();
        setSelectedRoadmap(data
            .filter(roadmap => roadmap.selected)
            .sort((a, b) => b.upvotes - a.upvotes));
        setVotingRoadmap(data
            .filter(roadmap => !roadmap.selected)
            .sort((a, b) => b.upvotes - a.upvotes));

        if (res.ok) {
            toast({
                title: 'Thanks for the vote',
                description: `Thank you for voting !`,
            });
        }
    };

    return <div className={"flex flex-col gap-4 pb-8"}>
        <TypographyH1>
            Roadmap for this website
        </TypographyH1>
        <TypographyLead>
            {`Upvote for the feature you'd like on this website.`}
        </TypographyLead>
        <Tabs defaultValue="selected">
            <TabsList className="grid grid-cols-2 max-w-lg">
                <TabsTrigger value="selected">Selected</TabsTrigger>
                <TabsTrigger value="voting">Open to vote</TabsTrigger>
            </TabsList>
            <TabsContent value="selected">
                {
                    selectedRoadmap.map((item) => <UpcomingProjectCard handleUpvote={() => handleUpvote(item.id)}
                                                                       key={item.id} {...item} />)
                }

            </TabsContent>
            <TabsContent value="voting" className={"grid gap-4"}>
                {
                    votingRoadmap.map((item) => <UpcomingProjectCard handleUpvote={() => handleUpvote(item.id)}
                                                                     key={item.id} {...item} />)
                }
            </TabsContent>
        </Tabs>
        {isLoading && <UpcomingProjectCardSkeleton/>}

    </div>
}

function UpcomingProjectCardSkeleton() {
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