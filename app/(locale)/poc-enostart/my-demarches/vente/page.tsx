'use client'
import {useSearchParams} from "next/navigation";
import {Accordion} from "@/components/ui/accordion";
import AssociateContractAccordion
    from "@/app/(locale)/poc-enostart/my-demarches/vente/components/associate-contract-accordion";
import CreateContractAccordion
    from "@/app/(locale)/poc-enostart/my-demarches/vente/components/create-contract-accordion";
import SendPriceAccordion from "@/app/(locale)/poc-enostart/my-demarches/vente/components/send-price-accordion";

export default function Page() {
    const searchParams = useSearchParams()
    const tab = searchParams?.get('tab') || 'create-contract'
    return (
        <div className="w-full">
            {/*<AccordsPlan/>*/}
            <Accordion value={tab} type="single" collapsible className="w-full">
                <CreateContractAccordion/>
                <SendPriceAccordion/>
                <AssociateContractAccordion/>
            </Accordion>
        </div>
    );
}