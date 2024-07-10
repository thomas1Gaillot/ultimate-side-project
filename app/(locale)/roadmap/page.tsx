'use client'
import {TypographyH1, TypographyLead} from "@/components/ui/typography";
import UpcomingProjectCard from "@/app/(locale)/roadmap/UpcomingProjectCard";
import {Roadmap} from "@/data/roadmap";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useEffect, useState} from "react";


export default function RoadMapPage() {
    const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap[]>([]);
    const [votingRoadmap, setVotingRoadmap] = useState<Roadmap[]>([]);

    useEffect(() => {
        const fetchRoadmaps = async () => {
            const response = await fetch('/api/roadmap');
            const data: Roadmap[] = await response.json();
            setSelectedRoadmap(data.filter(roadmap => roadmap.selected));
            setVotingRoadmap(data.filter(roadmap => !roadmap.selected));
        };

        fetchRoadmaps();
    }, []);


    return <div className={"flex flex-col gap-4 pb-8"}>
        <TypographyH1>
            Roadmap for this website
        </TypographyH1>
        <TypographyLead>
            {`Upvote for the feature you'd like on this website.`}
        </TypographyLead>
        <Tabs defaultValue="selected">
            <TabsList className="grid grid-cols-2 max-w-lg">
                <TabsTrigger value="selected">Selectionné</TabsTrigger>
                <TabsTrigger value="voting">Ouvert aux votes</TabsTrigger>
            </TabsList>
            <TabsContent value="selected">
                {
                    selectedRoadmap.map((item) => <UpcomingProjectCard key={item.id} {...item} />)
                }
            </TabsContent>
            <TabsContent value="voting" className={"grid gap-4"}>
                {
                    votingRoadmap.map((item) => <UpcomingProjectCard key={item.id} {...item} />)
                }
            </TabsContent>
        </Tabs>
    </div>
}