'use client'
import {AlertCircle} from "lucide-react";
import {usePrestations} from "@/app/(locale)/poc-enostart/data/use-prestations";
import DocumentOverview from "../../my-project/components/DocumentOverview";
import useDocumentsOverview from "@/app/(locale)/poc-enostart/my-project/useDocumentsOverview";


export default function OverviewDemarches() {
    return <>
        <Plans/>
    </>
}


function Plans() {
    const {hasDisabled} = usePrestations();
    const {sales, convention, statutPmo, declaration, bulletin, accords} = useDocumentsOverview()
    return (
        <div>
            <h1 id="choose-prestation" className="text-lg font-bold mt-6 mb-2">{"Mes documents et prestations"}</h1>
            {hasDisabled && (
                <div className="mb-6 p-4 bg-yellow-100 rounded-lg flex items-center space-x-2 shadow">
                    <AlertCircle className="text-yellow-700 size-4 mt-0.5"/>
                    <p className="text-yellow-700 text-xs">
                        {"Attention : Vous avez décliné certaines prestations. Veuillez vous assurer de les réaliser en dehors de l'application."}
                    </p>
                </div>
            )}
            <h2 className="text-lg text-gray-700 mt-6 mb-2">{"Prestation : Contrat de vente"}</h2>
            <div className="flex flex-wrap w-full gap-4 mb-8">
                <DocumentOverview key={1}
                                  doc={sales}
                                  index={0}/>

            </div>
            <h2 className="text-lg text-gray-700 mt-6 mb-2">{"Prestation : Bulletin d'adhésion et PMO"}</h2>

            <div className="flex flex-wrap w-full gap-4 mb-8">
                <DocumentOverview key={1}
                                  doc={statutPmo}
                                  index={0}/>
                <DocumentOverview key={2}
                                  doc={bulletin}
                                  index={1}/>
            </div>
            <h2 className="text-lg text-gray-700 mt-6 mb-2">{"Prestation : Accords de participation, Déclaration de mise en oeuvre et Convention d'ACC"}</h2>

            <div className="flex flex-wrap w-full gap-4 mb-8">
                <DocumentOverview key={1}
                                  doc={accords}
                                  index={0}/>
                <DocumentOverview key={2}
                                  doc={declaration}
                                  index={1}/>
                <DocumentOverview key={3}
                                  doc={convention}
                                  index={2}/>

            </div>
        </div>
    )
}

