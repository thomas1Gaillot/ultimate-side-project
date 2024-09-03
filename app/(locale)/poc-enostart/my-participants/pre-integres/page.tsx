'use client'
import {TypographyH4} from "@/components/ui/typography";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {BellIcon, Clock, DownloadIcon, SendIcon, TimerIcon, TrashIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {enedisMapper, EnedisStatus} from "@/app/(locale)/poc-enostart/data/enedis-status";
import {pmoMapper, PmoStatus} from "../../data/pmo-status";
import {salesMapper, SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import {useParticipants} from "@/app/(locale)/poc-enostart/data/participants";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";


export default function Page() {
    const {preIntegres, reject, exportData, sendDocument, consumerAcceptPrice, consumersSignAllDocuments} = useParticipants()
    const preIntegratedReadyToSign = (id: number) =>
        preIntegres.some(p => p.id === id && p.sales === SalesStatus.EnvoyerLeContrat && p.pmo === PmoStatus.EnvoyerLeBulletin && p.enedis === EnedisStatus.EnvoyerLAccord)


    return <div className={"p-16"}><TypographyH4>
        <>
            Consommateurs Pré-intégrés
            <Clock onClick={consumersSignAllDocuments} className={"size-3"}/>
        </>
    </TypographyH4>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Périmètre</TableHead>
                    <TableHead>{"Date d'export"}</TableHead>
                    <TableHead>{"Bulletin d'adhésion"}</TableHead>
                    <TableHead>Accords de participation</TableHead>
                    <TableHead>Démarches de vente</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {preIntegres.map((p) => {
                    const PmoIcon = p.pmo ? pmoMapper(p.pmo).icon as any : <></>
                    const EnedisIcon = p.enedis ? enedisMapper(p.enedis).icon as any : <></>
                    const SalesIcon = p.sales ? salesMapper(p.sales).icon as any : <></>
                    return (
                        <TableRow key={p.id}>
                            <TableCell>{p.name}</TableCell>
                            <TableCell>{p.perimeter}</TableCell>
                            <TableCell className={"text-xs"}>{p.exportDate}</TableCell>
                            <TableCell>
                                {p.pmo && <div className={cn("flex items-center text-xs",
                                    pmoMapper(p.pmo).icon === BellIcon ? 'text-gray-700' : 'text-gray-300')}>
                                    {pmoMapper(p.pmo).name}
                                    <PmoIcon className={'size-4 ml-2'}/>
                                </div>}
                            </TableCell>
                            <TableCell>
                                {p.enedis && <div className={cn("flex items-center text-xs",
                                    EnedisIcon === BellIcon ? 'text-gray-700' : 'text-gray-300')}>
                                    {enedisMapper(p.enedis).name}
                                    <EnedisIcon className={'size-4 ml-2'}/>
                                </div>}
                            </TableCell>
                            <TableCell>
                                {p.sales && <div className={cn("flex items-center text-xs",
                                    SalesIcon === BellIcon ? 'text-gray-700' : 'text-gray-300')}>
                                    {salesMapper(p.sales).name}
                                    <SalesIcon className={'size-4 ml-2'}/>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button
                                                    onClick={() => consumerAcceptPrice(p.id)}
                                                    size={'sm'} className={'text-xs text-gray-700'}
                                                    variant={'link'}><TimerIcon
                                                    className={'size-3 ml-2'}/> </Button></TooltipTrigger>
                                            <TooltipContent>
                                                <p>Le consommateur accepte le prix</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>

                                </div>}
                            </TableCell>
                            <TableCell>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button
                                                onClick={() => exportData(p.id)}
                                                size={'sm'} className={'text-xs text-gray-700'}
                                                variant={'link'}><DownloadIcon
                                                className={'size-4 ml-2'}/> </Button></TooltipTrigger>
                                        <TooltipContent>
                                            <p>Exporter les données de {p.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                {preIntegratedReadyToSign(p.id) && <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button
                                                onClick={() => sendDocument(p.id)}
                                                size={'sm'} className={'text-xs '} variant={'link'}>
                                                Envoyer<SendIcon
                                                className={'size-4 ml-2 animate-bounce hover:animate-none'}/> </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Envoyer les documents à {p.name} pour signature</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>}

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button
                                                onClick={() => reject(p.id)}
                                                size={'sm'} className={'text-red-500 text-xs'}
                                                variant={'link'}><TrashIcon
                                                className={'size-4 ml-2'}/> </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Refuser {p.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>


                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    </div>
}