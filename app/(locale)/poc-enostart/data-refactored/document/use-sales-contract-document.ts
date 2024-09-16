import {useState} from "react";
import {SalesDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/document";


function useSalesContractDocument() {
    const [salesContract, setSalesContract] = useState<SalesDocument[]>([])
    const dumbSalesContract: SalesDocument = {
        name: 'contrat.pdf',
        duration: '1 an',
        price: '1000€',
        indexation: 'indice',
        moreInfo: true
    }

    function create() {
        setSalesContract([dumbSalesContract])
    }

    return {
        salesContract,
        hasOneContract: salesContract.length > 0,
        create
    }
}

export default useSalesContractDocument;