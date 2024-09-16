import {useState} from "react";
import {DemoDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/document";

function useAccordsDocument() {
    const [accords, setAccords] = useState<DemoDocument | null>(null)
    const dumbAccordsDocument: DemoDocument = {
        id: '1',
        name: 'accords.pdf',
        url: 'https://www.google.com',
        size: 1000,
        type: 'application/pdf'
    }

    function upload() {
        setAccords(dumbAccordsDocument)
    }

    return {
        accords,
        isCreated: accords !== null,
        upload
    }
}
export {useAccordsDocument}