'use client'
import AccordsParticipation
    from "@/app/(locale)/poc-enostart/my-demarches/enedis/accords/components/accords-participation";
import {Accordion} from "@/components/ui/accordion";
import AccordsStepper from "@/app/(locale)/poc-enostart/my-demarches/enedis/accords/components/accords-stepper";

export default function AccordsPage() {
    return (
        <div className="max-w-4xl space-y-4">
            <AccordsStepper/>
            <Accordion type="single" collapsible className="w-full grid gap-4 max-w-4xl">
                <AccordsParticipation/>
            </Accordion>
        </div>
    );
}
