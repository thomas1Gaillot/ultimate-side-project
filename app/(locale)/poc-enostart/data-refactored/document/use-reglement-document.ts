import {useState} from "react";
import {DemoDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/document";
import {create} from "zustand";
interface DocumentState {
    reglement: DemoDocument | null;
    setReglement: (contract: DemoDocument) => void;
}
const useStoredReglement = create<DocumentState>((set) => ({
    reglement:null,
    setReglement: (contract: DemoDocument) => set(state => ({reglement: contract}))
}))

function useReglementDocument(){
    const {reglement, setReglement} = useStoredReglement()
    const dumbReglementDocument: DemoDocument = {
        id: '1',
        name: 'reglement.pdf',
        url: 'https://www.google.com',
        size: 1000,
        type: 'application/pdf'
    }
    function upload() {
        setReglement(dumbReglementDocument)
    }
    return {
        document : reglement,
        isCreated: reglement !== null,
        upload
    }
}

export {useReglementDocument}