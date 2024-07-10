import {TypographyH1, TypographyLead} from "@/components/ui/typography";
import UpcomingProjectCard from "@/app/(locale)/roadmap/UpcomingProjectCard";
import {roadmap} from "@/data/roadmap";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";


export default function RoadMapPage() {

    return <div className={"flex flex-col gap-4 pb-8"}>
        <TypographyH1>
            Roadmap for this website
        </TypographyH1>
        <TypographyLead>
            {`Upvote for the feature you'd like on this website.`}
        </TypographyLead>
        <Tabs defaultValue="selected">
            <TabsList className="gridgrid-cols-2">
                <TabsTrigger value="selected">Selectionné</TabsTrigger>
                <TabsTrigger value="voting">Ouvert aux votes</TabsTrigger>
            </TabsList>
            <TabsContent value="selected">
                {
                    roadmap.selectedRoadmap.map((item, index) => <UpcomingProjectCard key={index} {...item}/>)
                }
            </TabsContent>
            <TabsContent value="voting" className={"grid gap-4"}>
                {
                    roadmap.votingRoadmap.map((item, index) => <UpcomingProjectCard key={index} {...item}/>)
                }
            </TabsContent>
        </Tabs>

    </div>
}