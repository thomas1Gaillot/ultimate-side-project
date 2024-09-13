'use client'
import MonECTabs from "@/app/(locale)/poc-enostart/components/MonECTabs";
import {Button} from "@/components/ui/button";
import {QuestionMarkCircledIcon} from "@radix-ui/react-icons";
import {CodepenIcon} from "lucide-react";
import {useParticipants} from "@/app/(locale)/poc-enostart/data/participants";
import {usePathname, useRouter} from "next/navigation";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {useToggleV1} from "@/app/(locale)/poc-enostart/useToggleV1";
import UserFormDialog from './user-form-dialog'
import {useConsumerView} from "@/app/(locale)/poc-enostart/useConsumerView";
import {useEffect} from "react";
export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    const pathName = usePathname()
    const isNotOverview = pathName !== '/poc-enostart/my-project'
    useParticipants()
    return (
        <>
            <Header/>
            <MonECTabs/>
            <div className={" 2xl:px-32 px-4   md:px-8"}>
                {isNotOverview && <BannerToMyProject/>}
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
        if(consumerView) {
            router.push('/poc-enostart-consumer/my-participation')
        }
    }, [consumerView]);

    return (
        <header className="h-[60px] border-b border-gray-200 bg-white px-8 flex items-center justify-between">
            <div className="flex items-center">
                <CodepenIcon className="size-8 text-green-600 mr-2"/>
                <span className="text-gray-800 font-semibold text-sm">{"Mon énergie collective"}</span>
            </div>
            <div className="flex items-center space-x-4">
                <UserFormDialog onSubmit={() => {}} buttonText={'v0 Formulaire à update'} variant={'secondary'}/>
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

function BannerToMyProject() {
    const router = useRouter()
    return (
        <div className={"border mt-4 mx-16 mb-4 rounded-lg border-gray-300 p-4 flex items-center justify-between"}>
            <div className={"flex flex-col text-sm text-gray-500"}>
                <span className={"font-semibold text-primary mr-2"}>{"Besoin d'aide ?"}</span>
                <span
                    className={"text-xs"}> {"Toutes les étapes pour créer votre opération et intégrer des participants sont décrites dans l'onglet Mon Projet."}</span>
            </div>


            <Button size={'sm'} variant={'outline'}
                    onClick={() => router.push('/poc-enostart/my-project')}
            >Mon projet</Button>
        </div>
    )
}