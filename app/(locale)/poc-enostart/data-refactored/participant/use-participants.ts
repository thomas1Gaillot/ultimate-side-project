import {useState} from "react";
import {Participant} from "@/app/(locale)/poc-enostart/data-refactored/participant/participant";
import {initialParticipants} from "@/app/(locale)/poc-enostart/data-refactored/participant/data";
import {
    SignedDocumentStatus,
    SignedSaleDocumentStatus
} from "@/app/(locale)/poc-enostart/data-refactored/participant/signed-document-status";
import {DemoDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/document";

const parse = (participants: Participant[]) => {
    if (participants.length === 0) return {
        candidatures: [],
        preIntegres: [],
        exploitation: [],
        refuses: []
    }

    return {
        candidatures: participants.filter(p => p.status === 'candidature'),
        preIntegres: participants.filter(p => p.status === 'pre-integre' && (p.documents.bulletin.signedDocument === null || p.documents.accord.signedDocument === null || p.documents.contract.signedDocument === null)),
        exploitation: participants.filter(p =>  p.status === 'pre-integre' && p.documents.bulletin.signedDocument !== null && p.documents.accord.signedDocument !== null && p.documents.contract.signedDocument !== null),
        refuses: participants.filter(p => p.status === 'refuse'),
    }
}

export default function useParticipants(){
    const [participants, setParticipants] = useState<Participant[]>(initialParticipants);

    function accept(id: number){
        setParticipants(participants.map(p => p.id === id ? {...p, status: 'pre-integre'} : p))
    }
    function reject(id: number) {
        setParticipants(participants.map(p => p.id === id ? {...p, status: 'refuse'} : p))
    }
    function exportData(id : number)  {
        setParticipants(participants.map(p => p.id === id ? {...p, exportDate: new Date().toISOString()} : p))
    }

    function proposePrice(id : number, accord : DemoDocument){
        const participant = participants.find(p => p.id === id)
        if(!participant) return
        participant.documents.accord.state = SignedSaleDocumentStatus.PropositionEnvoye
        setParticipants([...participants])
    }

    function sendAllDocuments(id : number, bulletin : DemoDocument, accords : DemoDocument, sales : DemoDocument){
        const participant = participants.find(p => p.id === id)
        if(!participant) return
        participant.documents.bulletin.state = SignedDocumentStatus.DocumentEnvoye
        participant.documents.accord.state = SignedSaleDocumentStatus.DocumentEnvoye
        participant.documents.contract.state = SignedDocumentStatus.DocumentEnvoye
        setParticipants([...participants])
    }

    function getSignedBulletin(id : number){
        const participant = participants.find(p => p.id === id)
        if(!participant) return
        return participant.documents.bulletin.signedDocument
    }
    function getSignedAccord(id : number){
        const participant = participants.find(p => p.id === id)
        if(!participant) return
        return participant.documents.accord.signedDocument
    }
    function getSignedContract(id : number){
        const participant = participants.find(p => p.id === id)
        if(!participant) return
        return participant.documents.contract.signedDocument
    }

    return {
        participants: parse(participants),
        accept,
        reject,
        exportData,
        proposePrice,
        sendAllDocuments,
        getSignedBulletin,
        getSignedAccord,
        getSignedContract
    }

}

