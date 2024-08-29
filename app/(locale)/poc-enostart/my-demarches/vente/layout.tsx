'use client'
import {usePathname, useRouter} from "next/navigation";
import AccordsPlan from "@/app/(locale)/poc-enostart/my-demarches/enedis/accords/components/accords-plan";
import {Accordion, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";

const tabData = [
    {id: "proposal", label: "1. Je propose un prix de vente", href: "/poc-enostart/my-demarches/vente/proposal"},
    {
        id: "contract-edition",
        label: "2. J'édite les contrats de vente",
        href: "/poc-enostart/my-demarches/vente/contract-edition"
    },
];

export default function TabsLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <div className="w-full">
            <AccordsPlan/>
            <div className="w-full max-w-4xl">
                <div>
                    <Button variant={'secondary'}
                        onClick={() => router.push("/poc-enostart/my-demarches/vente/proposal")}
                        key={"proposal"} className="text-lg font-semibold">
                        <div className={"flex"}>
                            {"1. Je propose un prix de vente"}
                        </div>
                    </Button>
                </div>
                <div>
                    <Button variant={'secondary'}
                        onClick={() => router.push("/poc-enostart/my-demarches/vente/contract-edition")}
                        key={"contract-edition"} className="text-lg font-semibold">
                        <div className={"flex"}>
                            {"2. J'édite les contrats de vente"}
                        </div>
                    </Button>
                </div>
                {children}


            </div>
        </div>
    );
}
