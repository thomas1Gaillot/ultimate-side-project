'use client'
import {useState} from 'react'
import {Button} from "@/components/ui/button"
import {FileCheck2Icon, FileIcon, FileTextIcon, FolderArchiveIcon, ScrollTextIcon} from 'lucide-react'
import {IconFileEuro} from "@tabler/icons-react";
import {Badge} from "@/components/ui/badge";
import DocumentOverview from "@/app/(locale)/poc-enostart/my-project/components/Document";

interface TimelineStep {
    title: string;
    description: string;
    button: string;
    prerequisites?: { text: string, icon: any }[];
}

const documents = [
    {
        title: "Contrat de vente",
        icon: <IconFileEuro className="w-12 h-12"/>,
        estimatedTime: '1 heure'
    },
    {
        title: "Accord de participation",
        icon: <FileCheck2Icon className="w-12 h-12"/>,
        estimatedTime: '3 mois'
    },
    {
        title: "Bulletin d'adhésion",
        icon: <ScrollTextIcon className="w-12 h-12"/>,
        estimatedTime: '3 mois'
    },
]
const timelineSteps = [
    {
        title: "J'accepte les candidatures",
        description: "Vérifiez que le candidat est dans le périmètre de votre opération. Pré-intégrez le consommateur.",
        button: 'Candidatures'
    },
    {
        title: "Je récupère les données pour étude (optionnel)",
        description: "Récupérez les courbes de charges de vos consommateurs et étudiez la viabilité de votre projet.",
        button: 'Pre-intégrations'
    },
    {
        title: "Je propose un prix de vente",
        description: "Envoyez aux consommateurs pré-intégrés un prix de vente fixe. Attendez leur réponse pour valider rapidement votre projet.",
        prerequisites: [{text: "Contrat de vente", icon: IconFileEuro}],
        button: 'Pre-intégrations'
    },
    {
        title: "Je fais signer mes documents aux consommateurs",
        description: "Envoyez aux consommateurs pré-intégrés un prix de vente fixe. Attendez leur réponse pour valider rapidement votre projet.",
        prerequisites: [
            {text: "Accords de participation", icon: FileCheck2Icon},
            {text: "Bulletin d'adhésion", icon: ScrollTextIcon}],
        button: 'Pre-intégrations'
    },
]

const timelineExploitationSteps = [
    {
        title: "Je fais signer les documents aux producteurs",
        description: "Les producteurs signent les documents.",
        button: 'Passage en exploitation'
    },
    {
        title: "J'édite la convention d'autoconsommation collective",
        description: "Je crée et envoie la convention d'autoconsommation collective.",
        button: 'Passage en exploitation',
        prerequisites: [{text: "Déclaration de mise en oeuvre", icon: FileTextIcon}],

    },
    {
        title: "J'envoi la convention à Enedis",
        description: "J'envoi la convention à Enedis pour validation.",
        button: 'Passage en exploitation'
    },
]
const documentsExploitation = [
    {
        title: "Déclaration de mise en oeuvre",
        icon: <FileTextIcon className="w-12 h-12"/>,
        estimatedTime: '1 mois'
    },
    {
        title: "Convention d'ACC",
        asterix: "si votre opération n'est pas en exploitation",
        icon: <FolderArchiveIcon className="w-12 h-12"/>,
        estimatedTime: '2 semaines'
    },

]

export default function Component() {
    const [openModal, setOpenModal] = useState('')


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
                        {timelineSteps.map((step, index) => (
                            <Timeline step={step} index={index}/>
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
                        {documents.map((doc, index) =>
                            <DocumentOverview key={index} doc={doc} index={0} openModal={openModal}
                                              setOpenModal={setOpenModal}/>
                        )}
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
                        {timelineExploitationSteps.map((step, index) => (
                            <Timeline key={index} step={step} index={index}/>
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
                        {documentsExploitation.map((doc, index) => (
                            <DocumentOverview key={index} doc={doc} index={0} openModal={openModal}
                                              setOpenModal={setOpenModal}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

function Timeline({step, index}: {
    step: TimelineStep;
    index: number
}) {
    return <div key={index} className="flex">
        <div className="flex flex-col mt-2 items-center mr-4">
            <div className="w-3 h-3 min-w-3 min-h-3 bg-gray-500 rounded-full"></div>
            <div className="h-full w-0.5 bg-gray-200  mt-2"></div>
        </div>
        <div>
            {step.prerequisites && (
                <Badge variant={'secondary'}
                       className={'grid text-gray-700 gap-1 bg-yellow-50 hover:bg-yellow-50 text-[10px]'}>
                    <p className=" uppercase min-w-max">{"Pré-requis"} </p>
                    {step.prerequisites.map((prerequisite) => <div
                        className={"flex items-start font-normal relative right-1"}>
                        <prerequisite.icon className="min-w-4 h-4"/>
                        <p>{prerequisite.text} </p>
                    </div>)}

                </Badge>
            )}
            <h3 className="">{step.title}</h3>
            <p className="text-xs text-gray-500">{step.description}</p>

            <Button size={'sm'} variant="outline" className="mt-2 mb-6">{step.button}</Button>
        </div>
    </div>
}