import {FileCheck2Icon, FileText, ScrollTextIcon, SendIcon, UserIcon, XIcon} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import useParticipants from "@/app/(locale)/poc-enostart/data-refactored/participant/use-participants";
import {
    SignedDocumentStatus,
    SignedSaleDocumentStatus
} from "@/app/(locale)/poc-enostart/data-refactored/participant/signed-document-status";
import {cn} from "@/lib/utils";
import {IconFileEuro} from "@tabler/icons-react";
import {usePmoDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/use-pmo-document";
import {useBulletinDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/use-bulletin-document";
import useSalesContractDocument from "@/app/(locale)/poc-enostart/data-refactored/document/use-sales-contract-document";
import {useAccordsDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/use-accords-document";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useState} from "react";

export default function ProducerCard() {
    const {
        preIntegres,
        sendAllExploitationDocumentsToProducer
    } = useParticipants();
    const [openModal, setOpenModal] = useState(false)

    const statutPmo = usePmoDocument();
    const contract = useSalesContractDocument();
    const accord = useAccordsDocument();
    function sendAll() {
        sendAllExploitationDocumentsToProducer()
        setOpenModal(false)
    }

    const displayBulletinDocumentState = (state: SignedDocumentStatus) => {
        const text = () => {
            if (!statutPmo.isCreated) return 'Document non créé'
            switch (state) {
                case SignedDocumentStatus.EnAttente:
                    return '';
                case SignedDocumentStatus.ASigner:
                    return 'En cours de signature';
                case SignedDocumentStatus.Signe:
                    return 'Signé';
                default:
                    return state;
            }
        }
        return (
            <>
                {statutPmo.isCreated && <FileText className={'size-4 mr-2'}/>}
                <div
                    className={cn("flex items-center text-xs", state === SignedDocumentStatus.ASigner ? 'text-gray-300' : 'text-gray-700')}>
                    {text()}
                </div>
            </>
        );
    }
    const displayAccordsDocumentState = (state: SignedDocumentStatus) => {
        const text = () => {
            if (!accord.isCreated) return 'Document non créé'
            switch (state) {
                case SignedDocumentStatus.EnAttente:
                    return '';
                case SignedDocumentStatus.ASigner:
                    return 'En cours de signature';
                case SignedDocumentStatus.Signe:
                    return 'Signé';
                default:
                    return state;
            }
        }
        return (
            <>
                {accord.isCreated && <FileCheck2Icon className={'size-4 mr-2'}/>}
                <div
                    className={cn("flex items-center text-xs", state === SignedDocumentStatus.ASigner ? 'text-gray-300' : 'text-gray-700')}>
                    {text()}
                </div>
            </>
        );
    }
    const displayContractDocumentState = (state: SignedSaleDocumentStatus) => {

        const text = () => {
            if (!contract.hasOneContract) return 'Document non créé'
            switch (state) {
                case SignedSaleDocumentStatus.EnAttenteDeLaProposition:
                    return 'En attente de la proposition';
                case SignedSaleDocumentStatus.PropositionAAccepter:
                    return 'Proposition à accepter';
                case SignedSaleDocumentStatus.PropositionAcceptee:
                    return 'Proposition acceptée';
                case SignedSaleDocumentStatus.EnAttenteDuDocument:
                    return 'En attente du document';
                case SignedSaleDocumentStatus.DocumentASigner:
                    return 'En cours de signature';
                case SignedSaleDocumentStatus.DocumentSigne:
                    return 'Document signé';
                case SignedSaleDocumentStatus.PropositionRefusee:
                    return 'Proposition refusée';
                default:
                    return state;
            }
        }
        return (
            <>
                {contract.hasOneContract && <IconFileEuro className={'size-4 mr-2'}/>}
                <div
                    className={cn("flex items-center text-xs", state === SignedSaleDocumentStatus.DocumentASigner ? 'text-gray-300' : 'text-gray-700')}>
                    {text()}
                </div>
            </>
        );
    }


    return <div className={"rounded-xl border border-gray-200 flex flex-col gap-3 py-3 w-max"}>
        <div className={"flex items-center gap-2 w-full  px-4"}>
            <div className={"flex justify-center rounded-md items-center bg-primary/5 p-2"}>
                <UserIcon className={'size-6 text-primary'}/>
            </div>
                <div className={"grid"}>
                    <div className={"font-semibold"}>Remy Bastien</div>
                    <div className={"text-xs"}>Producteur</div>
                    <div className={"text-xs"}>175 kW</div>
                </div>
        </div>
        <div className={"text-xs text-gray-600 px-4"}>Le producteur recevra automatiquement les documents à signer
            lorsque vous les enverrez au consomateur.
        </div>
        <Separator orientation={"horizontal"}/>
        <div className={"grid grid-cols-[200px_1fr]  px-4"}>
            <div className={"text-sm text-gray-500"}>{"Bulletin d'adhésion"}</div>
            {preIntegres[0] && <div
                className={"text-sm text-gray-700"}>{displayBulletinDocumentState(preIntegres[0].documents.bulletin.state)}</div>}
        </div>
        <div className={"grid grid-cols-[200px_1fr]  px-4"}>
            <div className={"text-sm text-gray-500"}>{"Accords de participation"}</div>
            {preIntegres[0] && <div
                className={"text-sm text-gray-700"}>{displayAccordsDocumentState(preIntegres[0].documents.accord.state)}</div>}
        </div>
        <div className={"grid grid-cols-[200px_1fr]  px-4"}>
            <div className={"text-sm text-gray-500"}>{"Contrats de vente"}</div>
            {preIntegres[0] && <div
                className={"text-sm text-gray-700"}>{displayContractDocumentState(preIntegres[0].documents.contract.state)}</div>}
        </div>
    </div>
}