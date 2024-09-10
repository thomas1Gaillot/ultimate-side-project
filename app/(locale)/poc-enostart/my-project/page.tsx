'use client'
import {useEffect, useState} from 'react'
import {Button} from "@/components/ui/button"
import {
    FileCheck2Icon,
    FileTextIcon,
    FolderArchiveIcon,
    ScrollTextIcon,
    SquareUserIcon,
    UserSquareIcon
} from 'lucide-react'
import {IconFileEuro} from "@tabler/icons-react";
import DocumentOverview from "@/app/(locale)/poc-enostart/my-project/components/DocumentOverview";
import AccordSubscriptionContent from "@/app/(locale)/poc-enostart/my-project/components/AccordSubscriptionContent";
import BulletinSubscriptionDialogContent
    from "@/app/(locale)/poc-enostart/my-project/components/BulletinSubscriptionDialogContent";
import SalesSubscriptionDialogContent
    from "@/app/(locale)/poc-enostart/my-project/components/SalesSubscriptionDialogContent";
import {parse, useStoredParticipants} from "@/app/(locale)/poc-enostart/data/participants";
import {SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import {PmoStatus} from "@/app/(locale)/poc-enostart/data/pmo-status";
import {EnedisStatus} from "@/app/(locale)/poc-enostart/data/enedis-status";
import {usePrestations} from "@/app/(locale)/poc-enostart/data/use-prestations";
import {useRouter} from "next/navigation";
import PreRequisitePmo from "@/app/(locale)/poc-enostart/my-project/components/PreRequisitePmo";
import TimelineStep from "@/app/(locale)/poc-enostart/my-project/components/TimelineStep";


export type DocumentOverview = {
    title: string;
    icon: JSX.Element;
    estimatedTime: string;
    Button: () => JSX.Element;
    asterix?: string;
    status: PmoStatus | EnedisStatus | SalesStatus
}

const initialSalesDocument: DocumentOverview = {
    title: "Contrat de vente",
    icon: <IconFileEuro className="w-12 h-12"/>,
    estimatedTime: '1 heure',
    Button: () => <SalesSubscriptionDialogContent ignored={false}/>,
    status: SalesStatus.ChoisirUnPlan
}
const initialAccordsDocument: DocumentOverview = {
    title: "Accord de participation",
    icon: <FileCheck2Icon className="w-12 h-12"/>,
    estimatedTime: '1 heure',
    Button: () => <AccordSubscriptionContent ignored={false}/>,
    status: EnedisStatus.ChoisirUnPlan
}

const initialStatutPmoDocument: DocumentOverview = {
    title: "Statuts PMO Associative",
    icon: <SquareUserIcon className="w-12 h-12"/>,
    estimatedTime: '1h - 2 mois (selon état de la PMO)',
    Button: () => <BulletinSubscriptionDialogContent ignored={false}/>,
    status: PmoStatus.ChoisirUnPlan
}

const initialBulletinDocument: DocumentOverview = {
    title: "Bulletin d'adhésion",
    icon: <ScrollTextIcon className="w-12 h-12"/>,
    estimatedTime: '1 heure',
    Button: () => <BulletinSubscriptionDialogContent ignored={false}/>,
    status: PmoStatus.ChoisirUnPlan

}

const initialConventionDocument: DocumentOverview = {
    title: "Convention d'ACC",
    asterix: "si votre opération n'est pas en exploitation",
    icon: <FolderArchiveIcon className="w-12 h-12"/>,
    estimatedTime: '1 mois',
    Button: () => <AccordSubscriptionContent ignored={false}/>,
    status: EnedisStatus.ChoisirUnPlan
}

const initialDeclarationDocument: DocumentOverview = {
    title: "Déclaration de mise en oeuvre",
    icon: <FileTextIcon className="w-12 h-12"/>,
    estimatedTime: '1 mois',
    Button: () => <AccordSubscriptionContent ignored={false}/>,
    status: EnedisStatus.ChoisirUnPlan
}
export default function Component() {
    const initialTimelineIntegration = [
        {
            title: "J'accepte les candidatures",
            description: "Vérifiez que le candidat est dans le périmètre de votre opération. Pré-intégrez le consommateur.",
            Button: () => <Button onClick={() => router.push('/poc-enostart/my-participants/candidatures')}
                                  variant="outline" className="mt-2 mb-6" size={'sm'}>Candidatures</Button>,
            ping: false
        },
        {
            title: "Je récupère les données pour étude (optionnel)",
            description: "Récupérez les courbes de charges de vos consommateurs et étudiez la viabilité de votre projet.",
            Button: () => <Button onClick={() => router.push('/poc-enostart/my-participants/pre-integres')}
                                  variant="outline" className="mt-2 mb-6" size={'sm'}>Pré-intégrations</Button>,
            ping: false
        },
        {
            title: "Je propose un prix de vente",
            description: "Envoyez aux consommateurs pré-intégrés un prix de vente fixe. Attendez leur réponse pour valider rapidement votre projet.",
            prerequisites: [{text: "Contrat de vente", icon: IconFileEuro}],
            Button: () => <Button onClick={() => router.push('/poc-enostart/my-participants/pre-integres')}
                                  variant="outline" className="mt-2 mb-6" size={'sm'}>Pré-intégrations</Button>,
            ping: false
        },
        {
            title: "Je fais signer mes documents aux consommateurs",
            description: "Envoyez aux consommateurs pré-intégrés un prix de vente fixe. Attendez leur réponse pour valider rapidement votre projet.",
            prerequisites: [
                {text: "Statuts PMO", icon: UserSquareIcon},
                {text: "Accords de participation", icon: FileCheck2Icon},
                {text: "Bulletin d'adhésion", icon: ScrollTextIcon}],
            Button: () => <Button onClick={() => router.push('/poc-enostart/my-participants/pre-integres')}
                                  variant="outline" className="mt-2 mb-6" size={'sm'}>Pré-intégrations</Button>,
            ping: false
        },
    ]
    const initialTimelineExploitation = [
        {
            title: "Je fais signer les documents aux producteurs",
            description: "Les producteurs signent les documents.",
            Button: () => <Button onClick={() => router.push('/poc-enostart/my-participants/exploitation')}
                                  variant={'secondary'} size={'sm'}>Passage en exploitation</Button>,
            ping: false
        },
        {
            title: "J'édite la convention d'autoconsommation collective",
            description: "Je crée et envoie la convention d'autoconsommation collective.",
            Button: () => <Button onClick={() => router.push('/poc-enostart/my-participants/exploitation')}
                                  variant={'secondary'} size={'sm'}>Passage en exploitation</Button>,
            prerequisites: [{text: "Déclaration de mise en oeuvre", icon: FileTextIcon}],
            ping: false
        },
        {
            title: "J'envoi la convention à Enedis",
            description: "J'envoi la convention à Enedis pour validation.",
            Button: () => <Button onClick={() => router.push('/poc-enostart/my-participants/exploitation')}
                                  variant={'secondary'} size={'sm'}>Passage en exploitation</Button>,
            ping: false
        },
    ]
    const [timelineIntegration, setTimelineIntegration] = useState(initialTimelineIntegration)
    const [timelineExploitation, setTimelineExploitation] = useState(initialTimelineExploitation)
    const {participants} = useStoredParticipants()


    const {pmoDemarches, salesDemarches, enedisDemarches} = usePrestations()

    const [accords, setAccords] = useState(initialAccordsDocument)
    const [bulletin, setBulletin] = useState(initialBulletinDocument)
    const [statutPmo, setStatutPmo] = useState(initialStatutPmoDocument)

    const [sales, setSales] = useState(initialSalesDocument)

    const [declaration, setDeclaration] = useState(initialDeclarationDocument)
    const [convention, setConvention] = useState(initialConventionDocument)

    const router = useRouter()
    // update status for Documents when prestation changes
    useEffect(() => {

        if (salesDemarches === 'disabled') {
            setSales({
                ...sales,
                status: SalesStatus.Ignore,
                Button: () => <SalesSubscriptionDialogContent ignored={true}/>
            });
        }
        if (salesDemarches === 'active') {
            setSales({...sales, status: SalesStatus.ProposerUnPrix})
        }

    }, [salesDemarches]);
    useEffect(() => {
        switch (sales.status) {
            case SalesStatus.Ignore :
                break;
            case SalesStatus.ChoisirUnPlan :
                setSales(initialSalesDocument);
                break;
            case SalesStatus.ProposerUnPrix :
                setSales({
                    ...sales,
                    Button: () => <Button
                        onClick={() => router.push('/poc-enostart/my-demarches/vente?tab=create-contracts')}> {"Créer un contrat ->"} </Button>
                });
                break;
            default:
                setSales({...sales, Button: () => <>Default Next step : {sales.status}</>});
                break;
        }
    }, [sales.status]);

    useEffect(() => {

        if (pmoDemarches === 'disabled') {
            setBulletin({
                ...bulletin,
                status: PmoStatus.Ignore,
                Button: () => <BulletinSubscriptionDialogContent ignored={true}/>
            });
            setStatutPmo({
                ...statutPmo,
                status: PmoStatus.Ignore,
                Button: () => <BulletinSubscriptionDialogContent ignored={true}/>
            });
        }
        if (pmoDemarches === 'active') {
            setBulletin({...bulletin, status: PmoStatus.IdentifierLaPmo})
            setStatutPmo({...statutPmo, status: PmoStatus.IdentifierLaPmo})
        }

    }, [pmoDemarches]);
    useEffect(() => {
        switch (bulletin.status) {
            case PmoStatus.Ignore :
                break;
            case PmoStatus.ChoisirUnPlan :
                setBulletin(initialBulletinDocument);
                setStatutPmo(initialStatutPmoDocument)
                break;
            case PmoStatus.IdentifierLaPmo :
                setBulletin({...bulletin, Button: () => <PreRequisitePmo/>});
                setStatutPmo({
                    ...statutPmo,
                    Button: () => <Button size={'sm'}
                                          onClick={() => router.push('/poc-enostart/my-demarches/pmo')}> {"Créer la PMO ->"} </Button>
                });
                break;
            default:
                setBulletin({...bulletin, Button: () => <>Default Next step : {bulletin.status}</>});
                setStatutPmo({...statutPmo, Button: () => <>Default Next step : {statutPmo.status}</>});
                break;
        }
    }, [bulletin.status]);

    useEffect(() => {

        if (enedisDemarches === 'disabled') {
            setAccords({
                ...accords,
                status: EnedisStatus.Ignore,
                Button: () => <AccordSubscriptionContent ignored={true}/>
            });
            setDeclaration({
                ...declaration,
                status: EnedisStatus.Ignore,
                Button: () => <AccordSubscriptionContent ignored={true}/>
            });
            setConvention({
                ...convention,
                status: EnedisStatus.Ignore,
                Button: () => <AccordSubscriptionContent ignored={true}/>
            });
        }
        if (enedisDemarches === 'active') {
            setAccords({
                ...accords,
                status: EnedisStatus.IdentifierLaPmo,
            });
            setDeclaration({
                ...declaration,
                status: EnedisStatus.IdentifierLaPmo,
            });
            setConvention({
                ...convention,
                status: EnedisStatus.IdentifierLaPmo,
            });
        }

    }, [enedisDemarches]);
    useEffect(() => {
        switch (accords.status) {
            case EnedisStatus.Ignore :
                break;
            case EnedisStatus.ChoisirUnPlan :
                setAccords(initialAccordsDocument);
                setDeclaration(initialDeclarationDocument)
                setConvention(initialConventionDocument)
                break;
            case EnedisStatus.IdentifierLaPmo :
                setAccords({...accords, Button: () => <PreRequisitePmo/>});
                setDeclaration({...declaration, Button: () => <PreRequisitePmo/>});
                setConvention({...convention, Button: () => <PreRequisitePmo/>});
                break;
            default:
                setAccords({...accords, Button: () => <>Default Next step : {accords.status}</>});
                setDeclaration({...declaration, Button: () => <>Default Next step : {declaration.status}</>});
                setConvention({...convention, Button: () => <>Default Next step : {convention.status}</>});
                break;
        }
    }, [accords.status]);


    // update ping status for Timelines
    useEffect(() => {
        const {candidatures, preIntegres, exploitation} = parse(participants)
        const hasSalesThingsToDo = participants.some(p => p.status === 'pre-integre' &&
            (p.sales === SalesStatus.ProposerUnPrix || p.sales === SalesStatus.AssocierLeContrat))
        const canSignDocuments = preIntegres.some(p => p.sales === SalesStatus.EnvoyerLeContrat)
        const newTimelineIntegration = initialTimelineIntegration.map((step) => {
            if (step.title === "J'accepte les candidatures") {
                return {...step, ping: candidatures.length > 0}
            }
            if (step.title === "Je propose un prix de vente") {
                return {...step, ping: hasSalesThingsToDo}
            }
            if (step.title === "Je fais signer mes documents aux consommateurs") {
                return {...step, ping: canSignDocuments}
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

    }, [participants]);

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



