"use client";

import {usePathname, useRouter} from "next/navigation";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useDocuments} from "@/app/(locale)/poc-enostart/data/documents/use-documents";
import {CheckCircledIcon} from "@radix-ui/react-icons";
import {cn} from "@/lib/utils";
import AccordsPlan from "@/app/(locale)/poc-enostart/my-demarches/enedis/accords/components/accords-plan";



export default function TabsLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const {isPmoCreated, isAccordsParticipationEdited, isDeclarationSent} = useDocuments()
    const enedisTabs = [
        {id: "accords", label: "Accords de participation", href: "/poc-enostart/my-demarches/enedis/accords",  done : isPmoCreated && isAccordsParticipationEdited},
        {id: "enedis", label: "Déclaration de mise en oeuvre", href: "/poc-enostart/my-demarches/enedis/enedis", done : isDeclarationSent},
        {id: "convention", label: "Convention ACC", href: "/poc-enostart/my-demarches/enedis/convention"},
    ]
    return (
        <div className="flex flex-col w-full gap-8">
            {/*<AccordsPlan/>*/}

            <Tabs value={pathname || ''} className="w-full flex">
                <TabsList className=" flex items-stretch bg-background">
                    {enedisTabs.map((tab, index) => (
                        <TabsTrigger
                            onClick={() => router.push(tab.href)}
                            key={tab.id}
                            value={tab.href}
                            className={cn("justify-start px-4 py-4 text-left hover:bg-muted",
                                index === 3 && 'mt-4')}
                        >
                            {tab.label}
                            {tab.done && <CheckCircledIcon className="size-4 text-green-500 ml-2"/>}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
            <div className="w-full ">
                {children}
            </div>
        </div>
    );
}
