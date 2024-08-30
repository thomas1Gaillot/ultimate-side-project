'use client'
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

export default function CreateContractAccordion() {
    return (
        <AccordionItem value="bulletin">
            <AccordionTrigger
                className="text-lg font-semibold">
                <div className={"flex"}>
                    {"Je créé mes contrats de vente"}
                </div>
            </AccordionTrigger>
            <AccordionContent className={"p-8 gap-4 grid"}>
                Contrats de vente flow
            </AccordionContent>
        </AccordionItem>
    )
}