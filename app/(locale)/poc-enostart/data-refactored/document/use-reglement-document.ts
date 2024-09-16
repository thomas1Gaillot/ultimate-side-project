import {useState} from "react";
import {DemoDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/document";

function useReglementDocument(){
    const [reglement, setReglement] = useState<DemoDocument | null>(null)
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
        reglement,
        isCreated: reglement !== null,
        upload
    }
}

export {useReglementDocument}