'use client'
import {TypographyH4} from "@/components/ui/typography";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {
    Clock,
    DownloadIcon,
    FileCheck2Icon,
    FileText,
    FileWarningIcon,
    MoreHorizontalIcon,
    ScrollTextIcon,
    SendIcon,
    TimerIcon,
    UserIcon,
    XIcon
} from "lucide-react";
import {cn} from "@/lib/utils";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Checkbox} from "@/components/ui/checkbox"; // Assuming you have a Checkbox component
import {useEffect, useState} from "react";
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
import ProducerCard from "@/app/(locale)/poc-enostart/my-participants/ProducerCard";
import {Input} from "@/components/ui/input";

export default function Page() {
    const [openMultiple, setOpenMultiple] = useState(false);
    const [openId, setOpenId] = useState<null | number>(null);

    const {
        preIntegres,
        reject,
        exportData, exportMultipleData,
        sendAllDocuments, sendAllDocumentsToMultiple,
        consumerAcceptPrice,
        consumersSignAllDocuments,
    } = useParticipants();
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

    const sendDocumentsTo = (id: number) => {
        if (!accord.document || !bulletin.document || !contract.documents) return;
        sendAllDocuments(id, bulletin.document, accord.document, contract.propositionDocuments[0]);
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


    return (
        <div className={"px-4 space-y-8"}>
            <ProducerCard/>
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
                        <Dialog key={'multiple-dialog'} open={openMultiple}
                                onOpenChange={() => setOpenMultiple(!openMultiple)}>
                            <DialogTrigger disabled={selectedIds.length === 0} asChild>
                                <Button
                                    variant={'outline'}
                                >
                                    Envoyer les documents ({selectedIds.length})
                                    <SendIcon className={'size-4 ml-2'}/>
                                </Button>
                            </DialogTrigger>
                            <SendDocumentsDialog selectedIds={selectedIds}/>
                        </Dialog>
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
                                <>
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
                                        <TableCell
                                            className="text-xs text-gray-600 max-w-[200px]">{p.address}</TableCell>
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
                                                    <DropdownMenuItem onClick={() => setOpenId(Number(p.id))}>
                                                        <SendIcon className={'size-4 mr-2'}/>
                                                        Envoyer les documents pour signature
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
                                </>
                            );
                        })}
                    </TableBody>
                </Table>
                <Dialog key={'unique-dialog'} open={openId !== null}
                        onOpenChange={() => setOpenId(null)}>
                    {openId && <SendDocumentsDialog selectedIds={[openId]}/>}
                </Dialog>
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

function SendDocumentsDialog({ selectedIds }: { selectedIds: number[] }) {
    const { sendAllDocumentsToMultiple, preIntegres } = useParticipants();
    const [submitWithWarning, setSubmitWithWarning] = useState(false);
    const [selectedDocumentsCount, setSelectedDocumentsCount] = useState(0); // Track selected documents count
    const bulletin = useBulletinDocument();
    const contract = useSalesContractDocument();
    const accord = useAccordsDocument();
    const selectedConsumers = preIntegres.filter(p => selectedIds.includes(p.id));

    const sendDocuments = () => {
        if (!accord.document || !bulletin.document || !contract.documents) return;
        sendAllDocumentsToMultiple(selectedIds.map(id => Number(id)), bulletin.document, accord.document, contract.propositionDocuments[0]);
    };

    const atLeastOneUnreadyDocument = selectedConsumers.some(p => {
        return !bulletin.isEdited || !accord.isCreated || !contract.hasOneContract || p.documents.contract.state !== SignedSaleDocumentStatus.PropositionAcceptee;
    });



    useEffect(() => {
        // set initial count value based on selected documents
        let totalDocumentsCount = 0;
        selectedConsumers.forEach(p => {
            if (bulletin.isEdited) totalDocumentsCount++;
            if (accord.isCreated) totalDocumentsCount++;
            if (contract.hasOneContract && p.documents.contract.state === SignedSaleDocumentStatus.PropositionAcceptee) totalDocumentsCount++;
        });
        setSelectedDocumentsCount(totalDocumentsCount);
    }, [selectedConsumers]);

    const handleDocumentToggle = (isChecked: boolean) => {
        setSelectedDocumentsCount(prevCount => isChecked ? prevCount + 1 : prevCount - 1);
    };

    return (
        <DialogContent className="bg-white">
            <DialogHeader>
                <DialogTitle>{`Envoyer les documents pour signature (${selectedIds.length})`}</DialogTitle>
            </DialogHeader>
            <div className="h-full flex flex-col justify-between max-h-[70vh] overflow-y-auto text-gray-900 dark:text-neutral-400">
                {selectedConsumers.map(participant => (
                    <>
                        <div className="my-4 text-sm text-gray-500">Documents à signer pour {participant.name}</div>
                        <div className="space-y-1">
                            <DocumentRow
                                title={"Bulletin d'adhésion"}
                                icon={<ScrollTextIcon className="w-6 h-6" />}
                                format={"PDF"}
                                ready={bulletin.isEdited}
                                onToggle={handleDocumentToggle} // Pass the toggle handler
                            />
                            <DocumentRow
                                title={"Accords de participation"}
                                icon={<FileCheck2Icon className="w-6 h-6" />}
                                format={"PDF"}
                                ready={accord.isCreated}
                                onToggle={handleDocumentToggle} // Pass the toggle handler
                            />
                            <DocumentRow
                                title={"Contrat de vente"}
                                icon={<IconFileEuro className="w-6 h-6" />}
                                format={"PDF"}
                                ready={contract.hasOneContract && participant.documents.contract.state === SignedSaleDocumentStatus.PropositionAcceptee}
                                onToggle={handleDocumentToggle} // Pass the toggle handler
                            />
                        </div>
                    </>
                ))}
            </div>
            {atLeastOneUnreadyDocument && selectedDocumentsCount > 0 &&
                <div className="flex items-center gap-4 p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                    <Checkbox
                        id={'submit-with-warning'}
                        checked={submitWithWarning}
                        onCheckedChange={() => setSubmitWithWarning(!submitWithWarning)}
                        aria-label={"Certains documents ne sont pas prêts"}
                    />
                    <label
                        htmlFor="submit-with-warning"
                        className="text-sm text-gray-700 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        {"Vous avez des documents à finaliser. \n"}
                        {"Ignorer et  envoyer la liasse documentaire incomplète."}
                    </label>
                    <FileWarningIcon className={'size-4 min-w-4'} />
                </div>
            }
            {selectedDocumentsCount > 0 ? (
                <Button onClick={sendDocuments} disabled={atLeastOneUnreadyDocument && !submitWithWarning} size={'lg'}>
                    {`Envoyer les documents (${selectedDocumentsCount})`}
                </Button>
            ) : (
                <Button disabled={true} size={'lg'}>
                    {"Aucun documents à envoyer"}
                </Button>
            )}
        </DialogContent>
    );
}

function DocumentRow({ title, icon, format, ready, onToggle }: {
    title: string;
    icon: JSX.Element;
    format: string;
    ready: boolean;
    onToggle: (isChecked: boolean) => void; // Pass a callback to parent
}) {
    const [toggle, setToggle] = useState(true);

    const handleToggleChange = () => {
        const newToggleState = !toggle;
        setToggle(newToggleState);
        onToggle(newToggleState); // Inform parent of change
    };

    return (
        <div className="relative">
            {/* Main row content */}
            <div className="flex items-center space-x-4 mr-4">
                <div className="bg-gray-100 text-gray-700 p-2 rounded">
                    {icon}
                </div>
                <div className="w-full">
                    <p className="text-sm font-medium">{title}</p>
                    <p className="text-xs text-gray-500">Format: {format}</p>
                </div>
                <Input
                    className="size-4"
                    type="checkbox"
                    id="reconduction"
                    checked={toggle}
                    onChange={handleToggleChange}
                    disabled={!ready}  // Disable checkbox if not ready
                />
            </div>

            {/* Blur overlay if not ready */}
            {!ready && (
                <div className="absolute inset-0 flex items-center justify-end bg-white/60 backdrop-blur-[0.5px] rounded">
                    <FileWarningIcon className={"size-4 mr-2"} />
                    <span className="text-gray-800 text-xs uppercase">{"document non terminé"}</span>
                </div>
            )}
        </div>
    );
}