'use client'
import {useSearchParams} from "next/navigation";
import {Accordion} from "@/components/ui/accordion";
import AssociateContractAccordion
    from "@/app/(locale)/poc-enostart/my-demarches/vente/components/associate-contract-accordion";
import CreateContractAccordion
    from "@/app/(locale)/poc-enostart/my-demarches/vente/components/create-contract-accordion";
import SendPriceAccordion from "@/app/(locale)/poc-enostart/my-demarches/vente/components/send-price-accordion";
import {Suspense} from 'react'

export default function Page() {

    return (
        <div className="w-full">
            {/*<AccordsPlan/>*/}
            <AccordionPlan/>
        </div>
    );
}

function AccordionPlan() {
    const searchParams = useSearchParams()
    const tab = searchParams?.get('tab') || 'create-contract'
    return <Suspense>
        <Accordion value={tab} type="single" collapsible className="w-full">
            <CreateContractAccordion/>
            <SendPriceAccordion/>
            <AssociateContractAccordion/>
        </Accordion>
    </Suspense>
}