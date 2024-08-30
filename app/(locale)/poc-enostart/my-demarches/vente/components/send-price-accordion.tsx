'use client'
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {salesMapper, SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import {cn} from "@/lib/utils";
import {BellIcon, Settings2Icon, TrashIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {useParticipants} from "@/app/(locale)/poc-enostart/data/participants";

export default function SendPriceAccordion() {
    const {preIntegres, reject, proposePrice} = useParticipants()
    const preIntegresToSendPrice = preIntegres.filter(p => p.sales === SalesStatus.ProposerUnPrix)
    return (
        <AccordionItem value="send-price">
            <AccordionTrigger
                className="text-lg font-semibold">
                <div className={"flex"}>
                    {"1. Je propose un prix de vente"}
                </div>
            </AccordionTrigger>
            <AccordionContent className={"p-8 gap-4 grid"}>
                {preIntegresToSendPrice.length > 0 ? <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {preIntegresToSendPrice.map((p) => {
                            return (
                                <TableRow key={p.id}>
                                    <TableCell>{p.name}</TableCell>
                                    <TableCell>
                                        <Button
                                            onClick={() => proposePrice(p.id)}
                                            size={'sm'} className={'text-xs text-gray-700'} variant={'link'}>
                                            Proposer un prix
                                            <Settings2Icon
                                                className={'size-4 ml-2'}/> </Button>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <Button
                                                        onClick={() => reject(p.id)}
                                                        size={'sm'} className={'text-red-500 text-xs'} variant={'link'}><TrashIcon
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
                </Table> :
                <span>Pas de nouveaux participants à proposer un prix.</span>}
            </AccordionContent>
        </AccordionItem>
    )
}