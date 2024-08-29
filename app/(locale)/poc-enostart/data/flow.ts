import {EnedisStatus} from "@/app/(locale)/poc-enostart/data/enedis-status";
import {SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import {PmoStatus} from "@/app/(locale)/poc-enostart/data/pmo-status";
import {parse, Participant} from "./participants";

export type Step = {
    label: string,
    href: string,
    done?: boolean,
    numberOfTaskDone?: number,
    numberOfTask?: number,
    disabled?: boolean
}

const participantsTab = (participants: Participant[]) => {
    const {candidatures} = parse(participants)
    const hasSalesThingsToDo = participants.some(p => p.status === 'pre-integre' &&
        (p.sales === SalesStatus.ProposerUnPrix || p.sales === SalesStatus.PrixPropose || p.sales === SalesStatus.EditerLeContrat || p.sales === SalesStatus.EnvoyerLeContrat))
    return [
        {
            id: "nouvelles-candidatures",
            label: "J'accepte les candidatures",
            ping: candidatures.length > 0,
            number: candidatures.length
        },
        {id: "pre-integrations", label: "Je propose mes conditions de vente ", ping: hasSalesThingsToDo},
        {id: "documents", label: "Je fais signer mes documents", ping: false},
        {id: "passages-en-exploitation", label: "Je gère mon opération auprès d'Enedis", ping: false},
    ]
}
const demarchesTabs = (isBulletinEdited: boolean, isAccordsEdited : boolean) =>  [
    {id: "demarches", label: "Je crée ma PMO", ping: !isBulletinEdited || !isAccordsEdited},
    {id: "declaration", label: "Je déclare mon opération", ping: true},
]

const candidatures_flow = (p: Participant[]) => {
    const {candidatures, preIntegres} = parse(p)
    const numberOfCandidatures = candidatures.length
    const numberOfPreIntegres = preIntegres.length
    const numberOfPreIntegresWithDataLoaded = preIntegres.filter(p => p.exportDate !== null).length
    const steps: Step[] = [
        {label: 'Je vérifie le périmètre', href: '/poc-enostart/my-perimeter', disabled : numberOfCandidatures === 0},
        {
            label: "J'accepte les consommateurs",
            href: '/poc-enostart/my-participants/candidatures',
            numberOfTask : numberOfCandidatures,
            numberOfTaskDone : 0,
            disabled : numberOfCandidatures === 0
        },
        {
            label: "J'exporte les données pour étude (optionnel)",
            href: '/poc-enostart/my-participants/pre-integres',
            numberOfTaskDone: numberOfPreIntegresWithDataLoaded,
            numberOfTask: numberOfPreIntegres,
            disabled : numberOfPreIntegres === 0
        },
    ]
    return {
        number: numberOfCandidatures,
        steps
    }
}

const sales_flow = (p: Participant[]) => {
    const {preIntegres} = parse(p)
    const numberOfPreIntegresProposerUnPrix = preIntegres
        .filter(p => p.sales === SalesStatus.ProposerUnPrix).length
    const numberOfPreIntegresWithPriceProposed = preIntegres
        .filter(p => p.sales === SalesStatus.PrixPropose).length
    const numberOfPreIntegresWithPriceAccepted = preIntegres
        .filter(p => p.sales === SalesStatus.EditerLeContrat).length
    const numberOfEditedContract = preIntegres
        .filter(p => p.sales === SalesStatus.EnvoyerLeContrat).length
    const total = numberOfPreIntegresProposerUnPrix + numberOfPreIntegresWithPriceProposed + numberOfPreIntegresWithPriceAccepted
    const steps: Step[] = [
        {
            label: 'Je propose un prix de vente pour chaque consommateur',
            href: '/poc-enostart/my-demarches/vente/proposal',
            numberOfTaskDone: numberOfPreIntegresWithPriceProposed,
            numberOfTask: total,
            disabled : numberOfPreIntegresProposerUnPrix === 0
        },
        {
            label: "Chaque consommateur accepte son prix de vente",
            href: '/poc-enostart/my-participants/pre-integres',
            numberOfTaskDone: numberOfPreIntegresWithPriceAccepted,
            numberOfTask: numberOfPreIntegresWithPriceProposed + numberOfPreIntegresWithPriceAccepted,
            disabled : (numberOfPreIntegresWithPriceProposed + numberOfPreIntegresWithPriceAccepted )=== 0
        },
        {
            label: "J'édite le contrat de vente pour chaque consommateur",
            href: '/poc-enostart/my-demarches/vente/contract-edition',
            numberOfTaskDone: numberOfEditedContract,
            numberOfTask: numberOfEditedContract + numberOfPreIntegresWithPriceAccepted,
            disabled : (numberOfEditedContract + numberOfPreIntegresWithPriceAccepted) === 0
        },
    ]
    return {
        steps
    }
}

const signatures_flow = (p: Participant[]) => {
    const {preIntegres} = parse(p)
    const pmoStatusTerminated = preIntegres[0] && (preIntegres[0].pmo === PmoStatus.BulletinSigne
    || preIntegres[0].pmo === PmoStatus.Ignore) ? 1 : 0
    const enedisStatusTerminated = preIntegres[0] && (preIntegres[0].enedis === EnedisStatus.Ignore
    || preIntegres[0].enedis === EnedisStatus.AccordSigne) ? 1 : 0

    const numberOfPreIntegresProposerUnPrix = preIntegres
        .filter(p => p.sales === SalesStatus.ProposerUnPrix).length
    const numberOfPreIntegresWithPriceProposed = preIntegres
        .filter(p => p.sales === SalesStatus.PrixPropose).length
    const numberOfPreIntegresWithPriceAccepted = preIntegres
        .filter(p => p.sales === SalesStatus.EditerLeContrat).length
    const numberOfEditedContract = preIntegres
        .filter(p => p.sales === SalesStatus.EnvoyerLeContrat).length
    const numberOfWaitingSignature = preIntegres
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
            href: '/poc-enostart/my-demarches/vente/contract-edition',
            numberOfTaskDone: numberOfEditedContract,
            numberOfTask: total
        },
        {
            label: "J'envoi les documents aux consommateurs pour signature",
            href: '/poc-enostart/my-participants/pre-integres',
            numberOfTaskDone: 0,
            numberOfTask: total,
            disabled: !enableStep
        },
        {
            label: "Je reçois les documents signés",
            href: '/poc-enostart/my-participants/passage-exploitation',
            numberOfTaskDone: numberOfWaitingSignature,
            numberOfTask: total,
            disabled: !enableStep
        },
    ]
    return {
        steps
    }

}

const demarches_pmo_flow = (isPmoCreated : boolean, isBulletinEdited : boolean) => {

    const steps: Step[] = [
        {
            label: "Je crée mon association PMO",
            href: '/poc-enostart/my-demarches/pmo',
            numberOfTaskDone: isPmoCreated ? 1 : 0,
            numberOfTask: 1,
            done: isPmoCreated,
        },
        {
            label: "J'édite les bulletins d'adhésion",
            href: '/poc-enostart/my-demarches/pmo',
            disabled: !isPmoCreated,
            numberOfTaskDone: isBulletinEdited ? 1 : 0,
            numberOfTask: 1,
            done : isPmoCreated && isBulletinEdited
        }
    ]
    return steps;
}

const demarches_pmo_accords = (isPmoCreated : boolean, isEdited : boolean) => {

    const steps: Step[] = [
        {
            label: "Je crée mon association PMO",
            href: '/poc-enostart/my-demarches/pmo',
            numberOfTaskDone: isPmoCreated ? 1 : 0,
            numberOfTask: 1,
            done: isPmoCreated,

        },
        {
            label: "J'édite les accords de participation",
            href: '/poc-enostart/my-demarches/accords',
            disabled: !isPmoCreated,
            numberOfTaskDone: isEdited ? 1 : 0,
            numberOfTask: 1,
            done : isPmoCreated && isEdited
        }
    ]
    return steps;
}

const declaration_flow = () => {

    const steps: Step[] = [
        {
            label: "J'envoi la déclaration de mise en oeuvre",
            href: '/poc-enostart/my-demarches/enedis',
            numberOfTaskDone : 0,
            numberOfTask : 1,
            done : false,
            disabled: false
        },
        {
            label: "Je renseigne le numéro NOVA de mon opération",
            href: '/poc-enostart/my-demarches/enedis',
            disabled: true,
            numberOfTaskDone : 0,
            numberOfTask : 1,
            done : false,
        }
    ]
    return steps;
}
export {
    participantsTab,
    demarchesTabs,
    candidatures_flow,
    sales_flow,
    signatures_flow,
    demarches_pmo_flow,
    demarches_pmo_accords,
    declaration_flow
}