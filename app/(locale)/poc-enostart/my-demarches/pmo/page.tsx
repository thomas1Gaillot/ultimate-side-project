import PmoPrestationAccordionItem from "@/app/(locale)/poc-enostart/my-demarches/pmo/component/pmo-prestation-accordion-item";
import PmoCreationAccordionItem from "@/app/(locale)/poc-enostart/my-demarches/pmo/component/pmo-creation-accordion-item";
import BulletinAccordionItem from "@/app/(locale)/poc-enostart/my-demarches/pmo/component/bulletin-accordion-item";
import {Accordion} from "@/components/ui/accordion";

export default function PmoPage() {
    return (
        <div className="max-w-4xl space-y-4">
            <div>
                <h3 className="font-semibold text-gray-700">{"Qu'est ce que la PMO et pourquoi en ai-je besoin ?"}</h3>
                <p className="text-xs text-gray-500">
                    {`"Producteur(s) et consommateur(s) qui sont liés entre eux au sein d'une personne morale"(Article
                        L.315-2 - code de l'énergie)
                        La Personne Morale Organisatrice (PMO) doit rassembler tous les participants d'une opération
                        d'autoconsommation collective.
                        Elle est l'interlocuteur unique de l'opération avec le Gestionnaire de Réseau de Distribution (GRD).`}
                </p>
                <p className="text-xs text-gray-500">
                    {"Pour pouvoir rejoindre l'opération d'autoconsommation collective, les participants (consommateurs et producteurs) doivent adhérer à l'association PMO."}
                </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
            {/*<PmoPrestationAccordionItem/>*/}
            <PmoCreationAccordionItem/>
            <BulletinAccordionItem/>
            </Accordion>
        </div>
    );
}
