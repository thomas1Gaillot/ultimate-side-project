"use client"

import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {usePathname, useRouter} from "next/navigation";
import {parse, useStoredParticipants} from "@/app/(locale)/poc-enostart/data/participants";

// Dummy data for participants

export default function TabsLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const {participants} = useStoredParticipants()
    const {candidatures, preIntegres, passageExploitation, integres, refuses} = parse(participants)
    const tabData = [
        {
            id: "candidatures",
            label: `1. Candidatures (${candidatures.length})`,
            buttonText: "J'accepte les candidatures",
            href: "/poc-enostart/my-participants/candidatures"
        },
        {
            id: "pre-integres",
            label: `2. Pré-intégrés (${preIntegres.length})`,
            buttonText: "Proposer un prix de vente",
            href: "/poc-enostart/my-participants/pre-integres"
        },
        {
            id: "passage-passage-exploitation",
            label: `3. Passage en exploitation (${passageExploitation.length})`,
            buttonText: "Passer en exploitation",
            href: "/poc-enostart/my-participants/passage-exploitation"
        },
        {
            id: "integres",
            label: `4. Intégrés (${integres.length})`,
            buttonText: "Exporter sur Enopower",
            href: "/poc-enostart/my-participants/integres"
        },
        {id: "refuses", label: `Refusés (${refuses.length})`, buttonText: "Refuser", href: "/poc-enostart/my-participants/refuses"},
    ]

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
                        </TabsTrigger>
                    ))}
                </TabsList>
                <div className="w-full">
                    {children}
                </div>
            </Tabs>
        </div>
    )
}