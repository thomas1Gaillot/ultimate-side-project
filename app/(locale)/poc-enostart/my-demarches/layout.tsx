"use client";

import {usePathname, useRouter} from "next/navigation";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useDocuments} from "@/app/(locale)/poc-enostart/data/use-documents";
import {CheckCircledIcon} from "@radix-ui/react-icons";



export default function TabsLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const {isPmoCreated, isBulletinEdited, isAccordsParticipationEdited} = useDocuments()
    const tabData = [
        {id: "pmo", label: "Démarches PMO", href: "/poc-enostart/my-demarches/pmo", done : isPmoCreated && isBulletinEdited},
        {id: "enedis", label: "Déclaration de mise en oeuvre", href: "/poc-enostart/my-demarches/enedis"},
        {id: "accords", label: "Accords de participation", href: "/poc-enostart/my-demarches/accords",  done : isPmoCreated && isAccordsParticipationEdited},
        {id: "vente", label: "Démarches de Vente", href: "/poc-enostart/my-demarches/vente/proposal"},
        {id: "convention", label: "Convention ACC", href: "/poc-enostart/my-demarches/convention"},
    ];

    return (
        <div className="flex w-full gap-8">
            <Tabs value={pathname || ''} className="w-full flex">
                <TabsList className="w-64 h-max flex flex-col items-stretch bg-background">
                    {tabData.map((tab) => (
                        <TabsTrigger
                            onClick={() => router.push(tab.href)}
                            key={tab.id}
                            value={tab.href}
                            className="justify-start px-4 py-2 text-left hover:bg-muted"
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
