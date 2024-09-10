import {create} from 'zustand';
import {PmoStatus} from "@/app/(locale)/poc-enostart/data/pmo-status";
import {EnedisStatus} from "@/app/(locale)/poc-enostart/data/enedis-status";
import {SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import {IconFileEuro} from "@tabler/icons-react";
import {FileCheck2Icon, FileTextIcon, FolderArchiveIcon, ScrollTextIcon, SquareUserIcon} from "lucide-react";
import SalesSubscriptionDialogContent
    from "@/app/(locale)/poc-enostart/my-project/components/SalesSubscriptionDialogContent";
import AccordSubscriptionContent from "@/app/(locale)/poc-enostart/my-project/components/AccordSubscriptionContent";
import BulletinSubscriptionDialogContent
    from "@/app/(locale)/poc-enostart/my-project/components/BulletinSubscriptionDialogContent";

// Type definition
export type DocumentOverviewType = {
    title: string;
    icon: JSX.Element;
    estimatedTime: string;
    Button: () => JSX.Element;
    asterix?: string;
    status: PmoStatus | EnedisStatus | SalesStatus
};

// Initial documents definition
export const initialSalesDocument: DocumentOverviewType = {
    title: "Contrat de vente",
    icon: <IconFileEuro className="w-12 h-12"/>,
    estimatedTime: '1 heure',
    Button: () => <SalesSubscriptionDialogContent ignored={false}/>,
    status: SalesStatus.ChoisirUnPlan
};
export const initialAccordsDocument: DocumentOverviewType = {
    title: "Accord de participation",
    icon: <FileCheck2Icon className="w-12 h-12"/>,
    estimatedTime: '1 heure',
    Button: () => <AccordSubscriptionContent ignored={false}/>,
    status: EnedisStatus.ChoisirUnPlan
};
export const initialStatutPmoDocument: DocumentOverviewType = {
    title: "Statuts PMO Associative",
    icon: <SquareUserIcon className="w-12 h-12"/>,
    estimatedTime: '1h - 2 mois (selon état de la PMO)',
    Button: () => <BulletinSubscriptionDialogContent ignored={false}/>,
    status: PmoStatus.ChoisirUnPlan
};
export const initialBulletinDocument: DocumentOverviewType = {
    title: "Bulletin d'adhésion",
    icon: <ScrollTextIcon className="w-12 h-12"/>,
    estimatedTime: '1 heure',
    Button: () => <BulletinSubscriptionDialogContent ignored={false}/>,
    status: PmoStatus.ChoisirUnPlan
};
export const initialConventionDocument: DocumentOverviewType = {
    title: "Convention d'ACC",
    asterix: "si votre opération n'est pas en exploitation",
    icon: <FolderArchiveIcon className="w-12 h-12"/>,
    estimatedTime: '1 mois',
    Button: () => <AccordSubscriptionContent ignored={false}/>,
    status: EnedisStatus.ChoisirUnPlan
};
export const initialDeclarationDocument: DocumentOverviewType = {
    title: "Déclaration de mise en oeuvre",
    icon: <FileTextIcon className="w-12 h-12"/>,
    estimatedTime: '1 mois',
    Button: () => <AccordSubscriptionContent ignored={false}/>,
    status: EnedisStatus.ChoisirUnPlan
};

// Zustand store for global document overview management
interface DocumentsOverviewState {
    sales: DocumentOverviewType;
    accords: DocumentOverviewType;
    bulletin: DocumentOverviewType;
    convention: DocumentOverviewType;
    declaration: DocumentOverviewType;
    statutPmo: DocumentOverviewType;
    setSales: (newSales: DocumentOverviewType) => void;
    setAccords: (newAccords: DocumentOverviewType) => void;
    setBulletin: (newBulletin: DocumentOverviewType) => void;
    setConvention: (newConvention: DocumentOverviewType) => void;
    setDeclaration: (newDeclaration: DocumentOverviewType) => void;
    setStatutPmo: (newStatutPmo: DocumentOverviewType) => void;
}

export const useStoredDocumentsOverview = create<DocumentsOverviewState>((set) => ({
    // Initial state
    sales: initialSalesDocument,
    accords: initialAccordsDocument,
    bulletin: initialBulletinDocument,
    convention: initialConventionDocument,
    declaration: initialDeclarationDocument,
    statutPmo: initialStatutPmoDocument,

    // Setters
    setSales: (newSales: DocumentOverviewType) => set({sales: newSales}),
    setAccords: (newAccords: DocumentOverviewType) => set({accords: newAccords}),
    setBulletin: (newBulletin: DocumentOverviewType) => set({bulletin: newBulletin}),
    setConvention: (newConvention: DocumentOverviewType) => set({convention: newConvention}),
    setDeclaration: (newDeclaration: DocumentOverviewType) => set({declaration: newDeclaration}),
    setStatutPmo: (newStatutPmo: DocumentOverviewType) => set({statutPmo: newStatutPmo}),
}));
