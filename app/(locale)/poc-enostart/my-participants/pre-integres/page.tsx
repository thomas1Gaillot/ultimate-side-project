'use client'
import {TypographyH4} from "@/components/ui/typography";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {
    Clock,
    DownloadIcon,
    FileCheck2Icon,
    FileText, HourglassIcon,
    MoreHorizontalIcon, ScrollTextIcon,
    SendIcon,
    TimerIcon,
    UserIcon,
    XIcon
} from "lucide-react";
import {cn} from "@/lib/utils";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Checkbox} from "@/components/ui/checkbox"; // Assuming you have a Checkbox component
import {useState} from "react";
import {Separator} from "@/components/ui/separator";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import useParticipants from "@/app/(locale)/poc-enostart/data-refactored/participant/use-participants";
import {
    SignedDocumentStatus,
    SignedSaleDocumentStatus
} from "@/app/(locale)/poc-enostart/data-refactored/participant/signed-document-status";
import {IconFileEuro} from "@tabler/icons-react";
import {usePmoDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/use-pmo-document";
import useSalesContractDocument from "@/app/(locale)/poc-enostart/data-refactored/document/use-sales-contract-document";
import {useAccordsDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/use-accords-document";
import {useBulletinDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/use-bulletin-document";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

export default function Page() {
    const {
        preIntegres,
        reject,
        exportData, exportMultipleData,
        sendAllDocuments, sendAllDocumentsToMultiple,
        consumerAcceptPrice,
        consumersSignAllDocuments,
    } = useParticipants();
    const [openModal, setOpenModal] = useState(false)

    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);
    const statutPmo = usePmoDocument();
    const bulletin = useBulletinDocument()
    const contract = useSalesContractDocument();
    const accord = useAccordsDocument();
    // Toggle row selection for a specific participant
    const toggleSelect = (id: number) => {
        setSelectedIds(prevSelected =>
            prevSelected.includes(id) ? prevSelected.filter(selectedId => selectedId !== id) : [...prevSelected, id]
        );
    };

    // Toggle select all rows
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedIds([]); // Deselect all
        } else {
            const allIds = preIntegres.map(p => p.id);
            setSelectedIds(allIds); // Select all
        }
        setSelectAll(!selectAll);
    };

    // Bulk export for selected participants
    const exportSelected = () => {
        exportMultipleData(selectedIds.map(id => Number(id)));
    };
    const sendDocumentsToSelected = () => {
        if (!accord.document || !bulletin.document || !contract.documents) return;
        sendAllDocumentsToMultiple(selectedIds.map(id => Number(id)), bulletin.document, accord.document, contract.propositionDocuments[0]);
    }
    const sendDocumentsTo = (id:number)=> {
        if (!accord.document || !bulletin.document || !contract.documents) return;
        sendAllDocuments(id, bulletin.document, accord.document, contract.propositionDocuments[0]);
    }

    const displayBulletinDocumentState = (state: SignedDocumentStatus) => {
        const text = () => {
            if (!statutPmo.isCreated) return 'Document non créé'
            switch (state) {
                case SignedDocumentStatus.EnAttente:
                    return 'Bulletin prêt';
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
                    return 'Accords prêt';
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



    return (
        <div className={"px-4 space-y-8"}>
            <div className={"rounded-xl border border-gray-200 flex flex-col gap-3 py-3 w-max"}>
                <div className={"flex items-center gap-2 w-full  px-4"}>
                    <div className={"flex justify-center rounded-md items-center bg-primary/5 p-2"}>
                        <UserIcon className={'size-6 text-primary'}/>
                    </div>
                    <div className={'grid'}>
                        <div className={"font-semibold"}>Remy Bastien</div>
                        <div className={"text-xs"}>Producteur</div>
                        <div className={"text-xs"}>175 kW</div>
                        <div className={"text-xs text-gray-600"}>Le producteur recevra automatiquement les documents à signer lorsque vous les enverrez au consomamteur. </div>
                    </div>
                </div>
                <Separator orientation={"horizontal"}/>
                <div className={"grid grid-cols-[200px_1fr]  px-4"}>
                    <div className={"text-sm text-gray-500"}>{"Bulletin d'adhésion"}</div>
                    {preIntegres[0]&&<div className={"text-sm text-gray-700"}>{displayBulletinDocumentState(preIntegres[0].documents.bulletin.state)}</div>}
                </div>
                <div className={"grid grid-cols-[200px_1fr]  px-4"}>
                    <div className={"text-sm text-gray-500"}>{"Accords de participation"}</div>
                    {preIntegres[0]&&<div className={"text-sm text-gray-700"}>{displayAccordsDocumentState(preIntegres[0].documents.accord.state)}</div>}
                </div>
                <div className={"grid grid-cols-[200px_1fr]  px-4"}>
                    <div className={"text-sm text-gray-500"}>{"Contrats de vente"}</div>
                    {preIntegres[0]&&<div className={"text-sm text-gray-700"}>{displayContractDocumentState(preIntegres[0].documents.contract.state)}</div>}
                </div>
            </div>
            <div className={" rounded-lg border"}>
                <div className="flex justify-between items-center p-4">
                    <TypographyH4>
                        <>
                            Consommateurs Pré-intégrés
                            <Clock onClick={consumersSignAllDocuments} className={"size-3"}/>
                        </>
                    </TypographyH4>
                    <div className={"flex gap-2"}>
                        <Button
                            onClick={exportSelected}
                            variant={'outline'}
                            disabled={selectedIds.length === 0}
                        >
                            Exporter les données ({selectedIds.length})
                            <DownloadIcon className={'size-4 ml-2'}/>
                        </Button>
                        <Button
                            onClick={sendDocumentsToSelected}
                            disabled={selectedIds.length === 0}
                            variant={'outline'}
                        >
                            Envoyer les documents ({selectedIds.length})
                            <SendIcon className={'size-4 ml-2'}/>
                        </Button>
                    </div>
                </div>
                <Separator/>
                <Table className={' p-4'}>
                    <TableHeader className={"bg-gray-50"}>
                        <TableRow>
                            <TableHead>
                                <Checkbox
                                    className={"ml-2"}
                                    checked={selectAll}
                                    onCheckedChange={toggleSelectAll}
                                    aria-label="Select All"
                                />
                            </TableHead>
                            <TableHead>Nom</TableHead>
                            <TableHead>Adresse</TableHead>
                            <TableHead>Segment</TableHead>
                            <TableHead>Périmètre</TableHead>
                            <TableHead>{" Bulletin"}</TableHead>
                            <TableHead> Accords</TableHead>
                            <TableHead> Contrat</TableHead>
                            <TableHead>{"Données exportées"}</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {preIntegres.map(p => {
                            return (
                                <TableRow key={p.id}>
                                    <TableCell>
                                        <Checkbox
                                            className={"ml-2"}
                                            checked={selectedIds.includes(p.id)}
                                            onCheckedChange={() => toggleSelect(p.id)}
                                            aria-label={`Select ${p.name}`}
                                        />
                                    </TableCell>
                                    <TableCell>{p.name}</TableCell>
                                    <TableCell className="text-xs text-gray-600 max-w-[200px]">{p.address}</TableCell>
                                    <TableCell>{p.segment}</TableCell>
                                    <TableCell>{p.perimeter}</TableCell>
                                    <TableCell className={"w-[100px]"}>
                                        {displayBulletinDocumentState(p.documents.bulletin.state)}
                                    </TableCell>
                                    <TableCell className={"w-[100px]"}>
                                        {displayAccordsDocumentState(p.documents.accord.state)}
                                    </TableCell>
                                    <TableCell className={"w-[100px]"}>
                                        {displayContractDocumentState(p.documents.contract.state)}
                                        {p.documents.contract.state === SignedSaleDocumentStatus.PropositionAAccepter && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Button
                                                            onClick={() => consumerAcceptPrice(p.id)}
                                                            size={'sm'}
                                                            className={'text-xs text-gray-700'}
                                                            variant={'link'}
                                                        >
                                                            <TimerIcon className={'size-3 ml-2'}/>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Le consommateur accepte le prix</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}

                                    </TableCell>
                                    <TableCell className={"text-xs"}>
                                        {p.exportDate}
                                    </TableCell>
                                    <TableCell>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className={"rounded-l-none text-gray-500"}
                                                        size="sm">
                                                    <MoreHorizontalIcon className="size-4"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className={"text-gray-700 text-xs space-y-2"}>
                                                <DropdownMenuItem onClick={() => exportData(p.id)}>
                                                    <DownloadIcon className={'size-4 mr-2'}/>
                                                    <span>{'Exporter les données'}</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => sendDocumentsTo(p.id)}>
                                                    <SendIcon className={'size-4 mr-2'}/>
                                                    <span>{'Envoyer les documents pour signature'}</span>
                                                </DropdownMenuItem>
                                                <Separator/>
                                                <DropdownMenuItem className={"text-red-600"}
                                                                  onClick={() => reject(p.id)}>
                                                    <XIcon className="mr-2 h-4 w-4"/>
                                                    <span>Refuser</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
                {preIntegres.length === 0 && <EmptyUserTable/>}
            </div>
        </div>
    );
}

function EmptyUserTable() {
    return <div className="max-w-sm w-full min-h-[400px] flex flex-col justify-center mx-auto px-6 py-4">
        <div className="flex justify-center items-center size-[46px] bg-gray-100 rounded-lg dark:bg-neutral-800">
            <UserIcon className={"size-6"}/>
        </div>

        <h2 className="mt-5 font-semibold text-gray-800 dark:text-white">
            Pas de consommateurs pré-intégrés
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
            {"Les candidatures acceptées seront affichés ici."}
        </p>
    </div>
}