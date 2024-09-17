'use client'
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Settings2Icon, XIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Button} from "@/components/ui/button";
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
import {useRouter} from "next/navigation";
import {useState} from "react";
import RedirectToMyProject from "@/app/(locale)/poc-enostart/components/RedirectToMyProject";
import useParticipants from "@/app/(locale)/poc-enostart/data-refactored/participant/use-participants";
import {SignedSaleDocumentStatus} from "@/app/(locale)/poc-enostart/data-refactored/participant/signed-document-status";
import useSalesContractDocument from "@/app/(locale)/poc-enostart/data-refactored/document/use-sales-contract-document";
import {SalesDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/document";

export default function SendPriceAccordion() {
    const {preIntegres, reject, proposePrice, proposePriceToMultipleParticipants} = useParticipants()
    const preIntegresToSendPrice = preIntegres
        .filter(p => p.documents.contract.state === SignedSaleDocumentStatus.EnAttenteDeLaProposition)
    const salesContract = useSalesContractDocument()
    const [selectedContract, setSelectedContract] = useState<SalesDocument | null>(null);

    const router = useRouter()

    const setTab = (newTab: string) => {
        // Set the new query parameter
        router.push(`?tab=${newTab}`); // This will update the URL with ?tab=newTab
    };
    const proposePriceToAll = () => {
        proposePriceToMultipleParticipants(selectedContract)
    }

    return (
        <AccordionItem value="send-price">
            <AccordionTrigger
                onClick={() => setTab('send-price')}
                className="text-lg font-semibold">
                <div className={"flex"}>
                    {"2. Je propose un prix de vente"}
                </div>
            </AccordionTrigger>
            <AccordionContent className={"p-8 gap-4 flex flex-col w-full items-end"}>
                <Button
                    variant={'outline'}
                    onClick={proposePriceToAll}
                    size={'sm'} className={'text-xs w-max'}>
                    Proposer un prix à tous
                    <Settings2Icon
                        className={'size-4 ml-2'}/>
                </Button>
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
                                                        variant={'outline'}
                                                        size={'sm'} className={'text-xs'}>
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
                                                    <MyContracts
                                                        storedContracts={salesContract.documents}
                                                        onContractSelect={setSelectedContract}
                                                        selectedContract={selectedContract}
                                                    />
                                                    <DialogFooter>
                                                        <Button
                                                            onClick={() => proposePrice(p.id, selectedContract)}
                                                            type="submit"
                                                            disabled={!selectedContract}
                                                        >
                                                            Envoyer cette proposition au consommateur
                                                        </Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Button onClick={() => reject(p.id)} size={'sm'}
                                                                className={'text-red-500 text-xs'}
                                                                variant={'link'}>Refuser<XIcon
                                                            className={'size-4 ml-1'}/> </Button>
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
                    <RedirectToMyProject/>
                }
            </AccordionContent>
        </AccordionItem>
    )
}

