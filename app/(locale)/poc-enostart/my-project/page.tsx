'use client'
import {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button"
import {FileCheck2Icon, FileTextIcon, ScrollTextIcon, UserSquareIcon} from 'lucide-react'
import {IconFileEuro} from "@tabler/icons-react";
import DocumentOverview from "@/app/(locale)/poc-enostart/my-project/components/DocumentOverview";
import {parse, useStoredParticipants} from "@/app/(locale)/poc-enostart/data/participants";
import {SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import TimelineStep from "@/app/(locale)/poc-enostart/my-project/components/TimelineStep";
import {useRouter} from "next/navigation";
import useDocumentsOverview from "@/app/(locale)/poc-enostart/data/documents/use-documents-overview";
import {useDocuments} from "@/app/(locale)/poc-enostart/data/documents/use-documents";


export default function Component() {
    const router = useRouter()
    const {sales, convention,
        statutPmo, declaration,
        bulletin, accords} = useDocumentsOverview()
    const {hasSalesContract} = useDocuments()
    const initialTimelineIntegration = [
        {
            title: "J'accepte les candidatures",
            description: "Vérifiez que le candidat est dans le périmètre de votre opération. Pré-intégrez le consommateur.",
            Button: ({disabled}:{disabled:boolean}) => <Button disabled={disabled} onClick={() => router.push('/poc-enostart/my-participants/candidatures')}
                                  variant="outline" className="mt-2 mb-6" size={'sm'}>Candidatures</Button>,
            ping: false
        },
        {
            title: "Je récupère les données pour étude (optionnel)",
            description: "Récupérez les courbes de charges de vos consommateurs et étudiez la viabilité de votre projet.",
            Button: ({disabled}:{disabled:boolean}) => <Button disabled={disabled} onClick={() => router.push('/poc-enostart/my-participants/pre-integres')}
                                  variant="outline" className="mt-2 mb-6" size={'sm'}>Pré-intégrations</Button>,
            ping: false,
            active : false,
        },
        {
            title: "Je propose un prix de vente",
            description: "Envoyez aux consommateurs pré-intégrés un prix de vente fixe.",
            prerequisites: [
                {text: "Contrat de vente", icon: IconFileEuro, done : false},
            ],
            Button: ({disabled}:{disabled:boolean}) => <Button disabled={disabled} onClick={() => router.push('/poc-enostart/my-demarches/vente?tab=send-price')}
                                                               variant="outline" className="mt-2 mb-6" size={'sm'}>Proposer un prix de vente</Button>,
            ping: false,
            active : false,
        },
        {
            title: "Les consommateurs acceptent mon offre",
            description: "Attendez leur réponse pour valider rapidement votre projet.",
            Button: ({disabled}:{disabled:boolean}) =>
                <Button disabled={disabled} onClick={() => router.push('/poc-enostart/my-participants/pre-integres')}
                                                               variant="outline" className="mt-2 mb-6" size={'sm'}>Pré-intégrations</Button>,
            ping: false,
            active : false,
        },
        {
            title: "Je fais signer mes documents aux consommateurs",
            description: "Envoyez aux consommateurs pré-intégrés un prix de vente fixe. Attendez leur réponse pour valider rapidement votre projet.",
            prerequisites: [
                {text: "Statuts PMO", icon: UserSquareIcon, done : false},
                {text: "Accords de participation", icon: FileCheck2Icon, done : false},
                {text: "Bulletin d'adhésion", icon: ScrollTextIcon, done : false}],
            Button: ({disabled}:{disabled:boolean}) => <Button disabled={disabled} onClick={() => router.push('/poc-enostart/my-participants/pre-integres')}
                                  variant="outline" className="mt-2 mb-6" size={'sm'}>Pré-intégrations</Button>,
            ping: false,
            active : false,
        },
    ]
    const initialTimelineExploitation = [
        {
            title: "Je fais signer les documents aux producteurs",
            description: "Les producteurs signent les documents.",
            Button: ({disabled}:{disabled:boolean}) => <Button disabled={disabled} onClick={() => router.push('/poc-enostart/my-participants/exploitation')}
                                  variant={'secondary'} size={'sm'}>Passage en exploitation</Button>,
            ping: false,
            active : false,
        },
        {
            title: "J'édite la convention d'autoconsommation collective",
            description: "Je crée et envoie la convention d'autoconsommation collective.",
            Button: ({disabled}:{disabled:boolean}) => <Button disabled={disabled} onClick={() => router.push('/poc-enostart/my-participants/exploitation')}
                                  variant={'secondary'} size={'sm'}>Passage en exploitation</Button>,
            prerequisites: [{text: "Déclaration de mise en oeuvre", icon: FileTextIcon, done : false}],
            ping: false,
            active : false,
        },
        {
            title: "J'envoi la convention à Enedis",
            description: "J'envoi la convention à Enedis pour validation.",
            Button: ({disabled}:{disabled:boolean}) => <Button disabled={disabled} onClick={() => router.push('/poc-enostart/my-participants/exploitation')}
                                  variant={'secondary'} size={'sm'}>Passage en exploitation</Button>,
            ping: false,
            active : false,
        },
    ]
    const [timelineIntegration, setTimelineIntegration] = useState(initialTimelineIntegration)
    const [timelineExploitation, setTimelineExploitation] = useState(initialTimelineExploitation)
    const {participants} = useStoredParticipants()


    // update ping status for Timelines
    useEffect(() => {
        const {candidatures, preIntegres, exploitation} = parse(participants)
        const hasSalesThingsToDo = participants.some(p => p.status === 'pre-integre' &&
            (p.sales === SalesStatus.ProposerUnPrix || p.sales === SalesStatus.AssocierLeContrat))
        const canSignDocuments = preIntegres.some(p => p.sales === SalesStatus.EnvoyerLeContrat)
        const atLeastOneProposalStatus = preIntegres.some(p => p.sales === SalesStatus.PrixPropose)
        const newTimelineIntegration = initialTimelineIntegration.map((step) => {
            if (step.title === "J'accepte les candidatures") {
                return {...step, ping: candidatures.length > 0}
            }
            if (step.title === "Je propose un prix de vente") {
                return {...step, ping: hasSalesThingsToDo, prerequisites: [{text: "Contrat de vente", icon: IconFileEuro, done : hasSalesContract}]}
            }
            if (step.title === "Je fais signer mes documents aux consommateurs") {
                return {...step, ping: canSignDocuments}
            }
            if (step.title === "Les consommateurs acceptent mon offre") {
                return {...step, active : atLeastOneProposalStatus}
            }
            return step
        })
        setTimelineIntegration(newTimelineIntegration)
        setTimelineExploitation(initialTimelineExploitation.map((step) => {
            if (step.title === "Je fais signer les documents aux producteurs") {
                return {...step, ping: exploitation.length > 0}
            }
            return step
        }))

    }, [participants, hasSalesContract]);

    return (
        <div className="min-h-screen bg-white text-gray-900 p-8 2xl:px-32">
            <h1 className="text-3xl font-bold mb-4">{"Comment créer mon opération d'ACC ?"}</h1>
            <h2 className="text-lg font-semibold mt-12 mb-4">{"1. J'intégre mes participants"}</h2>

            <div className="grid grid-cols-2 gap-16 2xl:gap-32">
                <div className="w-full">
                    <div className="space-y-2">
                        <div className=" flex flex-col w-max">
                            <span className={"text-gray-500 uppercase text-xs"}>
                                Nouvelle candidature
                            </span>
                            <div className="h-8 w-0.5 bg-gray-200 ml-1  mt-2"></div>
                        </div>
                        {timelineIntegration.map((step, index) => (
                            <TimelineStep key={index} step={step} index={index}/>
                        ))}
                        <div className=" flex flex-col w-max">
                            <span className={"text-gray-500 uppercase text-xs"}>
                                Passage en exploitation
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <h2 className="font-semibold mb-4">Quels documents pour intégrer un participant
                        ?</h2>
                    <p className="mb-4  text-sm  text-gray-600">Anticipez la création des documents, pouvant
                        demander des
                        démarches longues.</p>
                    <p className="mb-4 text-sm  text-gray-600">Les documents nécessaires pour intégrer un
                        participant
                        :</p>
                    <div className="flex flex-wrap w-full gap-4 mb-8">
                        <DocumentOverview key={1}
                                          doc={sales}
                                          index={0}/>
                        <DocumentOverview key={2}
                                          doc={statutPmo}
                                          index={1}/>
                        <DocumentOverview key={3}
                                          doc={accords}
                                          index={2}/>
                        <DocumentOverview key={4}
                                          doc={bulletin}
                                          index={3}/>

                    </div>
                </div>
            </div>
            <h2 className="text-lg font-semibold mt-12 mb-4">{"2. Je passe en exploitation"}</h2>
            <div className="grid grid-cols-2 gap-16 2xl:gap-32">
                <div className="w-full">
                    <div className="space-y-2">
                        <div className=" flex flex-col w-max">
                            <span className={"text-gray-500 uppercase text-xs"}>
                                Passage en exploitation
                            </span>
                            <div className="h-8 w-0.5 bg-gray-200 ml-1  mt-2"></div>
                        </div>
                        {timelineExploitation.map((step, index) => (
                            <TimelineStep key={index} step={step} index={index}/>
                        ))}

                        <div className=" flex flex-col w-max">
                            <span className={"text-gray-500 uppercase text-xs"}>
                                Opération créée, consommateurs intégrés
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <h2 className="font-semibold mb-4">Quels documents pour passer en exploitation
                        ?</h2>
                    <p className="mb-4  text-sm text-gray-600">Les documents nécéssaire pour passer en exploitation
                        : </p>
                    <div className="flex flex-wrap w-full gap-4 mb-8">
                        <DocumentOverview key={1}
                                          doc={declaration}
                                          index={0}/>
                        <DocumentOverview key={2}
                                          doc={convention}
                                          index={0}/>

                    </div>
                </div>
            </div>
        </div>
    )
}



