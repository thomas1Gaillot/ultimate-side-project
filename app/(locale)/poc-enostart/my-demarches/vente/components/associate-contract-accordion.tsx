'use client'
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

export default function AssociateContractAccordion() {
    return (
        <AccordionItem value="associate-contract-to-participant">
            <AccordionTrigger
                className="text-lg font-semibold">
                <div className={"flex"}>
                    {"2. J'associe un contrat de vente à chaque consommateur"}
                </div>
            </AccordionTrigger>
            <AccordionContent className={"p-8 gap-4 grid"}>
                Flow J'associe un contrat de vente à chaque consommateur
            </AccordionContent>
        </AccordionItem>
    )
}