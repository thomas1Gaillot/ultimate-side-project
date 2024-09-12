'use client'
import {Button} from "@/components/ui/button";
import {QuestionMarkCircledIcon} from "@radix-ui/react-icons";
import {CodepenIcon} from "lucide-react";
import {useRouter} from "next/navigation";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {useToggleV1} from "@/app/(locale)/poc-enostart/useToggleV1";
import {useConsumerView} from "@/app/(locale)/poc-enostart/useConsumerView";
import {useEffect} from "react";
import MyECConsumerTabs from "@/app/(locale)/poc-enostart-consumer/MyECConsumerTabs";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header/>
            <MyECConsumerTabs/>
            <div className={" 2xl:px-32 px-4   md:px-8"}>
                {children}
            </div>
        </>
    )
}

function Header() {
    const {showV1, toggleShowV1} = useToggleV1()
    const {consumerView, toggleConsumerView} = useConsumerView()
    const router = useRouter()
    useEffect(() => {
        if (!consumerView) {
            router.push('/poc-enostart/my-project')
        }
    }, [consumerView]);

    return (
        <header className="h-[60px] border-b border-gray-200 bg-white px-8 flex items-center justify-between">
            <div className="flex items-center">
                <CodepenIcon className="size-8 text-green-600 mr-2"/>
                <span className="text-gray-800 font-semibold text-sm">{"Mon énergie collective"}</span>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="reconduction"
                        checked={showV1}
                        onCheckedChange={toggleShowV1}
                    />
                    <Label htmlFor="reconduction" className={"text-xs text-gray-500"}>v1</Label>
                </div>
                <Button variant="ghost" className="text-gray-600 flex items-center">
                    <QuestionMarkCircledIcon className="mr-2 h-4 w-4"/>
                    {"Centre d'aide"}
                </Button>
                <div className="flex items-center space-x-2">
                    <Switch
                        id="reconduction"
                        checked={consumerView}
                        onCheckedChange={toggleConsumerView}
                    />
                    <Label htmlFor="reconduction" className={"text-xs text-gray-500"}>vue consommateur</Label>
                </div>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <span className="sr-only">User profile</span>
                    <div
                        className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                        J
                    </div>
                </Button>
            </div>
        </header>
    )
}