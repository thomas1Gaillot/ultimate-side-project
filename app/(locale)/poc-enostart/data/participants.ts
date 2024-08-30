import {EnedisStatus} from "./enedis-status"
import {PmoStatus} from "@/app/(locale)/poc-enostart/data/pmo-status";
import {SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import {create} from "zustand";

export type Participant = {
    id: number,
    name: string,
    perimeter: string,
    consumption: number,
    exportDate: string | null,
    status: 'candidature' | 'pre-integre' | 'exploitation' | 'refuse',
    pmo: PmoStatus,
    enedis: EnedisStatus,
    sales: SalesStatus,
}

const initialParticipants: Participant[] = [
    {
        id: 1,
        name: "Alice Dupont",
        perimeter: "1.67 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        pmo: PmoStatus.IdentifierLaPmo,
        enedis: EnedisStatus.IdentifierLaPmo,
        sales: SalesStatus.ProposerUnPrix
    },
    {
        id: 2,
        name: "Bob Martin",
        perimeter: "0.45 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        pmo: PmoStatus.IdentifierLaPmo,
        enedis: EnedisStatus.IdentifierLaPmo,
        sales: SalesStatus.ProposerUnPrix
    },
    {
        id: 3,
        name: "Claire Leroy",
        perimeter: "2.1 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        pmo: PmoStatus.IdentifierLaPmo,
        enedis: EnedisStatus.IdentifierLaPmo,
        sales: SalesStatus.ProposerUnPrix
    }
]

interface ParticipantsStore {
    participants: Participant[];
    setParticipants: (participants: Participant[]) => void;
}

export const useStoredParticipants = create<ParticipantsStore>((set) => ({
    participants: initialParticipants,
    setParticipants: (participants: Participant[]) => {
        set({participants});
    },
}));

const parse = (participants: Participant[]) => {
    if (participants.length === 0) return {
        candidatures: [],
        preIntegres: [],
        exploitation: [],
        refuses: []
    }
    return {
        candidatures: participants.filter(p => p.status === 'candidature'),
        preIntegres: participants.filter(p => p.status === 'pre-integre'),
        exploitation: participants.filter(p => p.status === 'exploitation'),
        refuses: participants.filter(p => p.status === 'refuse'),
    }
}

const useParticipants = () => {
    const {participants} = useStoredParticipants()

    function accept(id: number) {
        const participant = participants.find(p => p.id === id)
        if (participant) {
            participant.status = 'pre-integre'
            useStoredParticipants.getState().setParticipants([...participants])
        }
    }

    function reject(id: number) {
        const participant = participants.find(p => p.id === id)
        if (participant) {
            participant.status = 'refuse'
            useStoredParticipants.getState().setParticipants([...participants])
        }
    }

    function exportData(id: number) {
        const participant = participants.find(p => p.id === id)
        if (participant) {
            participant.exportDate = "Aujourd'hui"
            useStoredParticipants.getState().setParticipants([...participants])
        }
    }

    function sendDocument(id: number) {
        const participant = participants.find(p => p.id === id)
        if (participant) {
            participant.pmo = PmoStatus.BulletinEnvoye;
            participant.enedis = EnedisStatus.AccordEnvoye;
            participant.sales = SalesStatus.ContratEnvoye;
            useStoredParticipants.getState().setParticipants([...participants])
        }
    }

    function proposePrice(id: number) {
        const participant = participants.find(p => p.id === id)
        if (participant) {
            participant.sales = SalesStatus.PrixPropose
            useStoredParticipants.getState().setParticipants([...participants])
        }
    }

    function consumerAcceptPrice(id: number) {
        const participant = participants.find(p => p.id === id)
        if (participant) {
            participant.sales = SalesStatus.AssocierLeContrat
            useStoredParticipants.getState().setParticipants([...participants])
        }
    }

    return {...parse(participants), accept, reject, exportData, sendDocument, proposePrice, consumerAcceptPrice}
}
export {parse, useParticipants}
