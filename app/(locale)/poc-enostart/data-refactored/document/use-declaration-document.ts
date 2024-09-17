import {useState} from "react";
import {DemoDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/document";
import {create} from "zustand";
interface DocumentState {
    declaration: DemoDocument | null;
    setDeclaration: (contract: DemoDocument) => void;
}
const useStoredDeclaration = create<DocumentState>((set) => ({
    declaration:null,
    setDeclaration: (contract: DemoDocument) => set(state => ({declaration: contract}))
}))

function useDeclarationDocument() {
    const {declaration, setDeclaration} = useStoredDeclaration()
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
        document : declaration,
        isEdited : declaration !== null,
        upload
    }
}
export {useDeclarationDocument}