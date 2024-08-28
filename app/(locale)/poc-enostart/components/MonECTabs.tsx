import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Separator} from "@/components/ui/separator";
import {useRouter} from "next/navigation";

export default function MonECTabs() {
    const router = useRouter()
    return (
        <Tabs defaultValue="mon-projet" className="w-full ">
            <TabsList className="flex gap-2  w-full items-center grid-cols-4 p-1 bg-white h-max">
                <TabsTrigger
                    onClick={() => router.push('/poc-enostart/my-project')}
                    value="mon-projet"
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md py-2"
                >
                    Mon projet
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => router.push('/poc-enostart/my-perimeter')}
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md py-2"
                    value="mon-perimetre">
                    Mon périmètre
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => router.push('/poc-enostart/my-participants/candidatures')}
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md py-2"
                    value="mes-participants">
                    Mes participants
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => router.push('/poc-enostart/my-demarches/pmo')}
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md py-2"
                    value="mes-demarches">
                    Mes démarches
                </TabsTrigger>
            </TabsList>
            <Separator orientation={'horizontal'}/>
        </Tabs>
    )
}