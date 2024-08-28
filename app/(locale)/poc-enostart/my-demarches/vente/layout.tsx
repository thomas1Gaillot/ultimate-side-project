'use client'
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {usePathname, useRouter} from "next/navigation";

const tabData = [
    {id: "proposal", label: "1. Je propose un prix de vente", href: "/poc-enostart/my-demarches/vente/proposal"},
    {id: "contract-edition", label: "2. J'édite les contrats de vente", href: "/poc-enostart/my-demarches/vente/contract-edition"},
];

export default function TabsLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="w-full">
            <div className="w-full rounded h-48 bg-gray-50 flex items-center justify-center">
                <span>Choix du plan - Vente</span>
            </div>
            <Tabs value={pathname || ''} className="w-full flex">
                <TabsList className="w-max flex items-stretch bg-background">
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
            </Tabs>
            <div className="w-full">
                {children}
            </div>
        </div>
    );
}
