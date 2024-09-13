'use client'
import {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button"
import {FilePenIcon} from 'lucide-react'
import TimelineStep from "@/app/(locale)/poc-enostart/my-project/components/TimelineStep";
import UserFormDialog from "@/app/(locale)/poc-enostart/user-form-dialog";
import GreenEnergyOffer from "@/app/(locale)/poc-enostart-consumer/my-participation/component/green-energy-offer";
import SignDocumentsDialog from "@/app/(locale)/poc-enostart-consumer/my-participation/component/sign-documents-dialog";


export default function Component() {
    const initialTimelineIntegration = [
        {
            title: "Je finalise ma demande de participation",
            description: "Le porteur de projet vous a pré-intégré et étudie votre dossier.",
            Button: ({disabled}: { disabled: boolean }) => <UserFormDialog onSubmit={submitSignataire}
                                                                           variant={'outline'}
                                                                           buttonText={"Terminer l'inscription"}/>,
            ping: true,
            active: true,
            prerequisites: [
                {text: "Informations manquantes : Signataire", icon: FilePenIcon, done: false},
            ],
            estimatedTime: '5 minutes'
        },
        {
            title: "Le porteur de projet étudie votre candidature",
            description: "Le porteur de projet vous a pré-intégré et étudie votre dossier.",
            Button: ({disabled}: { disabled: boolean }) => <Button disabled={disabled}
                                                                   onClick={submissionStudied}
                                                                   variant="outline" className="mt-2 mb-6"
                                                                   size={'sm'}>Voir le projet</Button>,
            ping: false,
            active: false,
            prerequisites: [],
            estimatedTime: '1 semaine'
        },
        {
            title: "Le porteur de projet prépare votre prix de vente",
            description: "Le porteur de projet vous a pré-intégré et étudie votre dossier.",
            Button: ({disabled}: { disabled: boolean }) => <Button disabled={disabled}
                                                                   onClick={salesContractPrepared}
                                                                   variant="outline" className="mt-2 mb-6"
                                                                   size={'sm'}>Voir le projet</Button>,
            ping: false,
            active: false,
            prerequisites: [],
            estimatedTime: '1 semaine'
        },
        {
            title: "J'accepte la proposition de prix de vente",
            description: "Le porteur de projet vous propose un prix de vente. Acceptez-le pour valider rapidement votre projet.",
            prerequisites: [],
            Button: ({disabled}: { disabled: boolean }) => <GreenEnergyOffer onSubmit={acceptOffer}/>,
            ping: false,
            active: false,
            estimatedTime: '5 minutes'
        },
        {
            title: "Le porteur de projet finalise les démarches administratives",
            description: "Le porteur de projet vous a pré-intégré et étudie votre dossier.",
            Button: ({disabled}: { disabled: boolean }) => <Button disabled={disabled}
                                                                   onClick={documentsReady}
                                                                   variant="outline" className="mt-2 mb-6"
                                                                   size={'sm'}>Voir le projet</Button>,
            ping: false,
            active: false,
            prerequisites: [],
            estimatedTime: '4 semaines'
        },
        {
            title: "Je signe les documents administratifs",
            description: "Le porteur de projet vous a pré-intégré et étudie votre dossier.",
            Button: ({disabled}: { disabled: boolean }) => <SignDocumentsDialog onSubmit={() => {
            }}/>,
            ping: false,
            active: false,
            prerequisites: [],
            estimatedTime: '25 minutes'
        },
        {
            title: "Je consomme local et vert",
            description: "Vous avez terminé les démarches administratives. Vous serez bientôt notifié par mail et pourrez  consommer de l'énergie verte et locale.",
            Button: ({disabled}: { disabled: boolean }) => <Button disabled={disabled}
                                                                   onClick={documentsReady}
                                                                   variant="outline" className="mt-2 mb-6"
                                                                   size={'sm'}>Voir le projet</Button>,
            ping: false,
            active: false,
            prerequisites: [],
            estimatedTime: '2 semaines'
        },
    ]
    const [timelineIntegration, setTimelineIntegration] = useState(initialTimelineIntegration)
    const [isSignataireSigned, setIsSignataireSigned] = useState(false)


    function submitSignataire() {
        setIsSignataireSigned(true)

    }

    function submissionStudied() {
        const newTimelineIntegration = timelineIntegration.map((step, index) => {
            if (index <= 1) {
                return {
                    ...step,
                    active: true,
                    ping: false,
                    prerequisites: []
                }
            }
            if (index === 2) {
                return {
                    ...step,
                    active: true,
                    ping: true,
                }
            }
            return step
        })
        setTimelineIntegration(newTimelineIntegration)
    }

    function salesContractPrepared() {
        const newTimelineIntegration = timelineIntegration.map((step, index) => {
            if (index <= 2) {
                return {
                    ...step,
                    active: true,
                    ping: false,
                    prerequisites: []
                }
            }
            if (index === 3) {
                return {
                    ...step,
                    active: true,
                    ping: true,
                }
            }
            return step
        })
        setTimelineIntegration(newTimelineIntegration)
    }

    function acceptOffer() {
        const newTimelineIntegration = timelineIntegration.map((step, index) => {
            if (index <= 3) {
                return {
                    ...step,
                    active: true,
                    ping: false,
                    prerequisites: []
                }
            }
            if (index === 4) {
                return {
                    ...step,
                    active: true,
                    ping: true,
                }
            }
            return step
        })
        setTimelineIntegration(newTimelineIntegration)
    }

    function documentsReady() {
        const newTimelineIntegration = timelineIntegration.map((step, index) => {
            if (index <= 4) {
                return {
                    ...step,
                    active: true,
                    ping: false,
                    prerequisites: []
                }
            }
            if (index === 5) {
                return {
                    ...step,
                    active: true,
                    ping: true,
                }
            }
            return step
        })
        setTimelineIntegration(newTimelineIntegration)
    }

    useEffect(() => {
        if (isSignataireSigned) {
            const newTimelineIntegration = timelineIntegration.map((step, index) => {
                if (index === 0) {
                    return {
                        ...step,
                        active: true,
                        ping: false,
                        prerequisites: step.prerequisites.map(prerequisite => ({...prerequisite, done: true}))
                    }
                }
                if (index === 1) {
                    return {
                        ...step,
                        active: true,
                        ping: false,
                    }
                }
                return step
            })
            setTimelineIntegration(newTimelineIntegration)
        }
    }, [isSignataireSigned])

    return (
        <div className="min-h-screen bg-white text-gray-900 p-8 2xl:px-32">
            <h1 className="text-3xl font-bold mb-4">{"Ma demande de participation"}</h1>
            <div className="grid mr-4">
                <div className="w-full">
                    <div className="space-y-2">
                        <div className=" flex flex-col w-max">
                            <span className={"text-gray-500 uppercase text-xs"}>
                                Vous avez débuté une demande de participation
                            </span>
                            <div className="h-8 w-0.5 bg-gray-200 ml-1  mt-2"></div>
                        </div>
                        {timelineIntegration.map((step, index) => (
                            <TimelineStep key={index} step={step} index={index}/>
                        ))}
                        <div className=" flex flex-col w-max">
                            <span className={"text-gray-500 uppercase text-xs"}>
                                Tout est bon. Vous serez bientôt notifié par mail pour le démarrage.
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



