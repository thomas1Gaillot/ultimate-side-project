import {create} from "zustand";

interface DocumentState {
    bulletin: any | null;
    setBulletin: (contract: any) => void;
}

const useStoredBulletin = create<DocumentState>((set) => ({
    bulletin: null,
    setBulletin: (contract: any) => set(state => ({bulletin: contract}))
}))

function useBulletinDocument() {
    const {bulletin, setBulletin} = useStoredBulletin()
    const dumbBulletin = {
        associationName: "Association des parents d'élèves",
        email: "asso@enogrid.com",
        rna: 'W123456789',
        address: 'Rue de Pornic 44250 Saint-Brevin-les-Pins',
        projetName: "Projet d'énergie renouvelable",
        cotisation: {
            amount: 1000,
            paiementMethod: 'virement',
            IBAN: 'FR123456789',
            BIC: 'BIC123456789',
        },
    }

    function postBulletin() {
        setBulletin(dumbBulletin)
    }

    return {
        document :  bulletin,
        isEdited: bulletin !== null,
        postBulletin
    }
}

export {useBulletinDocument}