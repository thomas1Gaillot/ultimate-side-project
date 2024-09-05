'use client'
import {useRouter} from "next/navigation";
import AccordsPlan from "@/app/(locale)/poc-enostart/my-demarches/enedis/accords/components/accords-plan";
import {Accordion} from "@/components/ui/accordion";
import AssociateContractAccordion
    from "@/app/(locale)/poc-enostart/my-demarches/vente/components/associate-contract-accordion";
import CreateContractAccordion
    from "@/app/(locale)/poc-enostart/my-demarches/vente/components/create-contract-accordion";
import SendPriceAccordion from "@/app/(locale)/poc-enostart/my-demarches/vente/components/send-price-accordion";

export default function Page() {
    const router = useRouter();

    return (
        <div className="w-full">
            {/*<AccordsPlan/>*/}
            <Accordion type="single" collapsible className="w-full">
                <CreateContractAccordion/>
                <SendPriceAccordion/>
                <AssociateContractAccordion/>
            </Accordion>
        </div>
    );
}