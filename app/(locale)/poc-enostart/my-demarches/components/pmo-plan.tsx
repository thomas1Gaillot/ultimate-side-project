import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {Card, CardContent} from "@/components/ui/card"
import {Button} from "@/components/ui/button"

export default function PMOPlan() {
    return (
        <div className="max-w-4xl space-y-4">
            <div>
                <h3 className="font-semibold text-gray-700">Qu'est ce que la PMO et pourquoi en ai-je besoin ?</h3>
                <p className="text-xs text-gray-500">
                    "Producteur(s) et consommateur(s) qui sont liés entre eux au sein d'une personne morale" (Article
                    L.315-2 - code de l'énergie)
                    La Personne Morale Organisatrice (PMO) doit rassembler tous les participants d'une opération
                    d'autoconsommation collective.
                    Elle est l'interlocuteur unique de l'opération avec le Gestionnaire de Réseau de Distribution (GRD).
                </p>
                <p className="text-xs text-gray-500">
                    Pour pouvoir rejoindre l'opération d'autoconsommation collective,
                    les participants (consommateurs et producteurs) doivent adhérer à l'association PMO.
                </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="prestation">
                    <AccordionTrigger className="text-lg font-semibold">Prestation</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-gray-700">Pourquoi faire ses démarches de PMO sur Mon
                                    énergie collective ?</h3>
                                <ul className="text-xs text-gray-500 list-disc list-inside">
                                    <li>Selon la prestation choisie, nous pourrons :</li>
                                    <li>Créer vos statuts PMO associative, votre règlement intérieur et de préparer votre PV de création d'AG</li>
                                    <li>Editer un bulletin d'adhésion à l'association PMO à chacun de vos consommateurs</li>
                                    <li>Préparer les documents administratifs nécessaires à l'opération d'autoconsommation collective</li>
                                    <li>Récupérer les documents signés, téléchargeables</li>
                                </ul>
                            </div>

                            <div className="flex justify-between gap-4">
                                <Card className="flex-1">
                                    <CardContent className="p-4">
                                        <h3 className="text-2xl font-bold mb-2">400 €</h3>
                                        <ul className="text-sm list-disc list-inside">
                                            <li>aide à la création de la PMO</li>
                                            <li>mise à disposition DI</li>
                                            <li>création convention-PV d'AG</li>
                                            <li>édition des bulletins d'adhésion</li>
                                            <li>envoi, suivi et signature des bulletins d'adhésion</li>
                                        </ul>
                                    </CardContent>
                                </Card>
                                <Card className="flex-1 border-2 border-primary bg-primary/10">
                                    <CardContent className="p-4 ">
                                        <h3 className="text-2xl font-bold mb-2">100 €</h3>
                                        <ul className="text-sm list-disc list-inside">
                                            <li>édition des bulletins d'adhésion</li>
                                            <li>envoi, suivi et signature des bulletins d'adhésion</li>
                                        </ul>
                                        <p className="text-xs mt-2">
                                            Attention : vous devez vous même créer vos status PMO et les déposer sur la plateforme
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>

                            <Button variant={'secondary'} className="w-full">Valider la prestation</Button>

                            <Button variant={'link'}  className="text-xs text-gray-700 text-center underline">
                                Je souhaite réaliser ces démarches sans Mon énergie collective.
                            </Button>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}