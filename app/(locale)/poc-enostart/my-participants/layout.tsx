"use client"

import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {usePathname, useRouter} from "next/navigation";
import useParticipants from "@/app/(locale)/poc-enostart/data-refactored/participant/use-participants";

// Dummy data for participants

export default function TabsLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const {candidatures, preIntegres, exploitation, refuses} = useParticipants()
    const tabData = [
        {
            id: "candidatures",
            label: `1. Candidatures`,
            number : candidatures.length,
            buttonText: "J'accepte les candidatures",
            href: "/poc-enostart/my-participants/candidatures"
        },
        {
            id: "pre-integres-study",
            label: `2. Pré-intégrations`,
            number : preIntegres.length,
            buttonText: "Proposer un prix de vente",
            href: "/poc-enostart/my-participants/pre-integres"
        },
        {
            id: "passage-exploitation",
            label: `3. Exploitation`,
            number : exploitation.length,
            buttonText: "Exploitation",
            href: "/poc-enostart/my-participants/exploitation"
        },
        {
            id: "refuses",
            label: `Refusés`,
            number : refuses.length,
            buttonText: "Refuser",
            href: "/poc-enostart/my-participants/refuses"
        },
    ]

    return (<div>

        <div className="flex w-full gap-8 p-8">

            <Tabs value={pathname || ''} className="w-full flex">
                <TabsList className="w-64 h-max flex flex-col items-stretch bg-background">
                    {tabData.map((tab) => (
                        <TabsTrigger
                            onClick={() => router.push(tab.href)}
                            key={tab.id}
                            value={tab.href}
                            className="justify-start px-4 py-2 text-left hover:bg-muted"
                        >
                            <>
                            {tab.label}
                            <span className="ms-1 py-0.5 px-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-neutral-300">
                                {tab.number}
                            </span>
                            </>
                        </TabsTrigger>
                    ))}
                </TabsList>
                <div className="w-full">
                    {children}
                </div>
            </Tabs>
        </div>
        </div>
    )
}