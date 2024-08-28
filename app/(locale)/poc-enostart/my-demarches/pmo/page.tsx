import PMOPlan from "@/app/(locale)/poc-enostart/my-demarches/pmo/component/pmo-plan";
import PmoCreation from "@/app/(locale)/poc-enostart/my-demarches/pmo/component/pmo-creation";
import Bulletin from "@/app/(locale)/poc-enostart/my-demarches/pmo/component/bulletin";

export default function PmoPage() {
    return (
        <div className="grid gap-4">
            <PMOPlan/>
            <PmoCreation/>
            <Bulletin/>
        </div>
    );
}
