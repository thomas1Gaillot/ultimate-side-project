'use client'
import {useState} from 'react'
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog"
import {
    FileCheck2Icon,
    FileSignatureIcon,
    FileTextIcon,
    FileWarningIcon,
    FolderArchiveIcon,
    ScrollTextIcon
} from 'lucide-react'
import {IconFileEuro} from "@tabler/icons-react";
import {Badge} from "@/components/ui/badge";
import AccordParticipationContent from "@/app/(locale)/poc-enostart/my-project/components/AccordParticipantContent";
import DocumentOverview from "@/app/(locale)/poc-enostart/my-project/components/Document";

export default function Component() {
    const [openModal, setOpenModal] = useState('')

    const documents = [
        {
            title: "Contrat de vente",
            icon: <IconFileEuro className="w-16 h-16"/>,
            estimatedTime: '1 heure'
        },
        {
            title: "Accord de participation",
            icon: <FileCheck2Icon className="w-16 h-16"/>,
            estimatedTime: '3 mois'
        },
        {
            title: "Bulletin d'adhésion",
            icon: <ScrollTextIcon className="w-16 h-16"/>,
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
            prerequisite: "Contrat de vente créé",
            button: 'Pre-intégrations'
        },
        {
            title: "Je fais signer mes documents aux consommateurs",
            description: "Envoyez aux consommateurs pré-intégrés un prix de vente fixe. Attendez leur réponse pour valider rapidement votre projet.",
            prerequisite: "Accords de participation, bulletin d'adhésion et contrat de vente doivent créés",
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
            prerequisite: "Déclaration de mise en oeuvre réalisée",

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
            icon: <FileTextIcon className="w-16 h-16"/>,
            estimatedTime: '1 mois'
        },
        {
            title: "Convention d'ACC",
            asterix : "si votre opération n'est pas en exploitation",
            icon: <FolderArchiveIcon className="w-16 h-16"/>,
            estimatedTime: '2 semaines'
        },

    ]


    return (
        <div className="min-h-screen bg-white text-gray-900 space-y-16 p-8 2xl:px-32">
            <h1 className="text-3xl font-bold mb-4">{"Comment créer mon opération d'ACC ?"}</h1>

            <div className="grid grid-cols-2 gap-8">
                <div className="w-full">
                    <h2 className="text-xl font-semibold mb-4">{"1. J'intégre mes participants"}</h2>
                    <div className="space-y-2">
                        <div className=" flex flex-col w-max">
                            <span className={"text-gray-500 uppercase text-xs"}>
                                Nouvelle candidature
                            </span>
                            <div className="h-8 w-0.5 bg-gray-200 ml-1  mt-2"></div>
                        </div>
                        {timelineSteps.map((step, index) => (
                            <div key={index} className="flex">
                                <div className="flex flex-col mt-2 items-center mr-4">
                                    <div className="w-3 h-3 min-w-3 min-h-3 bg-gray-500 rounded-full"></div>
                                    <div className="h-full w-0.5 bg-gray-200  mt-2"></div>
                                </div>
                                <div>
                                    {step.prerequisite && (
                                        <Badge variant={'secondary'} className={' text-gray-700 bg-yellow-50 text-xs'}>
                                            <p className=" uppercase mr-2 min-w-max">{"Pré-requis"} </p>

                                            <div className={"flex items-center"}>
                                                <IconFileEuro className="min-w-6 h-6  ml-2 mr-1"/>
                                                <p>{step.prerequisite} </p>
                                            </div>

                                        </Badge>
                                    )}
                                    <h3 className="text-lg">{step.title}</h3>

                                    <p className="text-sm text-gray-500">{step.description}</p>

                                    <Button size={'sm'} variant="outline" className="mt-2 mb-6">{step.button}</Button>
                                </div>
                            </div>
                        ))}
                        <div className=" flex flex-col w-max">
                            <span className={"text-gray-500 uppercase text-xs"}>
                                Passage en exploitation
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <h2 className="text-xl font-semibold mb-4">Quels documents pour intégrer un participant
                        ?</h2>
                    <p className="mb-4  text-sm  text-sm text-gray-600">Anticipez la création des documents, pouvant demander des
                        démarches longues.</p>
                    <p className="mb-4 text-sm  text-sm text-gray-600">Les documents nécessaires pour intégrer un participant
                        :</p>
                    <div className="flex flex-wrap w-full gap-4 mb-8">
                        {documents.map((doc, index) =>
                            <DocumentOverview key={index} doc={doc} index={0} openModal={openModal}
                                              setOpenModal={setOpenModal}/>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
                <div className="w-full">
                    <h2 className="text-xl font-semibold mb-4">{"2. Je passe en exploitation"}</h2>
                    <div className="space-y-2">
                        <div className=" flex flex-col w-max">
                            <span className={"text-gray-500 uppercase text-xs"}>
                                Passage en exploitation
                            </span>
                            <div className="h-8 w-0.5 bg-gray-200 ml-1  mt-2"></div>
                        </div>
                        {timelineExploitationSteps.map((step, index) => (
                            <div key={index} className="flex">
                                <div className="flex flex-col mt-2 items-center mr-4">
                                    <div className="w-3 h-3 min-w-3 min-h-3 bg-gray-500 rounded-full"></div>
                                    <div className="h-full w-0.5 bg-gray-200  mt-2"></div>
                                </div>
                                <div>
                                    {step.prerequisite && (
                                        <Badge variant={'secondary'} className={' text-gray-700 bg-yellow-50 text-xs'}>
                                            <p className=" uppercase mr-2 min-w-max">{"Pré-requis"} </p>

                                            <div className={"flex items-center"}>
                                                <IconFileEuro className="min-w-6 h-6  ml-2 mr-1"/>
                                                <p>{step.prerequisite} </p>
                                            </div>

                                        </Badge>
                                    )}
                                    <h3 className="text-lg">{step.title}</h3>
                                    <p className="text-sm text-gray-500">{step.description}</p>
                                    <Button size={'sm'} variant="outline" className="mt-2 mb-6">{step.button}</Button>
                                </div>
                            </div>
                        ))}

                        <div className=" flex flex-col w-max">
                            <span className={"text-gray-500 uppercase text-xs"}>
                                Opération créée, consommateurs intégrés
                            </span>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <h2 className="text-xl font-semibold mb-4">Quels documents pour passer en exploitation
                        ?</h2>
                    <p className="mb-4  text-sm text-gray-600">Les documents nécéssaire pour passer en exploitation
                        : </p>
                    <div className="flex flex-wrap w-full gap-4 mb-8">
                        {documentsExploitation.map((doc, index) => (
                            <Card key={index}
                                  className="bg-gray-50 w-[300px] h-[250px] hover:shadow-none shadow-none border-none rounded">
                                <CardHeader>
                                    {doc.asterix && (<span className={"text-gray-700 text-xs"}>{doc.asterix}</span>)}
                                    <CardTitle
                                        className="text-lg text-center text-gray-700 w-full">{doc.title}</CardTitle>
                                    <p className="text-xs text-center relative bottom-2 text-gray-400">temps estimé
                                        : {doc.estimatedTime}</p>

                                </CardHeader>
                                <CardContent className="flex flex-col items-center">
                                    {doc.icon}
                                </CardContent>
                                <CardFooter>
                                    <Dialog open={openModal === doc.title}
                                            onOpenChange={() => setOpenModal(openModal === doc.title ? '' : doc.title)}>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size='sm'
                                                    className="text-primary w-full text-right">
                                                {"Je me fais accompagner ou non ->"}
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-white">
                                            <DialogHeader>
                                                <DialogTitle>Souscription à la prestation</DialogTitle>
                                            </DialogHeader>
                                            {doc.title === "Accord de participation" ? <AccordParticipationContent/> :
                                                <p>Additional information about {doc.title} would go here.</p>}
                                        </DialogContent>
                                    </Dialog>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}