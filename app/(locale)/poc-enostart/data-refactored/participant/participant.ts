import {
    SignedDocumentStatus,
    SignedSaleDocumentStatus
} from "@/app/(locale)/poc-enostart/data-refactored/participant/signed-document-status";
import {DemoDocument, SalesDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/document";

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
            signedDocument: DemoDocument | null
        },
        accord: {
            state: SignedDocumentStatus,
            signedDocument: DemoDocument | null
        },
        contract: {
            state: SignedSaleDocumentStatus,
            proposition :SalesDocument | null,
            signedDocument: DemoDocument | null
        }
    }
}



