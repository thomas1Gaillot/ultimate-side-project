'use client'
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

export default function SendPriceAccordion() {
    return (
        <AccordionItem value="send-price">
            <AccordionTrigger
                className="text-lg font-semibold">
                <div className={"flex"}>
                    {"1. Je propose un prix de vente"}
                </div>
            </AccordionTrigger>
            <AccordionContent className={"p-8 gap-4 grid"}>
                Flow Proposition de prix de vente
            </AccordionContent>
        </AccordionItem>
    )
}