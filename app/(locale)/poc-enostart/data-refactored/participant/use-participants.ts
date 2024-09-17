import {Participant} from "@/app/(locale)/poc-enostart/data-refactored/participant/participant";
import {
    SignedDocumentStatus,
    SignedSaleDocumentStatus
} from "@/app/(locale)/poc-enostart/data-refactored/participant/signed-document-status";
import {DemoDocument, SalesDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/document";
import {useStoredParticipants} from "@/app/(locale)/poc-enostart/data-refactored/participant/stored-participants";

export const parseP = (participants: Participant[]) => {
    if (participants.length === 0) return {
        candidatures: [],
        preIntegres: [],
        exploitation: [],
        refuses: []
    }

    return {
        candidatures: participants.filter(p => p.status === 'candidature'),
        preIntegres: participants.filter(p => p.status === 'pre-integre' &&
            (p.documents.bulletin.state !== SignedDocumentStatus.Signe
                || p.documents.accord.state !== SignedDocumentStatus.Signe
                || p.documents.contract.state !== SignedSaleDocumentStatus.DocumentSigne)),
        exploitation: participants.filter(p => p.status === 'pre-integre'
            && p.documents.bulletin.state === SignedDocumentStatus.Signe
            && p.documents.accord.state === SignedDocumentStatus.Signe
            && p.documents.contract.state === SignedSaleDocumentStatus.DocumentSigne),
        refuses: participants.filter(p => p.status === 'refuse'),
    }
}

export default function useParticipants() {
    const {participants, setParticipants} = useStoredParticipants()

    function accept(id: number) {
        setParticipants(participants.map(p => p.id === id ? {...p, status: 'pre-integre'} : p))
    }

    function acceptAll(ids: number[]) {
        setParticipants(participants.map(p => ids.includes(p.id) ? {...p, status: 'pre-integre'} : p))
    }

    function reject(id: number) {
        setParticipants(participants.map(p => p.id === id ? {...p, status: 'refuse'} : p))
    }

    function exportData(id: number) {
        setParticipants(participants.map(p => p.id === id ? {...p, exportDate: new Date().toISOString()} : p))
    }

    function exportMultipleData(ids: number[]) {
        setParticipants(participants.map(p => ids.includes(p.id) ? {...p, exportDate: new Date().toISOString()} : p))
    }

    function proposePrice(id: number, proposal: SalesDocument | null) {
        if (!proposal) return
        setParticipants(participants.map(p => p.id === id ?
            {
                ...p, documents: {
                    ...p.documents,
                    contract: {
                        ...p.documents.contract,
                        proposition: proposal,
                        state: SignedSaleDocumentStatus.PropositionAAccepter
                    }
                }
            }
            : p))
    }
    function proposePriceToMultipleParticipants(proposal: SalesDocument | null) {
        if (!proposal) return
        setParticipants(participants.map(p => {
            if(p.status === 'pre-integre'){
                return {
                    ...p, documents: {
                        ...p.documents,
                        contract: {
                            ...p.documents.contract,
                            proposition: proposal,
                            state: SignedSaleDocumentStatus.PropositionAAccepter
                        }
                    }
                }
            }
            return p
        }))
    }

    function sendAllDocuments(id: number, bulletin: DemoDocument, accords: DemoDocument, sales: DemoDocument) {
        setParticipants(participants.map(p => {
                if (p.id === id) {
                    const newParticipant: Participant = {
                        ...p,
                        documents: {
                            bulletin: {
                                state: SignedDocumentStatus.ASigner,
                                signedDocument: bulletin
                            },
                            accord: {
                                state: SignedDocumentStatus.ASigner,
                                signedDocument: accords
                            },
                            contract: {
                                ...p.documents.contract,
                                state: SignedSaleDocumentStatus.DocumentASigner,
                                signedDocument: sales
                            }
                        }
                    }
                    return newParticipant
                }
                return p
            })
        )
    }

    function sendAllDocumentsToMultiple(ids: number[], bulletin: DemoDocument, accords: DemoDocument, sales: DemoDocument) {
        setParticipants(participants.map(p => {
                if (ids.includes(p.id)) {
                    const newParticipant: Participant = {
                        ...p,
                        documents: {
                            bulletin: {
                                state: SignedDocumentStatus.ASigner,
                                signedDocument: bulletin
                            },
                            accord: {
                                state: SignedDocumentStatus.ASigner,
                                signedDocument: accords
                            },
                            contract: {
                                ...p.documents.contract,
                                state: SignedSaleDocumentStatus.DocumentASigner,
                                signedDocument: sales
                            }
                        }
                    }
                    return newParticipant
                }
                return p
            })
        )
    }

    function getSignedBulletin(id: number) {
        const participant = participants.find(p => p.id === id)
        if (!participant) return
        return participant.documents.bulletin.signedDocument
    }

    function getSignedAccord(id: number) {
        const participant = participants.find(p => p.id === id)
        if (!participant) return
        return participant.documents.accord.signedDocument
    }

    function getSignedContract(id: number) {
        const participant = participants.find(p => p.id === id)
        if (!participant) return
        return participant.documents.contract.signedDocument
    }

    const {candidatures, refuses, exploitation, preIntegres} = parseP(participants)


    // inMemory
    function consumerAcceptPrice(id: number) {
        const participant = participants.find(p => p.id === id)
        if (!participant) return
        participant.documents.contract.state = SignedSaleDocumentStatus.PropositionAcceptee
        setParticipants([...participants])

    }

    function consumersSignAllDocuments() {
        setParticipants(participants.map(p => {
            if(p.status === 'pre-integre'){
                p.documents.bulletin.state = SignedDocumentStatus.Signe
                p.documents.accord.state = SignedDocumentStatus.Signe
                p.documents.contract.state = SignedSaleDocumentStatus.DocumentSigne
                return p
            }
            return p
        }))

    }

    function completeContract(id: number) {
        const participant = participants.find(p => p.id === id)
        if (!participant) return
        participant.documents.contract.state = SignedSaleDocumentStatus.EnAttenteDuDocument
        setParticipants([...participants])
    }

    function completeContractForAll() {
        participants.forEach(p => {
            p.documents.contract.state = SignedSaleDocumentStatus.EnAttenteDuDocument
        })
    }

    function InMemConsumersSignAllDocuments() {
        participants.forEach(p => {
            p.documents.bulletin.state = SignedDocumentStatus.ASigner
            p.documents.accord.state = SignedDocumentStatus.ASigner
            p.documents.contract.state = SignedSaleDocumentStatus.DocumentASigner
        })
    }

    function sendAllExploitationDocumentsToProducer() {
        participants.forEach(p => {
            p.documents.bulletin.state = SignedDocumentStatus.ASigner
            p.documents.accord.state = SignedDocumentStatus.ASigner
            p.documents.contract.state = SignedSaleDocumentStatus.DocumentASigner
        })
    }


    return {
        candidatures,
        refuses,
        exploitation,
        preIntegres,

        accept, acceptAll,
        reject,
        exportData, exportMultipleData,
        proposePrice,proposePriceToMultipleParticipants,
        sendAllDocuments, sendAllDocumentsToMultiple,
        getSignedBulletin,
        getSignedAccord,
        getSignedContract,

        consumerAcceptPrice,
        consumersSignAllDocuments,
        completeContract,
        completeContractForAll,
        InMemConsumersSignAllDocuments,
        sendAllExploitationDocumentsToProducer
    }

}

