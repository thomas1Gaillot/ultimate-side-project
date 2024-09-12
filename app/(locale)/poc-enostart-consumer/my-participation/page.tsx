'use client'
import {useState} from 'react'
import {Button} from "@/components/ui/button"
import {FileCheck2Icon, ScrollTextIcon, UserSquareIcon} from 'lucide-react'
import {IconFileEuro} from "@tabler/icons-react";
import TimelineStep from "@/app/(locale)/poc-enostart/my-project/components/TimelineStep";
import {useRouter} from "next/navigation";


export default function Component() {
    const router = useRouter()

    const initialTimelineIntegration = [
        {
            title: "J'accepte les candidatures",
            description: "Vérifiez que le candidat est dans le périmètre de votre opération. Pré-intégrez le consommateur.",
            Button: ({disabled}: { disabled: boolean }) => <Button disabled={disabled}
                                                                   onClick={() => router.push('/poc-enostart/my-participants/candidatures')}
                                                                   variant="outline" className="mt-2 mb-6"
                                                                   size={'sm'}>Candidatures</Button>,
            ping: false,
            active: false,
            prerequisites: []
        },
        {
            title: "Je récupère les données pour étude (optionnel)",
            description: "Récupérez les courbes de charges de vos consommateurs et étudiez la viabilité de votre projet.",
            Button: ({disabled}: { disabled: boolean }) => <Button disabled={disabled}
                                                                   onClick={() => router.push('/poc-enostart/my-participants/pre-integres')}
                                                                   variant="outline" className="mt-2 mb-6"
                                                                   size={'sm'}>Pré-intégrations</Button>,
            ping: false,
            active: false,
            prerequisites: []
        },
        {
            title: "Je propose un prix de vente",
            description: "Envoyez aux consommateurs pré-intégrés un prix de vente fixe.",
            prerequisites: [
                {text: "Contrat de vente", icon: IconFileEuro, done: false},
            ],
            Button: ({disabled}: { disabled: boolean }) => <Button disabled={disabled}
                                                                   onClick={() => router.push('/poc-enostart/my-demarches/vente?tab=send-price')}
                                                                   variant="outline" className="mt-2 mb-6" size={'sm'}>Proposer
                un prix de vente</Button>,
            ping: false,
            active: false
        },
        {
            title: "Les consommateurs acceptent mon offre",
            description: "Attendez leur réponse pour valider rapidement votre projet.",
            Button: ({disabled}: { disabled: boolean }) =>
                <Button disabled={disabled} onClick={() => router.push('/poc-enostart/my-participants/pre-integres')}
                        variant="outline" className="mt-2 mb-6" size={'sm'}>Pré-intégrations</Button>,
            ping: false,
            active: false,
            prerequisites: []
        },
        {
            title: "J'envoi les documents à signer aux consommateurs",
            description: "Envoyez aux consommateurs pré-intégrés un prix de vente fixe. Attendez leur réponse pour valider rapidement votre projet.",
            prerequisites: [
                {text: "Statuts PMO", icon: UserSquareIcon, done: false},
                {text: "Accords de participation", icon: FileCheck2Icon, done: false},
                {text: "Bulletin d'adhésion", icon: ScrollTextIcon, done: false}],
            Button: ({disabled}: { disabled: boolean }) => <Button disabled={disabled}
                                                                   onClick={() => router.push('/poc-enostart/my-participants/pre-integres')}
                                                                   variant="outline" className="mt-2 mb-6"
                                                                   size={'sm'}>Pré-intégrations</Button>,
            ping: false,
            active: false
        },
        {
            title: "Les consommateurs signent les documents",
            description: "Votre consommateur est presque intégrés ! Attendez qu'il vous renvoi les documents signés.",
            Button: ({disabled}: { disabled: boolean }) =>
                <Button disabled={disabled} onClick={() => router.push('/poc-enostart/my-participants/pre-integres')}
                        variant="outline" className="mt-2 mb-6" size={'sm'}>Pré-intégrations</Button>,
            ping: false,
            active: false, prerequisites: []
        },
    ]
    const [timelineIntegration, setTimelineIntegration] = useState(initialTimelineIntegration)


    return (
        <div className="min-h-screen bg-white text-gray-900 p-8 2xl:px-32">
            <h1 className="text-3xl font-bold mb-4">{"Les étapes de ma demande de participation"}</h1>
            <div className="grid gap-16 2xl:gap-32">
                <div className="w-full">
                    <div className="space-y-2">
                        <div className=" flex flex-col w-max">
                            <span className={"text-gray-500 uppercase text-xs"}>
                                Vous venez de candidater
                            </span>
                            <div className="h-8 w-0.5 bg-gray-200 ml-1  mt-2"></div>
                        </div>
                        {timelineIntegration.map((step, index) => (
                            <TimelineStep key={index} step={step} index={index}/>
                        ))}
                        <div className=" flex flex-col w-max">
                            <span className={"text-gray-500 uppercase text-xs"}>
                                Vous consommez local et réduisez vos factures
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



