import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"

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
        </Tabs>
    )
}