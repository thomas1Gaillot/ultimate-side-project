import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {usePmoDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/use-pmo-document";
import {useRouter} from "next/navigation";
import ExplanationStep from "@/app/(locale)/poc-enostart/my-demarches/pmo/component/ExplanationStep";
import {useAccordsDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/use-accords-document";

export default function AccordsStepper() {
    const accords = useAccordsDocument()
    const pmoStatut = usePmoDocument()
    const router = useRouter()
    return (
        <Card className="w-full shadow-none hover:shadow-none">
            <CardHeader>
                <CardTitle>{"Qu'est ce que les accords de participation ?"}</CardTitle>
                <CardDescription>
                    <div className={"flex items-center my-2 gap-2 px-4"}>
                        <div className={"h-10 w-1 bg-gray-200"}/>
                        <div>
                            {"Les accords de participation font partis des documents obligatoire pour l'autoconsommation collective. Ils permettent de définir les droits et devoirs de chaque participant."}
                        </div>
                    </div>
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 grid  text-sm ">
                <div className={"grid gap-2"}>
                    <ExplanationStep title={'1. Téléverser les statuts PMO signés'}
                                     buttonTitle={'Téléverser'}
                                     buttonAction={() => router.push('/poc-enostart/my-demarches/pmo?tab=create-pmo')}
                                     done={pmoStatut.isCreated}
                    />
                    <ExplanationStep title={"2. J'édite les accords de participation"}
                                     buttonTitle={'Editer'}
                                     buttonAction={() => router.push('/poc-enostart/my-demarches/enedis/accords')}
                                     done={accords.isCreated}
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

