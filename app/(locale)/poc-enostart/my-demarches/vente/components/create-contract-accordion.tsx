'use client'
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction} from "react";
import {XIcon} from "lucide-react";
import {ContractDocument, useStoredDocuments} from "@/app/(locale)/poc-enostart/data/documents/use-documents";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {IconFileEuro} from "@tabler/icons-react";
import {Separator} from "@/components/ui/separator";


const contracts: ContractDocument[] = [
    {
        name: 'Contrat consommateur type particulier',
        duration: 'indéterminée',
        price: '0.12€/kWh',
        indexation: '% variable INSEE',
        moreInfo: false
    },
    {
        name: 'Contrat consommateur type professionnel, avec penalité',
        duration: '5 ans',
        price: '0.11 €/kWh',
        indexation: '% variable INSEE',
        moreInfo: true
    },
]
export default function CreateContractAccordion() {
    const router = useRouter()

    const setTab = (newTab: string) => {
        // Set the new query parameter
        router.push(`?tab=${newTab}`); // This will update the URL with ?tab=newTab
    };
    const {salesContract} = useStoredDocuments()

    return (
        <AccordionItem value="create-contracts">
            <AccordionTrigger
                onClick={() => setTab('create-contracts')}
                className="text-lg font-semibold">
                <div className={"flex"}>
                    {"1. Je crée mes contrats de vente"}
                </div>
            </AccordionTrigger>
            <AccordionContent className={""}>
                <MyContracts storedContracts={salesContract}/>
            </AccordionContent>
        </AccordionItem>
    )
}

export function MyContracts({storedContracts, onContractSelect, selectedContract}: {
    storedContracts: ContractDocument[];
    onContractSelect?: Dispatch<SetStateAction<ContractDocument | null>>;
    selectedContract?: ContractDocument | null;
}) {
    const {setSalesContract} = useStoredDocuments()

    const createInMemoryContracts = () => {
        setSalesContract(contracts)
    }

    return <div className={"grid gap-4"}>

        {storedContracts.map((contract, index) => {
            const isSelectedContract = selectedContract?.name === contract.name
            return (
                <div
                    onClick={() => onContractSelect && onContractSelect(contract)}
                    key={index}
                    className={cn("flex cursor-pointer gap-4 rounded-lg  p-4 border border-gray-200",
                        isSelectedContract && 'border-primary bg-primary/10')}>
                    <div className={"rounded-xl bg-primary/10 p-2 flex items-center justify-center"}>
                        <IconFileEuro className={"size-6 text-primary min-w-6 min-h-6"}/>
                    </div>
                    <div className={"w-full grid justify-between"}>
                        <div className={" w-full truncate font-medium text-lg"}>
                            {contract.name}
                        </div>
                        <div className={" flex text-sm flex-wrap gap-2 items-center text-gray-500"}>
                            {contract.duration}
                            <Separator orientation={'vertical'}/>
                            {contract.price}
                            <Separator orientation={'vertical'}/>
                            {contract.indexation}
                            <Separator orientation={'vertical'}/>
                            {!contract.moreInfo && <span className={"text-red-600"}>Incomplet</span>}
                        </div>
                    </div>
                    <XIcon className={"size-4 cursor-pointer relative bottom-2 left-2"}
                           onClick={() => setSalesContract(storedContracts.filter((_, i) => i !== index))}/>

                </div>
            )
        })}
        {storedContracts.length === 0 &&
            <div className={"flex flex-col items-center gap-4 justify-center w-full text-lg p-8"}>
                <span className={"font-semibold"}>Liste des contrats</span>
                <span className={"text-gray-500 text-center"}>Créer vos contrats de vente, puis proposerez-les aux participants pré-intégrés.</span>
                <Button className={"w-max"} onClick={() => createInMemoryContracts()}>Créer un contrat de
                    vente</Button>
            </div>
        }

    </div>
}