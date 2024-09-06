'use client'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {AlertCircle, ZoomInIcon} from "lucide-react";
import Image from "next/image";
import {usePrestations, useStoredPrestations} from "@/app/(locale)/poc-enostart/my-demarches/data/use-prestations";

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
            <h1  id="choose-prestation" className="text-lg font-bold mt-6 mb-2">{"Je choisis mes prestations"}</h1>
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

export function PrestationCard({prestation, hideDescription}:{
    prestation: {
        title: string,
        tasks: string[],
        pricing: string,
        action: (state: 'active' | 'disabled' | null) => void,
        state: 'active' | 'disabled' | null
    },hideDescription?:boolean
}) {
    return <Card
                 className={cn(`rounded-lg shadow-lg ${prestation.state === 'disabled' ? "opacity-50" : ""}`,
                     prestation.state === 'active' && "border-2 bg-primary/5 border-primary"
                 )}>
        <CardHeader>
            <CardTitle className="text-sm font-semibold">{hideDescription ? 'Souscription' : prestation.title}</CardTitle>
        </CardHeader>
        <CardContent className={cn(!hideDescription && "h-[250px]")}>
            <div className={"h-full flex flex-col justify-between"}>
                <div className="flex items-center text-sm text-muted-foreground">
                    <span className="font-bold text-lg text-gray-700">{prestation.pricing}</span>
                </div>

                {!hideDescription && <ul className="list-disc h-full py-4 text-sm pl-5 space-y-2 mt-4">
                    {prestation.tasks.map((task, taskIndex) => (
                        <li key={taskIndex}>{task}</li>
                    ))}
                </ul>}
            </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
            {prestation.state !== 'active' && <Button
                className="w-full rounded-full bg-gradient-to-r from-gray-400 to-gray-500 text-white"
                onClick={() => prestation.action('active')}
            >
                Je souscris à cette prestation
            </Button>}
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault()
                    prestation.action('disabled')
                }}
                className="text-sm text-gray-600 underline"
            >
                {"Je souhaite réaliser cette prestation en dehors de l'application"}
            </a>
        </CardFooter>
    </Card>
}