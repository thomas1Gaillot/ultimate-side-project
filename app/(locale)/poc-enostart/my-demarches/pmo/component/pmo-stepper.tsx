import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {CheckCircle2, Circle} from "lucide-react"
import {usePmoDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/use-pmo-document";
import {useBulletinDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/use-bulletin-document";
import {useRouter} from "next/navigation";
import ExplanationStep from "@/app/(locale)/poc-enostart/my-demarches/pmo/component/ExplanationStep";

export default function PMOStepper() {
    const pmoStatut = usePmoDocument()
    const bulletin = useBulletinDocument()
    const router = useRouter()
    return (
        <Card className="w-full shadow-none hover:shadow-none">
            <CardHeader>
                <CardTitle>{"Qu'est ce que la PMO ?"}</CardTitle>
                <CardDescription>
                    <div className={"flex items-center my-2 gap-2 px-4"}>
                        <div className={"h-10 w-1 bg-gray-200"}/>
                        <div>
                            &quot;
                            {"Producteur(s) et consommateur(s) sont liés entre eux au sein d'une personne morale"}
                            &quot;
                            <span className={"text-xs ml-2"}>{"(Article L.315-2 - code de l'énergie)."}</span>
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 grid  text-sm ">
                <span className={"text-gray-700"}>
                    {"Pour pouvoir rejoindre l'opération d'autoconsommation collective, les participants (consommateurs et producteurs) doivent adhérer à l'association PMO."}
                </span>
                <div className={"grid gap-2"}>
                    <ExplanationStep title={'1. Téléverser les statuts PMO signés'}
                             buttonTitle={'Téléverser'}
                             buttonAction={() => router.push('?tab=create-pmo')}
                             done={pmoStatut.isCreated}
                    />
                    <ExplanationStep title={"2. J'édite les bulletins d'adhésion"}
                             buttonTitle={'Editer'}
                             buttonAction={() => router.push('?tab=create-bulletin')}
                             done={bulletin.isEdited}
                    />
                    <ExplanationStep title={"Pour chaque participant, je fais signer les bulletins d'adhésions"}
                             buttonTitle={'Envoyer'}
                             buttonAction={() => router.push('/poc-enostart/my-participants/pre-integres')}
                             done={false}
                    />
                </div>
            </CardContent>
        </Card>
    )
}
