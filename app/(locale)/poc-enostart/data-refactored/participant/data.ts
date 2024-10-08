import {Participant} from "@/app/(locale)/poc-enostart/data-refactored/participant/participant";
import {
    SignedDocumentStatus,
    SignedSaleDocumentStatus
} from "@/app/(locale)/poc-enostart/data-refactored/participant/signed-document-status";


const initialDocuments = {
    bulletin: {
        state: SignedDocumentStatus.EnAttente,
        signedDocument: null
    },
    accord: {
        state: SignedDocumentStatus.EnAttente,
        signedDocument: null
    },
    convention: {
        state: SignedDocumentStatus.EnAttente,
        signedDocument: null
    },
    declaration: {
        state: SignedDocumentStatus.EnAttente,
        signedDocument: null
    },
    contract: {
        state: SignedSaleDocumentStatus.EnAttenteDeLaProposition,
        proposition : null,
        signedDocument: null
    }
}
export const initialParticipants: Participant[] = [
    {
        id: 1,
        name: "Alice Dupont",
        perimeter: "1.67 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        address: ' Rue de Pornic 44250 Saint-Brevin-les-Pins',
        segment: 'C5',
        documents: initialDocuments
    },
    {
        id: 2,
        name: "Bob Martin",
        perimeter: "0.45 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        address: ' Rue de Pornic 44250 Saint-Brevin-les-Pins',
        segment: 'C4',
        documents: initialDocuments
    },
    {
        id: 3,
        name: "Claire Leroy",
        perimeter: "2.1 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        address: ' Rue de Pornic 44250 Saint-Brevin-les-Pins',
        segment: 'C4',
        documents: initialDocuments
    },
    {
        id: 4,
        name: "David Dupuis",
        perimeter: "1.2 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        address: ' Rue de Pornic 44250 Saint-Brevin-les-Pins',
        segment: 'C4',
        documents: initialDocuments
    },
    {
        id: 5,
        name: "Eva Martin",
        perimeter: "0.45 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        address: ' Rue de Pornic 44250 Saint-Brevin-les-Pins',
        segment: 'C4',
        documents: initialDocuments
    },
    {
        id: 6,
        name: "Fabrice Leroy",
        perimeter: "2.1 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        address: ' Rue de Pornic 44250 Saint-Brevin-les-Pins',
        segment: 'C4',
        documents: initialDocuments
    },
    {
        id: 7,
        name: "Gérard Dupuis",
        perimeter: "1.2 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        address: ' Rue de Pornic 44250 Saint-Brevin-les-Pins',
        segment: 'C4',
        documents: initialDocuments
    },
    {
        id: 8,
        name: "Hélène Martin",
        perimeter: "0.45 km",
        consumption: 4500,
        exportDate: null,
        status: 'candidature',
        address: ' Rue de Pornic 44250 Saint-Brevin-les-Pins',
        segment: 'C4',
        documents: initialDocuments
    },
    {
        id: 9,
        name: "Isabelle Leroy",
        perimeter: "2.1 km",
        consumption: 6500,
        exportDate: null,
        status: 'candidature',
        address: ' Rue de Pornic 44250 Saint-Brevin-les-Pins',
        segment: 'C4',
        documents: initialDocuments
    },
    {
        id: 10,
        name: "Jérôme Dupuis",
        perimeter: "1.2 km",
        consumption: 1200,
        exportDate: null,
        status: 'candidature',
        address: ' Rue de Pornic 44250 Saint-Brevin-les-Pins',
        segment: 'C4',
        documents: initialDocuments
    }
]
