import {participants} from "@/app/(locale)/poc-enostart/data/participants";

const participantsTab = [
    {id: "nouvelles-candidatures", label: "J'accepte les candidatures", ping: true},
    {id: "pre-integrations", label: "Je propose mes conditions de vente ", ping: true},
    {id: "documents", label: "Je fais signer mes documents", ping: true},
    {id: "passages-en-exploitation", label: "Je gère mon opération auprès d'Enedis", ping: false},
]
const demarchesTabs = [
    {id: "demarches", label: "Je crée ma PMO et déclare mon projet", ping: true},
]
export type Step = {
    label: string,
    href: string,
    done?: boolean,
    numberOfTaskDone?: number,
    numberOfTask?: number
}
const candidatures_flow = () => {
    const numberOfCandidatures = participants.candidatures.length
    const numberOfPreIntegres = participants.preIntegres.length
    const numberOfPreIntegresWithDataLoaded = participants.preIntegres.filter(p => p.exportDate !== "-").length
    const steps: Step[] = [
        {label: 'Je vérifie le périmètre', href: '/poc-enostart/my-perimeter'},
        {label: "J'accepte les consommateurs", href: '/poc-enostart/my-participants/candidatures', done : numberOfCandidatures === 0},
        {label: "Je télécharge les données pour étude", href: '/poc-enostart/my-participants/pre-integres', numberOfTaskDone : numberOfPreIntegresWithDataLoaded , numberOfTask :numberOfPreIntegres },
    ]
    return {
        number : numberOfCandidatures ,
        steps
    }
}


export {participantsTab, demarchesTabs, candidatures_flow}