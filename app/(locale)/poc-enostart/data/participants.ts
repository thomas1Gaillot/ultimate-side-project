import {EnedisStatus, PmoStatus, SalesStatus} from "./status"

export type Participant = {
    id: number,
    name: string,
    perimeter: string,
    consumption: number,
    exportDate?: string,
    pmo?: PmoStatus,
    enedis?: EnedisStatus,
    sales?: SalesStatus,
}

const candidatures: Participant[] = [
    {id: 1, name: "JK Rowling", perimeter: "1.67 km", consumption: 14500},
    {id: 2, name: "George Lucas", perimeter: "2.40 km", consumption: 7000},
    {id: 3, name: "Steve Jobs", perimeter: "0.45 km", consumption: 14500},
    {id: 4, name: "Henry Cavill", perimeter: "0.12 km", consumption: 6000},

]
const preIntegres: Participant[] = [
    {
        id: 1,
        name: "Alice Dupont",
        perimeter: "1.67 km",
        consumption: 4500,
        exportDate: "-",
        pmo: PmoStatus.IdentifierLaPmo,
        enedis: EnedisStatus.EditerLAccord,
        sales: SalesStatus.ProposerUnPrix
    },
    {
        id: 2,
        name: "Bob Martin",
        perimeter: "0.45 km",
        consumption: 4500,
        exportDate: "05 Juillet 2024",
        pmo: PmoStatus.IdentifierLaPmo,
        enedis: EnedisStatus.EditerLAccord,
        sales: SalesStatus.PrixPropose
    },
    {
        id: 3,
        name: "Claire Leroy",
        perimeter: "2.1 km",
        consumption: 4500,
        exportDate: "05 Juillet 2024",
        pmo: PmoStatus.IdentifierLaPmo,
        enedis: EnedisStatus.EditerLAccord,
        sales: SalesStatus.PrixPropose
    },
]
const passageExploitation = [
    {id: 1, name: "Jean Reno", perimeter: "1.67 km", consumption: 14500},
]
const integres: Participant[] = [
    {id: 1, name: "Gilles Lelouche", perimeter: "1.67 km", consumption: 14500},
]
const refuses = [
    {id: 1, name: "Jean Dupont", email: "alice@example.com"},
    {id: 2, name: "Toto Martin", email: "bob@example.com"},
]

const participants = {
    candidatures,
    preIntegres,
    passageExploitation,
    integres,
    refuses
}
export {participants}