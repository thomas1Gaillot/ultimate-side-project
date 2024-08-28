import {participants} from "@/app/(locale)/poc-enostart/data/participants";
import {EnedisStatus} from "@/app/(locale)/poc-enostart/data/enedis-status";
import {SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import {PmoStatus} from "@/app/(locale)/poc-enostart/data/pmo-status";
export type Step = {
    label: string,
    href: string,
    done?: boolean,
    numberOfTaskDone?: number,
    numberOfTask?: number,
    disabled?: boolean
}

const participantsTab = [
    {
        id: "nouvelles-candidatures",
        label: "J'accepte les candidatures",
        ping: true,
        number: participants.candidatures.length
    },
    {id: "pre-integrations", label: "Je propose mes conditions de vente ", ping: true},
    {id: "documents", label: "Je fais signer mes documents", ping: true},
    {id: "passages-en-exploitation", label: "Je gère mon opération auprès d'Enedis", ping: false},
]
const demarchesTabs = [
    {id: "demarches", label: "Je crée ma PMO", ping: true},
    {id: "declaration", label: "Je déclare mon opération", ping: true},
]

const candidatures_flow = () => {
    const numberOfCandidatures = participants.candidatures.length
    const numberOfPreIntegres = participants.preIntegres.length
    const numberOfPreIntegresWithDataLoaded = participants.preIntegres.filter(p => p.exportDate !== "-").length
    const steps: Step[] = [
        {label: 'Je vérifie le périmètre', href: '/poc-enostart/my-perimeter'},
        {
            label: "J'accepte les consommateurs",
            href: '/poc-enostart/my-participants/candidatures',
            done: numberOfCandidatures === 0
        },
        {
            label: "J'exporte les données pour étude (optionnel)",
            href: '/poc-enostart/my-participants/pre-integres',
            numberOfTaskDone: numberOfPreIntegresWithDataLoaded,
            numberOfTask: numberOfPreIntegres
        },
    ]
    return {
        number: numberOfCandidatures,
        steps
    }
}

const sales_flow = () => {
    const numberOfPreIntegresProposerUnPrix = participants.preIntegres
        .filter(p => p.sales === SalesStatus.ProposerUnPrix).length
    const numberOfPreIntegresWithPriceProposed = participants.preIntegres
        .filter(p => p.sales === SalesStatus.PrixPropose).length
    const numberOfPreIntegresWithPriceAccepted = participants.preIntegres
        .filter(p => p.sales === SalesStatus.EditerLeContrat).length
    const numberOfEditedContract = participants.preIntegres
        .filter(p => p.sales === SalesStatus.EnvoyerLeContrat).length
    const total = numberOfPreIntegresProposerUnPrix + numberOfPreIntegresWithPriceProposed + numberOfPreIntegresWithPriceAccepted
    const steps: Step[] = [
        {
            label: 'Je propose un prix de vente pour chaque consommateur',
            href: '/poc-enostart/my-demarches/vente',
            numberOfTaskDone: numberOfPreIntegresWithPriceProposed,
            numberOfTask: total
        },
        {
            label: "Chaque consommateur accepte son prix de vente",
            href: '/poc-enostart/my-participants/pre-integres',
            numberOfTaskDone: numberOfPreIntegresWithPriceAccepted,
            numberOfTask: total
        },
        {
            label: "J'édite le contrat de vente pour chaque consommateur",
            href: '/poc-enostart/my-demarches/vente',
            numberOfTaskDone: numberOfEditedContract,
            numberOfTask: total
        },
    ]
    return {
        steps
    }
}

const signatures_flow = () => {
    const pmoStatusTerminated = participants.preIntegres[0].pmo === PmoStatus.BulletinSigne
        || participants.preIntegres[0].pmo === PmoStatus.Ignore ? 1 : 0
    const enedisStatusTerminated = participants.preIntegres[0].enedis === EnedisStatus.Ignore
        || participants.preIntegres[0].enedis === EnedisStatus.AccordSigne ? 1 : 0

    const numberOfPreIntegresProposerUnPrix = participants.preIntegres
        .filter(p => p.sales === SalesStatus.ProposerUnPrix).length
    const numberOfPreIntegresWithPriceProposed = participants.preIntegres
        .filter(p => p.sales === SalesStatus.PrixPropose).length
    const numberOfPreIntegresWithPriceAccepted = participants.preIntegres
        .filter(p => p.sales === SalesStatus.EditerLeContrat).length
    const numberOfEditedContract = participants.preIntegres
        .filter(p => p.sales === SalesStatus.EnvoyerLeContrat).length
    const numberOfWaitingSignature = participants.preIntegres
        .filter(p => p.sales === SalesStatus.ContratEnvoye || p.pmo === PmoStatus.BulletinEnvoye || p.enedis === EnedisStatus.AccordEnvoye).length
    const total = numberOfPreIntegresProposerUnPrix + numberOfPreIntegresWithPriceProposed + numberOfPreIntegresWithPriceAccepted + numberOfWaitingSignature
    const enableStep = pmoStatusTerminated + enedisStatusTerminated === 2 && numberOfEditedContract === total
    const steps: Step[] = [
        {
            label: "Les démarches de mon projet sont terminées",
            href: '/poc-enostart/my-demarches/pmo',
            numberOfTaskDone: pmoStatusTerminated + enedisStatusTerminated,
            numberOfTask: 2
        },
        {
            label: "Les contrats de ventes sont edités",
            href: '/poc-enostart/my-demarches/vente',
            numberOfTaskDone: numberOfEditedContract,
            numberOfTask: total
        },
        {
            label: "J'envoi les documents aux consommateurs pour signature",
            href: '/poc-enostart/my-participants/pre-integres',
            numberOfTaskDone: 0,
            numberOfTask: total,
            disabled : !enableStep
        },
        {
            label: "Je reçois les documents signés",
            href: '/poc-enostart/my-participants/passage-exploitation',
            numberOfTaskDone: numberOfWaitingSignature,
            numberOfTask: total,
            disabled : !enableStep
        },
    ]
    return {
        steps
    }

}

const demarches_pmo_flow = () => {
    const pmoCreated = participants.preIntegres[0].pmo !== PmoStatus.IdentifierLaPmo && participants.preIntegres[0].pmo !== PmoStatus.Ignore

    const steps: Step[] = [
        {
            label: "Je crée mon association PMO",
            href: '/poc-enostart/my-demarches/pmo',
            done : pmoCreated
        },
        {
            label: "J'édite les bulletins d'adhésion",
            href: '/poc-enostart/my-demarches/pmo',
            disabled : !pmoCreated
        }
    ]
    return steps;
}

const demarches_pmo_accords = () => {
    const pmoCreated = participants.preIntegres[0].pmo !== PmoStatus.IdentifierLaPmo && participants.preIntegres[0].pmo !== PmoStatus.Ignore

    const steps: Step[] = [
        {
            label: "Je crée mon association PMO",
            href: '/poc-enostart/my-demarches/pmo',
            done : pmoCreated

        },
        {
            label: "J'édite les accords de participation",
            href: '/poc-enostart/my-demarches/accords',
            disabled : !pmoCreated
        }
    ]
    return steps;
}

const declaration_flow = () => {

    const steps: Step[] = [
        {
            label: "J'envoi la déclaration de mise en oeuvre",
            href: '/poc-enostart/my-demarches/enedis',
            disabled : false
        },
        {
            label: "Je renseigne le numéro NOVA de mon opération",
            href: '/poc-enostart/my-demarches/enedis',
            disabled : true
        }
    ]
    return steps;
}
export {participantsTab, demarchesTabs, candidatures_flow, sales_flow, signatures_flow,demarches_pmo_flow, demarches_pmo_accords, declaration_flow}