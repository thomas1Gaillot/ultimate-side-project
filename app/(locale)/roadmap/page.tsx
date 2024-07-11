'use client'
import {TypographyH1, TypographyLead} from "@/components/ui/typography";
import UpcomingProjectCard, {UpcomingProjectCardSkeleton} from "@/app/(locale)/roadmap/UpcomingProjectCard";
import {Roadmap} from "@/data/roadmap";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {SquarePlusIcon} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/hooks/use-toast";
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {RoadmapSchema, roadmapSchema} from "@/pages/api/roadmap";


export default function RoadMapPage() {
    const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap[]>([]);
    const [votingRoadmap, setVotingRoadmap] = useState<Roadmap[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openDialog, seOpenDialog] = useState(false);
    const form = useForm<RoadmapSchema>({
        resolver: zodResolver(roadmapSchema),
    });

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
    const fetchRoadmapsAndReload = async () => {
        const response = await fetch('/api/roadmap');
        const data: Roadmap[] = await response.json();
        setSelectedRoadmap(data
            .filter(roadmap => roadmap.selected)
            .sort((a, b) => b.upvotes - a.upvotes));
        setVotingRoadmap(data
            .filter(roadmap => !roadmap.selected)
            .sort((a, b) => b.upvotes - a.upvotes));
        setIsLoading(false);
    }
    const handleUpvote = async (id: string) => {
        const res = await fetch('/api/roadmap/upvote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: id}),
        });
        await fetchRoadmapsAndReload()
        if (res.ok) {
            toast({
                title: 'Thanks for the vote',
                description: `Thank you for voting !`,
            });
        }
    };

    const onSubmit = async (data: RoadmapSchema) => {
        console.log(data);
        // Vous pouvez envoyer les données validées à votre API ici
        // Par exemple:
        await fetch('/api/roadmap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        await fetchRoadmapsAndReload()
        toast({
            title: 'Project idea submitted',
            description: 'Your project idea has been submitted successfully.',
        });
        form.reset();
        seOpenDialog(false)
    };

    return (
        <div className={"flex flex-col gap-4 pb-8"}>
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
                    <Dialog open={openDialog}>
                        <DialogTrigger>
                            <Button
                                onClick={() => seOpenDialog(true)}
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
                                    Share your project idea with the community and make it happens.
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form className={"grid gap-2 py-4"} onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Project title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="An awesome idea" {...field} />
                                                </FormControl>
                                                <FormMessage/>

                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({field}) => (
                                            <FormItem>

                                                <FormLabel>Type</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Page" {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({field}) => (
                                            <FormItem>

                                                <FormLabel>Type</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Describe what you would want." {...field} />
                                                </FormControl>
                                                <FormMessage/>
                                            </FormItem>
                                        )}
                                    />
                                    <DialogFooter>
                                        <Button className={'mt-4'} type="submit">Share this idea</Button>
                                    </DialogFooter>
                                </form>
                            </Form>
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
    );
}
