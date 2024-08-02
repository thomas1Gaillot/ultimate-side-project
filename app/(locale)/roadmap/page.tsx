'use client'
import {TypographyH1, TypographyLead} from "@/components/ui/typography";
import UpcomingProjectCard, {UpcomingProjectCardSkeleton} from "@/app/(locale)/roadmap/UpcomingProjectCard";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, {useState} from "react";
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
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {useFetchRoadmaps} from '@/domain/roadmap/use-fetch-roadmaps';
import {useUpvote} from '@/domain/roadmap/use-upvote';
import {useAddProjectIdea} from '@/domain/roadmap/use-add-project-idea';
import {Roadmap, roadmapSchema, RoadmapWithoutId} from "@/domain/roadmap/Roadmap";

export default function RoadMapPage() {
    const {selectedRoadmap, votingRoadmap, isLoading, fetchRoadmaps} = useFetchRoadmaps();
    const {handleUpvote} = useUpvote();
    const {addProjectIdea} = useAddProjectIdea();
    const [openDialog, setOpenDialog] = useState(false);
    const form = useForm<RoadmapWithoutId>({
        resolver: zodResolver(roadmapSchema),
        defaultValues: {
            upvotes: 0,
            selected: false
        },
    });
    const onSubmit = async (data: RoadmapWithoutId) => {
        await addProjectIdea(data);
        await fetchRoadmaps();
        form.reset();
        setOpenDialog(false);
    };

    const upvoteAndRefresh = async (id?: number) => {
        if(!id) return console.error('No id provided')
        await handleUpvote(id)
        await fetchRoadmaps()
    }
    return (
        <div className={"flex flex-col gap-4 pb-8"}>
            <TypographyH1>
                Roadmap for this website
            </TypographyH1>
            <TypographyLead>
                {`Upvote for the feature you'd like on this website.`}
            </TypographyLead>
            <Tabs defaultValue="selected">
                <TabsList className="grid grid-cols-2 max-w-sm">
                    <TabsTrigger value="selected">Selected</TabsTrigger>
                    <TabsTrigger value="voting">Open to vote</TabsTrigger>
                </TabsList>
                <TabsContent value="selected" className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 "}>
                    {isLoading && <UpcomingProjectCardSkeleton/>}
                    {isLoading && <UpcomingProjectCardSkeleton/>}
                    {
                        selectedRoadmap.map((item) => <UpcomingProjectCard
                            handleUpvote={() => upvoteAndRefresh(item.id)}
                            key={item.id} {...item} />)
                    }
                </TabsContent>
                <TabsContent value="voting" className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4 "}>
                    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                        <DialogTrigger>
                            <Button
                                className={"border-dashed min-h-20 rounded-lg border text-gray-500 h-full w-full hover:scale-100 "}
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
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="badge"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Type</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Page" {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Describe what you would want." {...field} />
                                                </FormControl>
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
                        votingRoadmap.map((item) => <UpcomingProjectCard handleUpvote={() => upvoteAndRefresh(item.id)}
                                                                         key={item.id} {...item} />)
                    }
                </TabsContent>
            </Tabs>

        </div>
    );
}
