import {
    SignedDocumentStatus,
    SignedSaleDocumentStatus
} from "@/app/(locale)/poc-enostart/data-refactored/participant/signed-document-status";

export type Participant = {
    id: number,
    name: string,
    perimeter: string,
    consumption: number,
    address: string,
    segment: 'C5' | 'C4' | 'C3' | 'C2' | 'C1',
    exportDate: string | null,
    status: 'candidature' | 'pre-integre' | 'integrated' | 'refuse',
    documents: {
        bulletin: {
            state: SignedDocumentStatus,
            signedDocument: Document | null
        },
        accord: {
            state: SignedSaleDocumentStatus,
            proposition :{price : number, inflation : number, duration : number} | Document | null,
            signedDocument: Document | null
        },
        contract: {
            state: SignedDocumentStatus,
            signedDocument: Document | null
        }
    }
}



