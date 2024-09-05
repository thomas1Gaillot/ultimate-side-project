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
    disabled?: boolean,
}

const participantsTab = (participants: Participant[], isBulletinEdited : boolean, isAccordsEdited : boolean) => {
    const {candidatures, preIntegres, exploitation} = parse(participants)
    const hasSalesThingsToDo = participants.some(p => p.status === 'pre-integre' &&
        (p.sales === SalesStatus.ProposerUnPrix  || p.sales === SalesStatus.AssocierLeContrat))

    const canSignDocuments = preIntegres.some(p => p.sales === SalesStatus.EnvoyerLeContrat)

    return [
        {
            id: "nouvelles-candidatures",
            label: "J'accepte les candidatures",
            ping: candidatures.length > 0,
            number: candidatures.length
        },
        {id: "pre-integrations", label: "Je propose mes conditions de vente ", ping: hasSalesThingsToDo},
        {id: "documents", label: "Je fais signer mes documents", ping: canSignDocuments},
        {id: "passages-en-exploitation", label: "Je gère l'exploitation de mon opération", ping: exploitation.length >0},
    ]
}

const candidatures_flow = (p: Participant[]) => {
    const {candidatures, preIntegres} = parse(p)
    const numberOfCandidatures = candidatures.length
    const numberOfPreIntegres = preIntegres.length
    const numberOfPreIntegresWithDataLoaded = preIntegres.filter(p => p.exportDate !== null).length
    const steps: Step[] = [
        {label: 'Je vérifie le périmètre', href: '/poc-enostart/my-perimeter', disabled: numberOfCandidatures === 0},
        {
            label: "J'accepte les consommateurs",
            href: '/poc-enostart/my-participants/candidatures',
            numberOfTask: numberOfCandidatures,
            numberOfTaskDone: 0,
            disabled: numberOfCandidatures === 0
        },
        {
            label: "J'exporte les données pour étude (optionnel)",
            href: '/poc-enostart/my-participants/pre-integres',
            numberOfTaskDone: numberOfPreIntegresWithDataLoaded,
            numberOfTask: numberOfPreIntegres,
            disabled: numberOfPreIntegres === 0
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
        .filter(p => p.sales === SalesStatus.AssocierLeContrat).length
    const numberOfEditedContract = preIntegres
        .filter(p => p.sales === SalesStatus.EnvoyerLeContrat).length
    const total = numberOfPreIntegresProposerUnPrix + numberOfPreIntegresWithPriceProposed + numberOfPreIntegresWithPriceAccepted
    const steps: Step[] = [
        {
            label: 'Je propose un prix de vente pour chaque consommateur',
            href: '/poc-enostart/my-demarches/vente',
            numberOfTaskDone: numberOfPreIntegresWithPriceProposed,
            numberOfTask: total,
            disabled: numberOfPreIntegresProposerUnPrix === 0
        },
        {
            label: "Chaque consommateur accepte son prix de vente",
            href: '/poc-enostart/my-participants/pre-integres',
            numberOfTaskDone: numberOfPreIntegresWithPriceAccepted,
            numberOfTask: numberOfPreIntegresWithPriceProposed + numberOfPreIntegresWithPriceAccepted,
            disabled: (numberOfPreIntegresWithPriceProposed + numberOfPreIntegresWithPriceAccepted) === 0
        },
        {
            label: "Je complète le contrat de vente pour chaque consommateur",
            href: '/poc-enostart/my-demarches/vente',
            numberOfTaskDone: numberOfEditedContract,
            numberOfTask: numberOfEditedContract + numberOfPreIntegresWithPriceAccepted,
            disabled: (numberOfEditedContract + numberOfPreIntegresWithPriceAccepted) === 0
        },
    ]
    return {
        steps
    }
}

const signatures_flow = (p: Participant[], isOperationDeclared : boolean) => {
    const {preIntegres} = parse(p)
    const pmoStatusTerminated = preIntegres[0] && (preIntegres[0].pmo !== PmoStatus.IdentifierLaPmo
        && preIntegres[0].pmo !== PmoStatus.EditerLeBulletin) ? 1 : 0
    const enedisStatusTerminated = preIntegres[0] && (preIntegres[0].enedis !== EnedisStatus.IdentifierLaPmo
        && preIntegres[0].enedis !== EnedisStatus.EditerLAccord) ? 1 : 0

    const numberOfPreIntegresProposerUnPrix = preIntegres
        .filter(p => p.sales === SalesStatus.ProposerUnPrix).length
    const numberOfPreIntegresWithPriceProposed = preIntegres
        .filter(p => p.sales === SalesStatus.PrixPropose).length
    const numberOfPreIntegresWithPriceAccepted = preIntegres
        .filter(p => p.sales === SalesStatus.AssocierLeContrat).length
    const numberOfWaitingSignature = preIntegres
        .filter(p => p.sales === SalesStatus.ContratEnvoye || p.pmo === PmoStatus.BulletinEnvoye || p.enedis === EnedisStatus.AccordEnvoye).length
    const numberOfSignatures = preIntegres
        .filter(p => p.sales === SalesStatus.ContratSigne && p.pmo === PmoStatus.BulletinSigne && p.enedis === EnedisStatus.AccordSigne).length
    const total = numberOfPreIntegresProposerUnPrix + numberOfPreIntegresWithPriceProposed + numberOfPreIntegresWithPriceAccepted + numberOfWaitingSignature
    const canSignDocuments = preIntegres.some(p => p.sales === SalesStatus.EnvoyerLeContrat && p.pmo === PmoStatus.EnvoyerLeBulletin && p.enedis === EnedisStatus.EnvoyerLAccord)
    const steps: Step[] = [
        {
            label: "prérequis : Les bulletins d'adhésions sont édités",
            href: '/poc-enostart/my-demarches/pmo',
            numberOfTaskDone: pmoStatusTerminated ,
            numberOfTask: 1,
        },
        {
            label: "prérequis :  Les accords de participation sont édités",
            href: '/poc-enostart/my-demarches/enedis',
            numberOfTaskDone: enedisStatusTerminated,
            numberOfTask: 1
        },
        {
            label: "prérequis :  La déclaration de mise en oeuvre est envoyée à Enedis",
            href: '/poc-enostart/my-demarches/enedis',
            numberOfTaskDone: isOperationDeclared ? 1 : 0,
            numberOfTask: 1
        },
        {
            label: "J'envoi les documents aux consommateurs pour signature",
            href: '/poc-enostart/my-participants/pre-integres',
            numberOfTaskDone: 0,
            numberOfTask: total,
            disabled: !canSignDocuments
        },
        {
            label: "Je reçois les documents signés",
            href: '/poc-enostart/my-participants/exploitation',
            numberOfTaskDone: numberOfSignatures,
            numberOfTask: numberOfWaitingSignature + numberOfSignatures,
            disabled: numberOfWaitingSignature === 0
        },
    ]
    return {
        steps
    }

}
const demarches_pmo_creation = (isPmoCreated: boolean) => {

    const steps: Step[] = [
        {
            label: "Je crée mon association PMO",
            href: '/poc-enostart/my-demarches/pmo',
            numberOfTaskDone: isPmoCreated ? 1 : 0,
            numberOfTask: 1,
            done: isPmoCreated,
        }
    ]
    return steps;
}

const demarches_pmo_flow = (isPmoCreated: boolean, isBulletinEdited: boolean) => {

    const steps: Step[] = [
        {
            label: "J'édite les bulletins d'adhésion",
            href: '/poc-enostart/my-demarches/pmo',
            disabled: !isPmoCreated,
            numberOfTaskDone: isBulletinEdited ? 1 : 0,
            numberOfTask: 1,
            done: isPmoCreated && isBulletinEdited
        }
    ]
    return steps;
}

const demarches_pmo_accords = (isPmoCreated: boolean, isEdited: boolean) => {

    const steps: Step[] = [
        {
            label: "J'édite les accords de participation",
            href: '/poc-enostart/my-demarches/enedis/accords',
            disabled: !isPmoCreated,
            numberOfTaskDone: isEdited ? 1 : 0,
            numberOfTask: 1,
            done: isPmoCreated && isEdited
        }
    ]
    return steps;
}
const declaration_flow = (isDeclarationSent:boolean) => {

    const steps: Step[] = [
        {
            label: "J'envoi la déclaration de mise en oeuvre",
            href: '/poc-enostart/my-demarches/enedis/enedis',
            numberOfTaskDone: 0,
            numberOfTask: 1,
            done: isDeclarationSent,
            disabled: false
        },
        {
            label: "Je renseigne le numéro NOVA de mon opération",
            href: '/poc-enostart/my-demarches/enedis/enedis',
            disabled: true,
            numberOfTaskDone: 0,
            numberOfTask: 1,
            done: true,
        }
    ]
    return steps;
}
export {
    participantsTab,
    candidatures_flow,
    sales_flow,
    signatures_flow,
    demarches_pmo_flow,
    demarches_pmo_creation,
    demarches_pmo_accords,
    declaration_flow,
}