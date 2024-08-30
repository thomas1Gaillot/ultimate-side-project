import {useParticipants} from "@/app/(locale)/poc-enostart/data/participants";
import {salesMapper, SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import {BellIcon, Settings2Icon, TrashIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

export default function AssociateContractAccordion() {
    const {preIntegres, reject, exportData, sendDocument} = useParticipants()
    const preIntegresToAssociatePrice = preIntegres.filter(p => p.sales === SalesStatus.AssocierLeContrat)
    return (
        <AccordionItem value="associate-contract">
            <AccordionTrigger
                className="text-lg font-semibold">
                <div className={"flex"}>
                    {"2. J'associe un contrat de vente à chaque consommateur"}
                </div>
            </AccordionTrigger>
            <AccordionContent className={"p-8 gap-4 grid"}>
                {preIntegresToAssociatePrice.length > 0 ? <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {preIntegresToAssociatePrice.map((p) => {
                                return (
                                    <TableRow key={p.id}>
                                        <TableCell>{p.name}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => exportData(p.id)}
                                                size={'sm'} className={'text-xs text-gray-700'} variant={'link'}>
                                                Associer à un contrat de vente
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
                    <span>Pas de nouveaux participants à associer un contrat.</span>}
            </AccordionContent>
        </AccordionItem>
    )
}