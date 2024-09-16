import {useState} from "react";
import {DemoDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/document";

function useDeclarationDocument() {
    const [declaration, setDeclaration] = useState<DemoDocument | null>(null)
    const dumbDeclarationDocument: DemoDocument = {
        id: '1',
        name: 'declaration.pdf',
        url: 'https://www.google.com',
        size: 1000,
        type: 'application/pdf'
    }
    function upload() {
        setDeclaration(dumbDeclarationDocument)
    }
    return {
        declaration,
        isEdited : declaration !== null,
        upload
    }
}
export {useDeclarationDocument}