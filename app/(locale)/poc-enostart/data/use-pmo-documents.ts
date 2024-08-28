'use client'
import {create} from "zustand";

type Document = {
    name: string;
    status: string;
    document: string;
    actions: string[];

}

interface PmoDocuments {
    statutPmo: Document;
    reglementInterieur: Document;
    bulletin: Document;
    setBulletinDocument: (document: Document) => void;
    setStatutPmo: (document: Document) => void;
    setReglementInterieur: (document: Document) => void;
}



export const usePmoStoredDocuments = create<PmoDocuments>((set) => ({
    statutPmo : {
        name: "Statut PMO",
        status: "à téléverser",
        document: "",
        actions: ["Téléverser en pdf", "Visualiser"]
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
    setBulletinDocument: (document: Document) => set(state => ({bulletin: document})),
    setStatutPmo: (document: Document) => set(state => ({statutPmo: document})),
    setReglementInterieur: (document: Document) => set(state => ({reglementInterieur: document})),
}));


function usePmoDocuments(){
    const {statutPmo, reglementInterieur, bulletin} = usePmoStoredDocuments()
    const isPmoCreated = statutPmo.status === "check"
    const isBulletinEdited = bulletin.status === "check"
    return {statutPmo,isPmoCreated, reglementInterieur, bulletin, isBulletinEdited}
}

export {usePmoDocuments}