'use client'
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Button} from "@/components/ui/button";
import {Dispatch, SetStateAction} from "react";
import {XIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {useRouter} from "next/navigation";
import {IconFileEuro} from "@tabler/icons-react";
import {Separator} from "@/components/ui/separator";
import useSalesContractDocument from "@/app/(locale)/poc-enostart/data-refactored/document/use-sales-contract-document";
import {SalesDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/document";


export default function CreateContractAccordion() {
    const router = useRouter()

    const setTab = (newTab: string) => {
        // Set the new query parameter
        router.push(`?tab=${newTab}`); // This will update the URL with ?tab=newTab
    };
    const sales = useSalesContractDocument()

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
                <MyContracts storedContracts={sales.documents}/>
            </AccordionContent>
        </AccordionItem>
    )
}

export function MyContracts({storedContracts, onContractSelect, selectedContract}: {
    storedContracts: SalesDocument[];
    onContractSelect?: Dispatch<SetStateAction<SalesDocument | null>>;
    selectedContract?: SalesDocument | null;
}) {

    const salesContract = useSalesContractDocument()

    const createInMemoryContracts = () => {
        salesContract.create()
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
                    <XIcon className={"size-4 cursor-pointer relative bottom-2 left-2"}/>

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