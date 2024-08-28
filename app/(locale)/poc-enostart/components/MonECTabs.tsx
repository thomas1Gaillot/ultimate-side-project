import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Separator} from "@/components/ui/separator";
import {usePathname, useRouter} from "next/navigation";

export default function MonECTabs() {
    const router = useRouter()
    const pathName = usePathname()
    const projectHref = pathName?.includes("/poc-enostart/my-project") ? pathName : "/poc-enostart/my-project"
    const perimeterHref = pathName?.includes("/poc-enostart/my-perimeter") ? pathName : "/poc-enostart/my-perimeter"
    const participantsHref = pathName?.includes("/poc-enostart/my-participants") ? pathName : "/poc-enostart/my-participants"
    const demarchesHref = pathName?.includes("/poc-enostart/my-demarches") ? pathName : "/poc-enostart/my-demarches"
    return (
        <Tabs value={pathName || ''} className="w-full ">
            <TabsList className="flex gap-2  w-full items-center grid-cols-4 p-1 bg-white h-max">
                <TabsTrigger
                    onClick={() => router.push('/poc-enostart/my-project')}
                    value={projectHref}
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md py-2"
                >
                    Mon projet
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => router.push('/poc-enostart/my-perimeter')}
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md py-2"
                    value={perimeterHref}>
                    Mon périmètre
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => router.push('/poc-enostart/my-participants/candidatures')}
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md py-2"
                    value={participantsHref}>
                    Mes participants
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => router.push('/poc-enostart/my-demarches/pmo')}
                    className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary rounded-md py-2"
                    value={demarchesHref}>
                    Mes démarches
                </TabsTrigger>
            </TabsList>
            <Separator orientation={'horizontal'}/>
        </Tabs>
    )
}