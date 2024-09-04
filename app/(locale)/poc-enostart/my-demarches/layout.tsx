"use client";

import {usePathname, useRouter} from "next/navigation";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useDocuments} from "@/app/(locale)/poc-enostart/data/use-documents";
import {CheckCircledIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";
import {BellIcon} from "lucide-react";



const demarchesTabs = (isPmoCreated:boolean, isBulletinEdited: boolean, isAccordsEdited: boolean, isDeclarationSent : boolean, isContratCreated : boolean, pathname : string | null) => {
    const enedisHref = pathname?.includes('/poc-enostart/my-demarches/enedis') ? pathname : '/poc-enostart/my-demarches/enedis';
    const pmoHref = pathname?.includes('/poc-enostart/my-demarches/pmo') ? pathname : '/poc-enostart/my-demarches/pmo';
    const venteHref = pathname?.includes('/poc-enostart/my-demarches/vente') ? pathname : '/poc-enostart/my-demarches/vente';
    const overviewHref = '/poc-enostart/my-demarches/overview'

    return [
        {id: "overview", label: "Vue d'ensemble", href: overviewHref, ping : false, hide : false},
        {id: "enedis", label: "Démarches Enedis", href: enedisHref, ping : !isAccordsEdited || !isDeclarationSent, hide : false},
        {id: "pmo", label: "Démarches PMO", href: pmoHref, done: isPmoCreated && isBulletinEdited, ping : !isBulletinEdited, hide : isBulletinEdited},
        {id: "vente", label: "Démarches de Vente", href: venteHref, ping : !isContratCreated},
    ]
}

export default function TabsLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const {isPmoCreated, isBulletinEdited, isAccordsParticipationEdited, isDeclarationSent, hasSalesContract} = useDocuments()


    return (
        <div className="flex flex-col w-full gap-8">
            <Tabs value={pathname || ''} className="w-full flex">
                <TabsList className="w-80 h-max flex flex-col gap-1 items-stretch bg-background">
                    {demarchesTabs(isPmoCreated, isBulletinEdited, isAccordsParticipationEdited, isDeclarationSent, hasSalesContract, pathname).map((tab, index) => (
                        <TabsTrigger
                            key={tab.id}
                            onClick={() => router.push(tab.href)}
                            value={tab.id}
                            className={cn("flex data-[state=active]:bg-white justify-between items-center w-full px-3 py-2 text-sm",
                                pathname?.includes(tab.href) && 'bg-muted',
                                tab.hide && 'line-through')}
                        >
                            <div className={"flex items-center"}>
                                        <span className={cn("text-left font-normal truncate mr-2",
                                            tab.ping && 'text-primary font-bold')}>
                                            {tab.label}
                                        </span>
                            </div>
                            {tab.ping ? <span
                                    className="flex  text-primary gap-1 items-center ms-1 py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary/10 text-gray-800 dark:bg-neutral-700 dark:text-neutral-300">

                                            <BellIcon className="size-4"/> à faire
                            </span> :
                                <></>}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <div className="w-full px-16 py-4 ">
                    {children}
                </div>
            </Tabs>
        </div>
    );
}



