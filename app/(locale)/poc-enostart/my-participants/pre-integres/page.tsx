'use client'
import {TypographyH4} from "@/components/ui/typography";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {
    Clock,
    DownloadIcon,
    HourglassIcon,
    MoreHorizontalIcon,
    SendIcon,
    TimerIcon,
    UserIcon,
    XIcon
} from "lucide-react";
import {cn} from "@/lib/utils";
import {enedisMapper, EnedisStatus} from "@/app/(locale)/poc-enostart/data/enedis-status";
import {pmoMapper, PmoStatus} from "../../data/pmo-status";
import {salesMapper, SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import {useParticipants} from "@/app/(locale)/poc-enostart/data/participants";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Checkbox} from "@/components/ui/checkbox"; // Assuming you have a Checkbox component
import {useState} from "react";
import {Separator} from "@/components/ui/separator";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {candidatures_flow} from "@/app/(locale)/poc-enostart/data/flow";

export default function Page() {
    const {
        preIntegres,
        reject,
        exportData,
        sendDocument,
        consumerAcceptPrice,
        consumersSignAllDocuments
    } = useParticipants();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState<boolean>(false);

    const preIntegratedReadyToSign = (id: number) =>
        preIntegres.some(p => p.id === id && p.sales === SalesStatus.EnvoyerLeContrat && p.pmo === PmoStatus.EnvoyerLeBulletin && p.enedis === EnedisStatus.EnvoyerLAccord);

    const atLeastOneReadyToSign = preIntegres.some(p => p.sales === SalesStatus.ContratEnvoye && p.pmo === PmoStatus.BulletinEnvoye && p.enedis === EnedisStatus.AccordEnvoye);

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
        selectedIds.forEach(id => exportData(id));
    };

    return (
        <div className={"px-4"}>
            <div className={" rounded-lg border"}>
                <div className="flex justify-between items-center p-4">
                    <TypographyH4>
                        <>
                            Consommateurs Pré-intégrés
                            {atLeastOneReadyToSign && <Clock onClick={consumersSignAllDocuments} className={"size-3"}/>}
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
                            <TableHead>{"Document : Bulletin"}</TableHead>
                            <TableHead>Document : Accords</TableHead>
                            <TableHead>Document : Contrat</TableHead>
                            <TableHead>{"Données exportées"}</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {preIntegres.map(p => {
                            const PmoIcon = p.pmo ? pmoMapper(p.pmo).icon : null;
                            const EnedisIcon = p.enedis ? enedisMapper(p.enedis).icon : null;
                            const SalesIcon = p.sales ? salesMapper(p.sales).icon : null;

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
                                    <TableCell>
                                        {p.pmo && (
                                            <div
                                                className={cn("flex items-center text-xs", pmoMapper(p.pmo).icon === HourglassIcon ? 'text-gray-300' : 'text-gray-700')}>
                                                {pmoMapper(p.pmo).name}
                                                {PmoIcon && <PmoIcon className={'size-4 ml-2'}/>}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {p.enedis && (
                                            <div
                                                className={cn("flex items-center text-xs", EnedisIcon === HourglassIcon ? 'text-gray-300' : 'text-gray-700')}>
                                                {enedisMapper(p.enedis).name}
                                                {EnedisIcon && <EnedisIcon className={'size-4 ml-2'}/>}
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {p.sales && (
                                            <div
                                                className={cn("flex items-center text-xs", SalesIcon === HourglassIcon ? 'text-gray-300' : 'text-gray-700')}>
                                                {salesMapper(p.sales).name}
                                                {SalesIcon && <SalesIcon className={'size-4 ml-2'}/>}
                                                {p.sales === 'PrixPropose' && (
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
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className={"text-xs"}>
                                        {p.exportDate}
                                        {/*<TooltipProvider>*/}
                                        {/*    <Tooltip>*/}
                                        {/*        <TooltipTrigger>*/}
                                        {/*            <Button*/}
                                        {/*                onClick={() => exportData(p.id)}*/}
                                        {/*                size={'sm'}*/}
                                        {/*                className={cn('text-xs text-primary flex items-center', p.exportDate && 'text-gray-700')}*/}
                                        {/*                variant={'link'}*/}
                                        {/*            >*/}
                                        {/*                {!p.exportDate && 'Exporter les données'}*/}
                                        {/*                <DownloadIcon className={'size-4 ml-2'}/>*/}
                                        {/*            </Button>*/}
                                        {/*        </TooltipTrigger>*/}
                                        {/*        <TooltipContent>*/}
                                        {/*            <p>Exporter les données de {p.name}</p>*/}
                                        {/*        </TooltipContent>*/}
                                        {/*    </Tooltip>*/}
                                        {/*</TooltipProvider>*/}
                                    </TableCell>
                                    <TableCell>
                                        {preIntegratedReadyToSign(p.id) && (
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Button
                                                            onClick={() => sendDocument(p.id)}
                                                            size={'sm'}
                                                            className={'text-xs '}
                                                            variant={'link'}
                                                        >
                                                            Envoyer<SendIcon
                                                            className={'size-4 ml-2 animate-bounce hover:animate-none'}/>
                                                        </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Envoyer les documents à {p.name} pour signature</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        )}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="outline" className={"rounded-l-none text-gray-500"} size="sm">
                                                    <MoreHorizontalIcon className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className={"text-gray-700 text-xs space-y-2"}>
                                                <DropdownMenuItem  onClick={() => exportData(p.id)}>
                                                    <DownloadIcon className={'size-4 mr-2'}/>
                                                    <span>{'Exporter les données'}</span>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem  onClick={() => exportData(p.id)}>
                                                    <SendIcon className={'size-4 mr-2'}/>
                                                    <span>{'Envoyer les documents pour signature'}</span>
                                                </DropdownMenuItem>
                                                <Separator/>
                                                <DropdownMenuItem className={"text-red-600"} onClick={() => reject(p.id)}>
                                                    <XIcon className="mr-2 h-4 w-4" />
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