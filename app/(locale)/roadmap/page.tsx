import {TypographyH1, TypographyLead} from "@/components/ui/typography";
import UpcomingProjectCard from "@/app/(locale)/roadmap/UpcomingProjectCard";
import {roadmap} from "@/data/roadmap";

export default function RoadMapPage() {
    return <div className={"flex flex-col gap-4 pb-8"}>
        <TypographyH1>
            Roadmap for this website
        </TypographyH1>
        <TypographyLead>
            {`Upvote for the feature you'd like on this website.`}
        </TypographyLead>
        {
            roadmap.map((item, index) => <UpcomingProjectCard key={index} {...item}/>)
        }
    </div>
}