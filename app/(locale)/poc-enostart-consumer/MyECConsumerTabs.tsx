import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Separator} from "@/components/ui/separator";
import {usePathname, useRouter} from "next/navigation";

export default function MyECConsumerTabs() {
    const router = useRouter()
    const pathName = usePathname()
    return (
        <Tabs value={pathName || ''} className="w-full ">
            <TabsList className="flex gap-2  w-full items-center grid-cols-4 p-1 bg-white h-max">
                <TabsTrigger
                    onClick={() => router.push('/poc-enostart-consumer/my-info')}
                    value={"/poc-enostart-consumer/my-info"}
                    className="data-[state=active]:bg-emerald-600/10 data-[state=active]:text-emerald-600 rounded-md py-2"
                >
                    Mon profil
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => router.push("/poc-enostart-consumer/my-participation")}
                    className="data-[state=active]:bg-emerald-600/10 data-[state=active]:text-emerald-600 rounded-md py-2"
                    value={"/poc-enostart-consumer/my-participation"}>
                    Ma demande de participation
                </TabsTrigger>
                <TabsTrigger
                    onClick={() => router.push('/poc-enostart-consumer/share')}
                    className="data-[state=active]:bg-emerald-600/10 data-[state=active]:text-emerald-600 rounded-md py-2"
                    value={"/poc-enostart-consumer/share"}>
                    Faire bénéficier mes proches
                </TabsTrigger>
            </TabsList>
            <Separator orientation={'horizontal'}/>
        </Tabs>
    )
}