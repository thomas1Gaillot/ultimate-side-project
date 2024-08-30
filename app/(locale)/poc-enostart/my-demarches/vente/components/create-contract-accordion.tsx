'use client'
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {ReceiptIcon} from "lucide-react";

const contracts = [
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


    return (
        <AccordionItem value="bulletin">
            <AccordionTrigger
                className="text-lg font-semibold">
                <div className={"flex"}>
                    {"Je créé mes contrats de vente"}
                </div>
            </AccordionTrigger>
            <AccordionContent className={"p-8 gap-4 grid"}>
                <div className={"flex justify-between w-full text-lg"}>
                    Liste des contrats
                </div>
                <MyContracts/>

            </AccordionContent>
        </AccordionItem>
    )
}

export function MyContracts() {
    const [salesContracts, setSalesContracts] = useState<any[]>([])

    const createInMemoryContracts = () => {
        setSalesContracts(contracts)
    }
    return <div className={"grid max-w-md gap-4"}>

        <Button onClick={() => createInMemoryContracts()} variant={'secondary'}>Ajouter un contrat de vente</Button>
        {salesContracts.map((contract, index) => (
            <div className={"flex flex-wrap gap-2 rounded bg-gray-50 hover:bg-gray-100 p-4"}>
                <div className={" w-full flex items-center truncate"}>
                    <ReceiptIcon className={"size-4 mr-2"}/>
                    {contract.name}</div>
                <Badge variant={'secondary'}>{contract.duration}</Badge>
                <Badge variant={'secondary'}>{contract.price}</Badge>
                <Badge variant={'secondary'}>{contract.indexation}</Badge>
                {!contract.moreInfo && <Badge variant={'destructive'}>Incomplet</Badge>}
            </div>
        ))}
        {salesContracts.length === 0 && <div className={"text-left"}>Aucun contrat de vente créé.</div>}

    </div>
}