"use client";

import {usePathname, useRouter} from "next/navigation";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";

const tabData = [
    {id: "pmo", label: "Démarches PMO", href: "/poc-enostart/my-demarches/pmo"},
    {id: "enedis", label: "Déclaration Enedis", href: "/poc-enostart/my-demarches/enedis"},
    {id: "vente", label: "Démarches vente", href: "/poc-enostart/my-demarches/vente"},
    {id: "convention", label: "Convention ACC", href: "/poc-enostart/my-demarches/convention"},
];

export default function TabsLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

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
    );
}
