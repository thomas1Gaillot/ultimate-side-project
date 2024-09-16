import {initialPrestations} from "@/app/(locale)/poc-enostart/data-refactored/prestations/data";
import {useState} from "react";
import {PlanStatus} from "@/app/(locale)/poc-enostart/data-refactored/prestations/plan-status";

function usePrestations() {
    const [pmo, setPmo] = useState(initialPrestations.pmo);
    const [enedis, setEnedis] = useState(initialPrestations.enedis);
    const [sales, setSales] = useState(initialPrestations.sales);

    const hasDisabled = pmo === PlanStatus.Ignore || enedis === PlanStatus.Ignore || sales === PlanStatus.Ignore;

    function subscribeTo(plan: 'pmo' | 'enedis' | 'sales') {
        switch (plan) {
            case 'pmo':
                setPmo(PlanStatus.ChoisirUnPlan);
                break;
            case 'enedis':
                setEnedis(PlanStatus.ChoisirUnPlan);
                break;
            case 'sales':
                setSales(PlanStatus.ChoisirUnPlan);
                break;
        }
    }

    function ignore(plan: 'pmo' | 'enedis' | 'sales') {
        switch (plan) {
            case 'pmo':
                setPmo(PlanStatus.Ignore);
                break;
            case 'enedis':
                setEnedis(PlanStatus.Ignore);
                break;
            case 'sales':
                setSales(PlanStatus.Ignore);
                break;
        }
    }


    return {
        pmo,
        enedis,
        sales,
        hasDisabled,
        subscribeTo,
        ignore
    };
}