import {EnedisStatus} from "./enedis-status"
import {PmoStatus} from "@/app/(locale)/poc-enostart/data/pmo-status";
import {SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import {create} from "zustand";

export type Participant = {
    id: number,
    name: string,
    perimeter: string,
    consumption: number,
    exportDate: string,
    status: 'candidature' | 'pre-integre' | 'passage-exploitation' | 'integre' | 'refuse',
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
        exportDate: "-",
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
        exportDate: "05 Juillet 2024",
        status: 'candidature',
        pmo: PmoStatus.IdentifierLaPmo,
        enedis: EnedisStatus.IdentifierLaPmo,
        sales: SalesStatus.PrixPropose
    },
    {
        id: 3,
        name: "Claire Leroy",
        perimeter: "2.1 km",
        consumption: 4500,
        exportDate: "05 Juillet 2024",
        status: 'candidature',
        pmo: PmoStatus.IdentifierLaPmo,
        enedis: EnedisStatus.IdentifierLaPmo,
        sales: SalesStatus.PrixPropose
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
    if(participants.length === 0) return {
        candidatures: [],
        preIntegres: [],
        passageExploitation: [],
        integres: [],
        refuses: []
    }
    return {
        candidatures: participants.filter(p => p.status === 'candidature'),
        preIntegres: participants.filter(p => p.status === 'pre-integre'),
        passageExploitation: participants.filter(p => p.status === 'passage-exploitation'),
        integres: participants.filter(p => p.status === 'integre'),
        refuses: participants.filter(p => p.status === 'refuse'),
    }
}

const useParticipants = () => {
    const {participants, setParticipants} = useStoredParticipants()

}
export {parse, useParticipants}


// const candidatures: Participant[] = [
//     {id: 1, name: "JK Rowling", perimeter: "1.67 km", consumption: 14500},
//     {id: 2, name: "George Lucas", perimeter: "2.40 km", consumption: 7000},
//     {id: 3, name: "Steve Jobs", perimeter: "0.45 km", consumption: 14500},
//     {id: 4, name: "Henry Cavill", perimeter: "0.12 km", consumption: 6000},
//
// ]
// const preIntegres: Participant[] = [
//     {
//         id: 1,
//         name: "Alice Dupont",
//         perimeter: "1.67 km",
//         consumption: 4500,
//         exportDate: "-",
//         pmo: PmoStatus.IdentifierLaPmo,
//         enedis: EnedisStatus.IdentifierLaPmo,
//         sales: SalesStatus.ProposerUnPrix
//     },
//     {
//         id: 2,
//         name: "Bob Martin",
//         perimeter: "0.45 km",
//         consumption: 4500,
//         exportDate: "05 Juillet 2024",
//         pmo: PmoStatus.IdentifierLaPmo,
//         enedis: EnedisStatus.IdentifierLaPmo,
//         sales: SalesStatus.PrixPropose
//     },
//     {
//         id: 3,
//         name: "Claire Leroy",
//         perimeter: "2.1 km",
//         consumption: 4500,
//         exportDate: "05 Juillet 2024",
//         pmo: PmoStatus.IdentifierLaPmo,
//         enedis: EnedisStatus.IdentifierLaPmo,
//         sales: SalesStatus.PrixPropose
//     },
// ]
// const passageExploitation = [
//     {id: 1, name: "Jean Reno", perimeter: "1.67 km", consumption: 14500},
// ]
// const integres: Participant[] = [
//     {id: 1, name: "Gilles Lelouche", perimeter: "1.67 km", consumption: 14500},
// ]
// const refuses = [
//     {id: 1, name: "Jean Dupont", email: "alice@example.com"},
//     {id: 2, name: "Toto Martin", email: "bob@example.com"},
// ]

