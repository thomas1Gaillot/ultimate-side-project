'use client'
import {AlertCircle} from "lucide-react";
import {usePrestations, useStoredPrestations} from "@/app/(locale)/poc-enostart/data/use-prestations";
import PrestationCard from "@/app/(locale)/poc-enostart/my-demarches/overview/components/PrestationCard";


export default function OverviewDemarches() {
    return <>
        <Plans/>
    </>
}


function Plans() {
    const {pmoDemarches, enedisDemarches, salesDemarches, hasDisabled} = usePrestations();
    const {setEnedisDemarches, setPmoDemarches, setSalesDemarches} = useStoredPrestations();
    const prestations = [
        {
            title: "Démarches PMO",
            tasks: [
                "Aide à la création de la PMO",
                "Édition des bulletins d'adhésion"
            ],
            pricing: "5€ par signature de bulletin d'adhésion",
            action: setPmoDemarches,
            state: pmoDemarches
        },
        {
            title: "Démarches Enedis",
            tasks: [
                "Déclaration de mise en oeuvre",
                "Édition des accords de participation",
                "Convention ACC (aide à la création et édition)"
            ],
            pricing: "10€ par signature d'accord de participation",
            action: setEnedisDemarches,
            state: enedisDemarches
        },
        {
            title: "Démarches de vente",
            tasks: [
                "Aide à la création des contrats de vente",
                "Proposition et acceptation du prix de vente à chaque consommateur"
            ],
            pricing: "5€ par signature du prix de vente",
            action: setSalesDemarches,
            state: salesDemarches
        }
    ]


    return (
        <div>
            <h1 id="choose-prestation" className="text-lg font-bold mt-6 mb-2">{"Je choisis mes prestations"}</h1>
            {hasDisabled && (
                <div className="mb-6 p-4 bg-yellow-100 rounded-lg flex items-center space-x-2 shadow">
                    <AlertCircle className="text-yellow-700 size-4 mt-0.5"/>
                    <p className="text-yellow-700 text-xs">
                        {"Attention : Vous avez décliné certaines prestations. Veuillez vous assurer de les réaliser en dehors de l'application."}
                    </p>
                </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {prestations.map((prestation, index) => (
                    <PrestationCard prestation={prestation} key={index}/>
                ))}
            </div>

        </div>
    )
}

