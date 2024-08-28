import AccordsPlan from "@/app/(locale)/poc-enostart/my-demarches/accords/components/accords-plan";
import PmoCreation from "@/app/(locale)/poc-enostart/my-demarches/pmo/component/pmo-creation";
import AccordsParticipation from "@/app/(locale)/poc-enostart/my-demarches/accords/components/accords-participation";

export default function AccordsPage() {
    return (
        <div className="grid gap-4">
            <AccordsPlan/>
            <PmoCreation/>
            <AccordsParticipation/>
        </div>
    );
}
