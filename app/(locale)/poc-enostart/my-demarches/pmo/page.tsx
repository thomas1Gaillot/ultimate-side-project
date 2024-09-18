'use client'
import PmoCreationAccordionItem
    from "@/app/(locale)/poc-enostart/my-demarches/pmo/component/pmo-creation-accordion-item";
import BulletinAccordionItem from "@/app/(locale)/poc-enostart/my-demarches/pmo/component/bulletin-accordion-item";
import {Accordion} from "@/components/ui/accordion";
import {PmoSteps} from "@/app/(locale)/poc-enostart/my-demarches/pmo/component/pmo-description-dialog";
import {useSearchParams} from "next/navigation";
import {Suspense, useState} from "react";
import PMOStepper from "@/app/(locale)/poc-enostart/my-demarches/pmo/component/pmo-stepper";

export default function PmoPage() {
    return (
        <div className="max-w-4xl space-y-4">
            <Suspense>
                <AccordionPMO/>
            </Suspense>
        </div>
    );
}

function AccordionPMO() {
    const searchParams = useSearchParams()
    const tab = searchParams?.get('tab') || 'create-pmo'
    return <Accordion type="single" value={tab} collapsible className="w-full">
        <PMOStepper/>
        <PmoCreationAccordionItem/>
        <BulletinAccordionItem/>
    </Accordion>

}



