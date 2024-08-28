'use client'
import {create} from "zustand";

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
    accordsParticipation: Document;
    setAccordsParticipation: (document: Document) => void;
    setBulletinDocument: (document: Document) => void;
    setStatutPmo: (document: Document) => void;
    setReglementInterieur: (document: Document) => void;
}


export const useStoredDocuments = create<Documents>((set) => ({
    statutPmo: {
        name: "Statut PMO",
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
    const {statutPmo, reglementInterieur, bulletin, accordsParticipation} = useStoredDocuments()
    const isPmoCreated = statutPmo.status === "check"
    const isBulletinEdited = bulletin.status === "check"
    const isAccordsParticipationEdited = accordsParticipation.status === "check"
    return {statutPmo, isPmoCreated, reglementInterieur, bulletin, isBulletinEdited, isAccordsParticipationEdited}
}

export {useDocuments}