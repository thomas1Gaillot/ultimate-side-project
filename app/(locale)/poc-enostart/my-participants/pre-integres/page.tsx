'use client'
import {TypographyH4} from "@/components/ui/typography";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {BellIcon, Clock, DownloadIcon, HourglassIcon, SendIcon, TimerIcon, TrashIcon} from "lucide-react";
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

    const atLeastOneReadyToSign = preIntegres.some(p => p.sales === SalesStatus.ContratEnvoye && p.pmo === PmoStatus.BulletinEnvoye && p.enedis === EnedisStatus.AccordEnvoye)
    return <div className={"p-16"}><TypographyH4>
        <>
            Consommateurs Pré-intégrés
            {atLeastOneReadyToSign && <Clock onClick={consumersSignAllDocuments} className={"size-3"}/>}
        </>
    </TypographyH4>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Périmètre</TableHead>

                    <TableHead>{"Bulletin d'adhésion"}</TableHead>
                    <TableHead>Accords de participation</TableHead>
                    <TableHead>Démarches de vente</TableHead>
                    <TableHead>{"Exporter les données"}</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {preIntegres.map((p) => {
                    const PmoIcon = p.pmo ? pmoMapper(p.pmo).icon : null
                    const EnedisIcon = p.enedis ? enedisMapper(p.enedis).icon  : null
                    const SalesIcon = p.sales ? salesMapper(p.sales).icon : null
                    return (
                        <TableRow key={p.id}>
                            <TableCell>{p.name}</TableCell>
                            <TableCell>{p.perimeter}</TableCell>
                            <TableCell>
                                {p.pmo && <div className={cn("flex items-center text-xs",
                                    pmoMapper(p.pmo).icon === HourglassIcon ? 'text-gray-300' : 'text-gray-700')}>
                                    {pmoMapper(p.pmo).name}
                                    {PmoIcon && <PmoIcon className={'size-4 ml-2'}/>}
                                </div>}
                            </TableCell>
                            <TableCell>
                                {p.enedis && <div className={cn("flex items-center text-xs",
                                    EnedisIcon === HourglassIcon ? 'text-gray-300' : 'text-gray-700')}>
                                    {enedisMapper(p.enedis).name}
                                    {EnedisIcon && <EnedisIcon className={'size-4 ml-2'}/>}
                                </div>}
                            </TableCell>


                            <TableCell>
                                {p.sales  && <div className={cn("flex items-center text-xs",
                                    SalesIcon  === HourglassIcon ? 'text-gray-300' : 'text-gray-700')}>
                                    {salesMapper(p.sales).name}
                                    {SalesIcon && <SalesIcon className={'size-4 ml-2'}/>}
                                    {p.sales ===  'PrixPropose' && <TooltipProvider>
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
                                    </TooltipProvider>}

                                </div>}
                            </TableCell>
                            <TableCell className={"text-xs"}>
                                {p.exportDate}
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>

                                            <Button
                                                onClick={() => exportData(p.id)}
                                                size={'sm'} className={cn('text-xs text-primary flex items-center',
                                            p.exportDate && 'text-gray-700')}
                                                variant={'link'}>
                                                {!p.exportDate && 'Exporter les données'}
                                                <DownloadIcon className={'size-4 ml-2'}/>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Exporter les données de {p.name}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider></TableCell>
                            <TableCell>

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