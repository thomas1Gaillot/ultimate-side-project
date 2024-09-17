import {DemoDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/document";
import {create} from "zustand";

interface DocumentState {
    statutPmo: DemoDocument | null;
    setStatutPmo: (contract: DemoDocument) => void;
}

const useStoredStatutPmo = create<DocumentState>((set) => ({
    statutPmo:null,
    setStatutPmo: (contract: DemoDocument) => set(state => ({statutPmo: contract}))
}))

function usePmoDocument() {
    const {statutPmo, setStatutPmo} = useStoredStatutPmo()
    const dumbPmoDocument: DemoDocument = {
        id: '1',
        name: 'ma_pmo.pdf',
        url: 'https://www.google.com',
        size: 1000,
        type: 'application/pdf'
    }

    function upload() {
        setStatutPmo(dumbPmoDocument)
    }

    return {
        document : statutPmo,
        isCreated : statutPmo !== null,
        upload
    }
}
export {usePmoDocument}