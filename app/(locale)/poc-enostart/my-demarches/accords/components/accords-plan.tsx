import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {CheckIcon} from "lucide-react";

export default function AccordsPlan() {
    const hasPrestation = true
    return (
        <AccordionItem value="accords-plan">
                    <AccordionTrigger className="text-lg font-semibold">
                        <div className={"flex"}>
                            {"Prestation"}
                            {hasPrestation && <CheckIcon className="h-6 w-6 text-green-500 ml-2"/>}
                        </div>
                        </AccordionTrigger>
            <AccordionContent>
                <div className="space-y-4 p-8">
                    <div>
                        <h3 className="font-semibold text-gray-700">Pourquoi faire ses démarches sur Mon énergie collective ?</h3>
                                <ul className="text-xs text-gray-500 list-disc list-inside">
                                    <li>Selon la prestation choisie, vous pourrez :</li>
                                    <li>{"Créer vos statuts PMO associative, votre réglement intérieur et de préparer votre PV de création d'AG"}
                                    </li>
                                    <li>{"Editer  un bulletin d'adhésion à l'association PMO à chacun de vos consommateurs,"}
                                    </li>
                                    <li>{"Préparer les documents administratifs nécessaires à l'opération d'autoconsommation collective"}
                                    </li>
                                    <li>{"Récupérer les documents signés, téléchargeables"}</li>
                                </ul>
                            </div>

                            <div className="flex justify-between gap-4">
                                <Card className="flex-1 max-w-80">
                                    <CardContent className="p-4">
                                        <h3 className="text-2xl font-bold mb-2">400 €</h3>
                                        <ul className="text-sm list-disc list-inside">
                                            <li>aide à la création des accords de participation,</li>
                                            <li>édition, envoie aux participants et réception des accords signés</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                            </div>

                            <Button variant={'secondary'} className="w-full">Valider la prestation</Button>

                            <Button variant={'link'} className="text-xs text-gray-700 text-center underline">
                                Je souhaite réaliser ces démarches sans Mon énergie collective.
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
    )
}