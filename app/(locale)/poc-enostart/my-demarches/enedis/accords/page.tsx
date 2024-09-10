import AccordsParticipation
    from "@/app/(locale)/poc-enostart/my-demarches/enedis/accords/components/accords-participation";
import {Accordion} from "@/components/ui/accordion";

export default function AccordsPage() {
    return (
        <div className="max-w-4xl space-y-4">
            <div>
                <h3 className="font-semibold text-gray-700">{"Qu'est ce que les accords de participation et pourquoi en ai-je besoin ?"}</h3>
                <p className="text-xs text-gray-500">
                    {`"Producteur(s) et consommateur(s) sont liés entre eux au sein d’une personne morale" (Article L 315-2 – code de l’énergie)
La Personne Morale Organisatrice (PMO) doit rassembler tous les participants d'une opération d'autoconsommation collective.
Elle est l'interlocuteur unique de l'opération avec le Gestionnaire de Réseau de Distribution (GRD)`}
                </p>
            </div>
            <Accordion type="single" collapsible className="w-full grid gap-4 max-w-4xl">
                <AccordsParticipation/>
            </Accordion>
        </div>
    );
}
