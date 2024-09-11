import {EnedisStatus} from "./enedis-status"
import {PmoStatus} from "@/app/(locale)/poc-enostart/data/pmo-status";
import {SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import {create} from "zustand";
import {ContractDocument, useDocuments} from "@/app/(locale)/poc-enostart/data/documents/use-documents";
import {useEffect} from "react";

export type Participant = {
    id: number,
    name: string,
    perimeter: string,
    consumption: number,
    exportDate: string | null,
    status: 'candidature' | 'pre-integre' | 'exploitation' | 'integrated' | 'refuse',
    pmo: PmoStatus,
    enedis: EnedisStatus,
    sales: SalesStatus,
    contractDocument?: ContractDocument
}

const initialParticipants: Participant[] = [
    {
        id: 1,
        name: "Alice Dupont",
        perimeter: "1.67 km",
        consumption: 4500,
        exportDate: null,
        status: 'exploitation',
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
    },
    {
        id: 4,
        name: "David Dupuis",
        perimeter: "1.2 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        pmo: PmoStatus.IdentifierLaPmo,
        enedis: EnedisStatus.IdentifierLaPmo,
        sales: SalesStatus.ProposerUnPrix
    },
    {
        id: 5,
        name: "Eva Martin",
        perimeter: "0.45 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        pmo: PmoStatus.IdentifierLaPmo,
        enedis: EnedisStatus.IdentifierLaPmo,
        sales: SalesStatus.ProposerUnPrix
    },
    {
        id: 6,
        name: "Fabrice Leroy",
        perimeter: "2.1 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        pmo: PmoStatus.IdentifierLaPmo,
        enedis: EnedisStatus.IdentifierLaPmo,
        sales: SalesStatus.ProposerUnPrix
    },
    {
        id: 7,
        name: "Gérard Dupuis",
        perimeter: "1.2 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        pmo: PmoStatus.IdentifierLaPmo,
        enedis: EnedisStatus.IdentifierLaPmo,
        sales: SalesStatus.ProposerUnPrix
    },
    {
        id: 8,
        name: "Hélène Martin",
        perimeter: "0.45 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        pmo: PmoStatus.IdentifierLaPmo,
        enedis: EnedisStatus.IdentifierLaPmo,
        sales: SalesStatus.ProposerUnPrix
    },
    {
        id: 9,
        name: "Isabelle Leroy",
        perimeter: "2.1 km",
        consumption: 6500,
        exportDate: null,
        status: 'candidature',
        pmo: PmoStatus.IdentifierLaPmo,
        enedis: EnedisStatus.IdentifierLaPmo,
        sales: SalesStatus.ProposerUnPrix
    },
    {
        id: 10,
        name: "Jérôme Dupuis",
        perimeter: "1.2 km",
        consumption: 1200,
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
        exploitation: participants.filter(p => p.status === 'exploitation' || p.status === 'integrated'),
        refuses: participants.filter(p => p.status === 'refuse'),
    }
}

const useParticipants = () => {
    const {participants} = useStoredParticipants()
    const {isDeclarationSent, isAccordsParticipationEdited, isBulletinEdited, isPmoCreated} = useDocuments()
    const {preIntegres, refuses, exploitation, candidatures} = parse(participants)

    useEffect(() => {
        if (isPmoCreated) {
            const participant = participants.filter(p => p.pmo === PmoStatus.IdentifierLaPmo)
            participant.forEach(p => {
                p.pmo = PmoStatus.EditerLeBulletin
                p.enedis = EnedisStatus.EditerLAccord
                useStoredParticipants.getState().setParticipants([...participants])
            })
        }
        if (isBulletinEdited) {
            const participant = participants.filter(p => p.pmo === PmoStatus.EditerLeBulletin)
            participant.forEach(p => {
                p.pmo = PmoStatus.EnvoyerLeBulletin
                useStoredParticipants.getState().setParticipants([...participants])
            })
        }
        if (isAccordsParticipationEdited) {
            const participant = participants.filter(p => p.enedis === EnedisStatus.EditerLAccord)
            participant.forEach(p => {
                p.enedis = EnedisStatus.EnvoyerLAccord
                useStoredParticipants.getState().setParticipants([...participants])
            })
        }
        if (isDeclarationSent && isAccordsParticipationEdited && isBulletinEdited) {
            //
        }
    }, [isPmoCreated, isBulletinEdited, isAccordsParticipationEdited])

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

    function proposePrice(id: number, selectedContract: ContractDocument | null) {
        if (!selectedContract) return;
        const participant = participants.find(p => p.id === id)
        if (participant) {
            participant.sales = SalesStatus.PrixPropose
            participant.contractDocument = selectedContract
            useStoredParticipants.getState().setParticipants([...participants])
        }
    }

    function consumerAcceptPrice(id: number) {
        const participant = participants.find(p => p.id === id)
        if (participant) {
            const participantContratIsComplete = !!participant.contractDocument?.moreInfo
            participant.sales = participantContratIsComplete ? SalesStatus.EnvoyerLeContrat : SalesStatus.AssocierLeContrat

            useStoredParticipants.getState().setParticipants([...participants])
        }
    }

    function completeContract(id: number) {
        const participant = participants.find(p => p.id === id)
        if (participant) {
            participant.sales = SalesStatus.EnvoyerLeContrat
            useStoredParticipants.getState().setParticipants([...participants])
        }
    }

    function completeContractForAll(id: number) {
        let contractToUpdate = participants.find(p => p.id === id)?.contractDocument
        const participantWithContrat = participants.filter(p => p.contractDocument === contractToUpdate && p.sales === SalesStatus.AssocierLeContrat)
        if (!contractToUpdate) return
        contractToUpdate = {...contractToUpdate, moreInfo: true}
        participantWithContrat.forEach(p => {
            p.contractDocument = contractToUpdate
            p.sales = SalesStatus.EnvoyerLeContrat
        })
        useStoredParticipants.getState().setParticipants([...participants])
    }

    function consumersSignAllDocuments() {
        const preIntegresReadyToSign = preIntegres.filter(p => p.sales === SalesStatus.ContratEnvoye && p.pmo === PmoStatus.BulletinEnvoye && p.enedis === EnedisStatus.AccordEnvoye)

        preIntegresReadyToSign.forEach(p => {
            p.pmo = PmoStatus.BulletinSigne
            p.enedis = EnedisStatus.AccordSigne
            p.sales = SalesStatus.ContratSigne
            p.status = 'exploitation'
        })
        useStoredParticipants.getState().setParticipants([...preIntegres, ...refuses, ...exploitation, ...candidatures])

    }

    function sendAllExploitationDocumentsToProducer() {
        exploitation.forEach((p) => {
            p.pmo = PmoStatus.BulletinEnvoyeProducteur
            p.enedis = EnedisStatus.AccordEnvoyeProducteur
            p.sales = SalesStatus.ContratEnvoyeProducteur
            useStoredParticipants.getState().setParticipants([...preIntegres, ...refuses, ...exploitation, ...candidatures])

        })
    }
    function integrate(id: number) {
        const participant = participants.find(p => p.id === id)
        if (participant) {
            participant.status = 'integrated'
            useStoredParticipants.getState().setParticipants([...participants])
        }
    }

    function allDocumentSigned() {
        exploitation.forEach((p) => {
            p.pmo = PmoStatus.BulletinSigneParTous
            p.enedis = EnedisStatus.AccordSigneParTous
            p.sales = SalesStatus.ContratSigneParTous
            useStoredParticipants.getState().setParticipants([...preIntegres, ...refuses, ...exploitation, ...candidatures])

        })    }



    return {
        preIntegres,
        refuses,
        exploitation,
        candidatures,
        accept,
        reject,
        exportData,
        sendDocument,
        proposePrice,
        consumerAcceptPrice,
        completeContract,
        completeContractForAll,
        consumersSignAllDocuments,
        integrate,
        sendAllExploitationDocumentsToProducer,
        allDocumentSigned
    }
}
export {parse, useParticipants}
