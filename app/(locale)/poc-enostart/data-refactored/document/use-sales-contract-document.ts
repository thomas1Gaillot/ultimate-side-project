import {useState} from "react";
import {DemoDocument, SalesDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/document";
import {create} from "zustand";

const dumbSalesContracts: SalesDocument[] = [
    {
        name: 'Contrat consommateur type particulier',
        duration: 'indéterminée',
        price: '0.12€/kWh',
        indexation: '% variable INSEE',
        moreInfo: false
    },
    {
        name: 'Contrat consommateur type professionnel, avec penalité',
        duration: '5 ans',
        price: '0.11 €/kWh',
        indexation: '% variable INSEE',
        moreInfo: true
    },
]

interface DocumentState {
    salesContract: SalesDocument[];
    propositionContracts: DemoDocument[];
    setPropositionContracts: (contract: DemoDocument[]) => void;
    setSalesContract: (contract: SalesDocument[]) => void;
}

const useStoredDocuments = create<DocumentState>((set) => ({
    salesContract: [],
    setPropositionContracts: (contract: DemoDocument[]) => set(state => ({propositionContracts: contract})),
    propositionContracts: [],
    setSalesContract: (contract: SalesDocument[]) => set(state => ({salesContract: contract}))
}))


function useSalesContractDocument() {
    const {salesContract, propositionContracts, setSalesContract} = useStoredDocuments()

    function create() {
        setSalesContract(dumbSalesContracts)
    }

    return {
        documents : salesContract,
        propositionDocuments : propositionContracts,
        hasOneContract: salesContract.length > 0,
        create
    }
}

export default useSalesContractDocument;