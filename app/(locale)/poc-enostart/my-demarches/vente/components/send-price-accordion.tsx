'use client'
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import {Settings2Icon, TrashIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
import {useParticipants} from "@/app/(locale)/poc-enostart/data/participants";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {MyContracts} from "@/app/(locale)/poc-enostart/my-demarches/vente/components/create-contract-accordion";
import {useStoredDocuments} from "@/app/(locale)/poc-enostart/data/use-documents";
import {useRouter} from "next/navigation";

export default function SendPriceAccordion() {
    const {preIntegres, reject, proposePrice} = useParticipants()
    const preIntegresToSendPrice = preIntegres.filter(p => p.sales === SalesStatus.ProposerUnPrix)
    const {salesContract} = useStoredDocuments()
    const router = useRouter()
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
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        size={'sm'} className={'text-xs text-gray-700'} variant={'link'}>
                                                        Proposer un prix
                                                        <Settings2Icon
                                                            className={'size-4 ml-2'}/> </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-xl">
                                                    <DialogHeader>
                                                        <DialogTitle>{"Proposer un prix de vente"}</DialogTitle>
                                                        <DialogDescription>
                                                            {"Make changes to your profile here. Click save when you're done."}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <MyContracts storedContracts={salesContract}/>
                                                    <DialogFooter>
                                                        <Button
                                                            onClick={() => proposePrice(p.id)}
                                                            type="submit">Envoyer cette proposition au
                                                            consommateur </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

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
                    <div>
                        Pas de nouveaux participants à proposer un prix.
                        <Button
                            onClick={() => router.push('/poc-enostart/my-participants/pre-integres')}
                            variant={'link'}>Voir la liste de participants pré-intégrés</Button>
                    </div>}
            </AccordionContent>
        </AccordionItem>
    )
}