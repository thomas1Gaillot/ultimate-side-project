'use client'
import {TypographyH1, TypographyLead} from "@/components/ui/typography";
import UpcomingProjectCard from "@/app/(locale)/roadmap/UpcomingProjectCard";
import {Roadmap} from "@/data/roadmap";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, {useEffect, useState} from "react";
import {Card, CardFooter, CardHeader} from "@/components/ui/card";
import {Skeleton} from "@/components/ui/skeleton";
import {toast} from "@/components/hooks/use-toast";
import {Button} from "@/components/ui/button";
import {SquarePlusIcon} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";


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
            <TabsContent value="voting" className={"grid gap-4 max-w-xl"}>
                <Dialog>
                    <DialogTrigger>
                        <Button
                            className={"border-dashed border h-24 w-full hover:scale-100 "}
                            size={'lg'}
                            variant={'outline'}>
                            <SquarePlusIcon className={"w-6 h-6  mr-2"}/>
                            Add a project idea
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Share a project Idea</DialogTitle>
                            <DialogDescription>
                                Share your project idea with the community and get upvotes.
                            </DialogDescription>
                        </DialogHeader>
                        <>
                        <div className="grid gap-4 py-4">
                            <div className="grid  gap-4">
                                <Label htmlFor="name">
                                    Project title
                                </Label>
                                <Input id="name" value="Pedro Duarte" className="col-span-3"/>
                            </div>
                            <div className="grid gap-4">
                                <Label htmlFor="type">
                                    Type
                                </Label>
                                <Input id="type" value="Feature" className="col-span-3"/>

                            </div>

                            <div className="grid gap-4">
                                <Label htmlFor="description">
                                    Description
                                </Label>
                                <Textarea id="description" value=""
                                          placeholder={'Describe how you would see this project.'}
                                          className="col-span-3"/>
                            </div>
                        </div>
                        </>
                        <DialogFooter>
                            <Button type="submit">Share this idea</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
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