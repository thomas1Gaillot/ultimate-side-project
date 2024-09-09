'use client'
import {create} from "zustand";

export type ContractDocument = {
    name: string;
    duration: string;
    price: string;
    indexation: string;
    moreInfo: boolean;

}
type Document = {
    name: string;
    status: string;
    document: string;
    actions: string[];

}

interface Documents {
    statutPmo: Document;
    reglementInterieur: Document;
    bulletin: Document;
    declaration: Document;
    salesContract: ContractDocument[];
    setSalesContract: (contract: ContractDocument[]) => void;
    setDeclaration: (document: Document) => void;
    accordsParticipation: Document;
    setAccordsParticipation: (document: Document) => void;
    setBulletinDocument: (document: Document) => void;
    setStatutPmo: (document: Document) => void;
    setReglementInterieur: (document: Document) => void;
}


export const useStoredDocuments = create<Documents>((set) => ({
    salesContract: [],
    setSalesContract: (contract: ContractDocument[]) => set(state => ({salesContract: contract})),
    declaration: {
        name: "Déclaration de mise en oeuvre",
        status: "à éditer",
        document: "",
        actions: ["Éditer le fichier", "Visualiser"]
    },
    setDeclaration: (document: Document) => set(state => ({declaration: document})),
    statutPmo: {
        name: "Statuts PMO signés",
        status: "à téléverser",
        document: "",
        actions: ["Téléverser en pdf", "Visualiser"]
    },
    accordsParticipation: {
        name: "Accords de participation",
        status: "à éditer",
        document: "",
        actions: ["Éditer le fichier", "Visualiser"]
    },
    reglementInterieur: {
        name: "Règlement intérieur (facultatif)",
        status: "à téléverser",
        document: "",
        actions: ["Téléverser en pdf", "Visualiser"]
    },
    bulletin: {
        name: "Bulletin d'adhésion",
        status: "à éditer",
        document: "",
        actions: ["Éditer le fichier", "Pré-Visualiser"]
    },
    setAccordsParticipation: (document: Document) => set(state => ({accordsParticipation: document})),
    setBulletinDocument: (document: Document) => set(state => ({bulletin: document})),
    setStatutPmo: (document: Document) => set(state => ({statutPmo: document})),
    setReglementInterieur: (document: Document) => set(state => ({reglementInterieur: document})),
}));


function useDocuments() {
    const {
        statutPmo,
        reglementInterieur,
        bulletin,
        declaration,
        accordsParticipation,
        salesContract
    } = useStoredDocuments()
    const isPmoCreated = statutPmo.status === "check"
    const isBulletinEdited = bulletin.status === "check"
    const isDeclarationSent = declaration.status === "check"
    const isAccordsParticipationEdited = accordsParticipation.status === "check"
    const hasSalesContract = salesContract.length > 0
    const salesContractWithInfo = salesContract.filter(contract => contract.moreInfo)
    return {
        statutPmo,
        isPmoCreated,
        reglementInterieur,
        bulletin,
        isBulletinEdited,
        isAccordsParticipationEdited,
        isDeclarationSent,
        hasSalesContract,
        salesContractWithInfo
    }
}

export {useDocuments}