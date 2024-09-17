import {useState} from "react";
import {DemoDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/document";
import {create} from "zustand";

interface DocumentState {
    accords: DemoDocument | null;
    setAccords: (contract: DemoDocument) => void;
}

const useStoredAccords = create<DocumentState>((set) => ({
    accords: null,
    setAccords: (contract: DemoDocument) => set(state => ({accords: contract}))
}))

function useAccordsDocument() {
    const {accords, setAccords} = useStoredAccords()
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
        document : accords,
        isCreated: accords !== null,
        upload
    }
}
export {useAccordsDocument}