'use client'
import {Button} from "@/components/ui/button";
import {useDocuments, useStoredDocuments} from "@/app/(locale)/poc-enostart/data/use-documents";

export default function EnedisPage() {
    const {setDeclaration} = useStoredDocuments()
    const {isDeclarationSent} = useDocuments()
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
            {isDeclarationSent ?
                <div className="flex items-center gap-4">
                    <Button variant="secondary">Déclaration envoyée</Button>
                    <Button variant="ghost">Visualiser</Button>
                </div> :
                <Button onClick={() => setDeclaration({
                name: "Déclaration de mise en oeuvre",
                status: "check",
                document: "Déclaration de mise en oeuvre.pdf",
                actions: ["Visualiser"]
            })}>
                Valider la déclaration
            </Button>}
        </div>
    );
}