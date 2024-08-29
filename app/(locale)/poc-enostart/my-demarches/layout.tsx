"use client";

import {usePathname, useRouter} from "next/navigation";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useDocuments} from "@/app/(locale)/poc-enostart/data/use-documents";
import {CheckCircledIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";



export default function TabsLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const {isPmoCreated, isBulletinEdited, isAccordsParticipationEdited} = useDocuments()
    const enedisHref = pathname?.includes('/poc-enostart/my-demarches/enedis') ? pathname : '/poc-enostart/my-demarches/enedis';
    const pmoHref = pathname?.includes('/poc-enostart/my-demarches/pmo') ? pathname : '/poc-enostart/my-demarches/pmo';
    const venteHref = pathname?.includes('/poc-enostart/my-demarches/vente') ? pathname : '/poc-enostart/my-demarches/vente';
    const tabData = [
        {id: "enedis", label: "Démarches Enedis", href: enedisHref},
        {id: "pmo", label: "Démarches PMO", href: pmoHref, done : isPmoCreated && isBulletinEdited},
        {id: "vente", label: "Démarches de Vente", href: venteHref},
    ];
    return (
        <div className="flex w-full gap-8">
            <Tabs value={pathname || ''} className="w-full flex">
                <TabsList className="w-64 h-max flex flex-col items-stretch bg-background">
                    {tabData.map((tab, index) => (
                        <TabsTrigger
                            onClick={() => router.push(tab.href)}
                            key={tab.id}
                            value={tab.href}
                            className={cn("justify-start px-4 py-2 text-left hover:bg-muted",
                                index === 3 && 'mt-4')}
                        >
                            {tab.label}
                            {tab.done && <CheckCircledIcon className="size-4 text-green-500 ml-2"/>}
                        </TabsTrigger>
                    ))}
                </TabsList>
                <div className="w-full p-16 ">
                    {children}
                </div>
            </Tabs>
        </div>
    );
}
