import {useState} from "react";
import {DemoDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/document";

function usePmoDocument() {
    const [pmo, setPmo] = useState<DemoDocument | null>(null)
    const dumbPmoDocument: DemoDocument = {
        id: '1',
        name: 'ma_pmo.pdf',
        url: 'https://www.google.com',
        size: 1000,
        type: 'application/pdf'
    }

    function upload() {
        setPmo(dumbPmoDocument)
    }

    return {
        pmo,
        isCreated : pmo !== null,
        upload
    }
}
export {usePmoDocument}