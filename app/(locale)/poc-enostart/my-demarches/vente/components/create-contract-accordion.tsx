'use client'
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction, useState} from "react";
import {Badge} from "@/components/ui/badge";
import {ReceiptIcon, XIcon} from "lucide-react";
import {ContractDocument, useStoredDocuments} from "@/app/(locale)/poc-enostart/data/use-documents";
import { cn } from "@/lib/utils";


const contracts:ContractDocument[] = [
    {
        name : 'Contrat consommateur type particulier',
        duration : 'indéterminée',
        price : '0.12€/kWh',
        indexation : '% variable INSEE',
        moreInfo : false
    },
    {
        name : 'Contrat consommateur type professionnel, avec penalité',
        duration : '5 ans',
        price : '0.11 €/kWh',
        indexation : '% variable INSEE',
        moreInfo : true
    },
]
export default function CreateContractAccordion() {
    const {salesContract} = useStoredDocuments()


    return (
        <AccordionItem value="bulletin">
            <AccordionTrigger
                className="text-lg font-semibold">
                <div className={"flex"}>
                    {"Je crée mes contrats de vente"}
                </div>
            </AccordionTrigger>
            <AccordionContent className={"p-8 gap-4 grid"}>
                <div className={"flex justify-between w-full text-lg"}>
                    Liste des contrats
                </div>
                <MyContracts storedContracts={salesContract}/>


            </AccordionContent>
        </AccordionItem>
    )
}

export function MyContracts({storedContracts, onContractSelect, selectedContract}:{
    storedContracts: ContractDocument[];
    onContractSelect?:  Dispatch<SetStateAction<ContractDocument | null>>;
    selectedContract?: ContractDocument | null;
}) {
    const {setSalesContract} = useStoredDocuments()
    const createInMemoryContracts = () => {
        setSalesContract(contracts)
    }
    return <div className={"grid max-w-md gap-4"}>

        <Button onClick={() => createInMemoryContracts()} variant={'secondary'}>Ajouter un contrat de vente</Button>
        {storedContracts.map((contract, index) => {
            const isSelectedContract = selectedContract?.name === contract.name
            return (
                <div
                    onClick={() => onContractSelect && onContractSelect(contract)}
                    key={index} className={cn("flex cursor-pointer flex-wrap gap-2 rounded bg-gray-50 hover:bg-gray-100 p-4 border border-gray-50",
                    isSelectedContract && 'border-primary bg-primary/10')}>
                    <div className={"w-full flex justify-between"}>
                        <div className={" w-full flex items-center truncate"}>
                            <ReceiptIcon className={"size-4 mr-2"}/>
                            {contract.name}</div>
                        <XIcon className={"size-4 cursor-pointer relative bottom-2 left-2"} onClick={() => setSalesContract(storedContracts.filter((_, i) => i !== index))}/>
                    </div>
                    <Badge variant={'secondary'}>{contract.duration}</Badge>
                    <Badge variant={'secondary'}>{contract.price}</Badge>
                    <Badge variant={'secondary'}>{contract.indexation}</Badge>
                    {!contract.moreInfo && <Badge variant={'destructive'}>Incomplet</Badge>}
                </div>
            )
        })}
        {storedContracts.length === 0 && <div className={"text-left"}>Aucun contrat de vente créé.</div>}

    </div>
}