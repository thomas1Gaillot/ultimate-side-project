import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import ParticipantsContent from "@/app/(locale)/poc-enostart/components/participants/participantsContent";
import DemarchesContent from "@/app/(locale)/poc-enostart/components/demarches/demarches";
import {MapIcon} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import Overview from "@/app/(locale)/poc-enostart/components/overview/overview";

export default function MonECTabs() {
    return (
        <Tabs defaultValue="mon-projet" className="w-full ">
            <TabsList className="flex gap-2  w-full items-center grid-cols-4 p-1 bg-white h-max">
                <TabsTrigger
                    value="mon-projet"
                    className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 rounded-md py-2"
                >
                    Mon projet
                </TabsTrigger>
                <TabsTrigger
                    className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 rounded-md py-2"
                    value="mon-perimetre">
                    Mon périmètre
                </TabsTrigger>
                <TabsTrigger
                    className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 rounded-md py-2"
                    value="mes-participants">
                    Mes participants
                </TabsTrigger>
                <TabsTrigger
                    className="data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700 rounded-md py-2"
                    value="mes-demarches">
                    Mes démarches
                </TabsTrigger>
            </TabsList>
            <Separator orientation={'horizontal'}/>
            <TabsContent className={"py-4"} value={'mon-projet'}>
                <Overview/>
            </TabsContent>
            <TabsContent className={"py-4"} value={'mes-participants'}>
                <ParticipantsContent/>
            </TabsContent>
            <TabsContent className={"py-4"} value={'mes-demarches'}>
                <DemarchesContent/>
            </TabsContent>
            <TabsContent className={"py-4"} value={'mon-perimetre'}>
                <div className={"w-full rounded h-96 bg-gray-50 flex items-center justify-center"}>
                    <MapIcon className={"size-8"}/>
                </div>
            </TabsContent>
        </Tabs>
    )
}