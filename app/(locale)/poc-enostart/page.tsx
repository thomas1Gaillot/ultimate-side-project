'use client'
import {useState} from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Button} from "@/components/ui/button"
import {MoveRightIcon} from "lucide-react"
import {Progress} from "@/components/ui/progress";
import {cn} from "@/lib/utils";

export default function Component() {
    const [activeTab, setActiveTab] = useState("nouvelles-candidatures")

    const tabs = [

        {id: "demarches", label: "Démarches", count: "1 /4"},
        {id: "nouvelles-candidatures", label: "Mes Candidatures", count: 7},
        {id: "pre-integrations", label: "Mes Pré-intégrations", count: 5},
        {id: "passages-en-exploitation", label: "Mes Passages en exploitation", count: 2},
    ]

    const tabContents: any = {

        "demarches": (
            <>

                <div className={"grid mb-2 "}>
                    <span
                        className={"text-xs text-gray-700"}>Il vous reste 3 démarches à faire pour créer une opération</span>
                    <Progress className={'w-48'} label={'1/4'} value={25}/>
                </div>


                <div className={"grid gap-4  grid-cols-1 lg:grid-cols-2"}>
                    <div>
                        <h3 className="font-semibold text-sm mb-2">Démarches PMO</h3>
                        <ul className="space-y-1 text-sm">
                            <SmallStep label={"Je crée mon association PMO"} done={true} index={0}/>
                            <SmallStep label={"J'édite les bulletins d'adhésion"} done={false} index={1}/>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold  text-sm mb-2">Démarches ENEDIS</h3>
                        <ul className="space-y-1 text-sm">
                            <SmallStep label={"J'envoi la déclaration de mise en oeuvre"} done={false} index={0}/>
                            <SmallStep label={"J'édite les accords de participation"} done={false} index={1}/>
                        </ul>
                    </div>
                </div>
            </>
        ),
        "nouvelles-candidatures": (
            <>
                <span className={"text-xs text-gray-700"}>
                           Vous avez 7 candidatures en attente.  Vérifiez le périmètre et pré-intégrez le participant.
                </span>
                <Progress className={'w-48'} label={'5/12'} value={60}/>

                <h3 className="font-semibold text-sm mt-2">Pré-intégrer un participant</h3>

                <ul className="text-sm grid  grid-cols-1">

                    <SmallStep link={'#'}
                               label={"Je vérifie le périmètre"} done={false} index={0}/>
                    <SmallStep link={'#'} label={"J'accepte le consommateur"} done={false} index={1}/>
                </ul>
            </>
        ),
        "pre-integrations": (
            <>
                <span className={"text-xs text-gray-700 mb-2"}>Intégrez vos candidats en plusieurs étapes.</span>

                <div className={"grid gap-4 mt-2  grid-cols-1 lg:grid-cols-2"}>
                    <div>
                        <h3 className="font-semibold text-sm mb-2">{"J'étudie les données et propose un prix"}</h3>
                        <span
                            className={"text-xs text-gray-700"}>
                           A jour
                        </span>
                        <Progress className={'w-48'} label={'5/5'} value={100}/>

                        <ul className="text-sm grid   grid-cols-1">
                            <SmallStep link={'#'} label={"Je télécharge les données pour étude (4/5)"} done={false}
                                       index={0}/>
                            <SmallStep label={"Je propose un prix de vente à chaque consommateur (5/5)"} done={true}
                                       index={1}/>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm mb-2">{"Ensuite, j'édite les contrats de vente"}</h3>
                        <span
                            className={"text-xs text-gray-700"}>
                           Attendez que les 3 consommateurs acceptent le prix.
                        </span>
                        <Progress className={'w-48'} label={'2/5'} value={40}/>

                        <ul className="text-sm grid   grid-cols-1">
                            <SmallStep label={"Chaque consommateur accepte le prix (2/5)"} done={false} index={2}/>
                            <SmallStep label={"J'édite les contrats de vente (2/2)"} done={true} index={3}/>
                        </ul>
                    </div>
                </div>
            </>
        ),
        "passages-en-exploitation": (
            <>
                <span className={"text-xs text-gray-700"}>
                    Vous avez 3 démarches à terminer et 2 consommateurs pré-intégrés en attente.
                </span>
                <Progress className={'w-48'} label={'1/4'} value={25}/>
                <h3 className="font-semibold text-sm mt-2">Passez en exploitation</h3>

                <div className={"grid gap-4 mt-2 grid-cols-1 lg:grid-cols-2"}>
                    <div>
                        <h3 className="font-semibold text-sm mb-2">{"Envoyer les documents pour signature"}</h3>
                        <ul className="text-sm grid grid-cols-1 ">
                            <SmallStep label={"Les démarches sont terminées (1/4)"} done={false}
                                       index={0}/>
                            <SmallStep label={"Les pré-intégrations sont terminées (2)"} done={true}
                                       index={1}/>
                            <SmallStep label={"J'envoi les documents aux consommateurs pour signature"} done={false}
                                       index={2}/>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm mb-2">{"Editer et envoyer la convention"}</h3>
                        <ul className="text-sm grid grid-cols-1 ">
                            <SmallStep label={"Je reçois les documents signés"} done={false} index={3}/>
                            <SmallStep label={"Je crée la convention d'ACC"} done={false} index={4}/>
                            <SmallStep label={"J'envoi la convention à Enedis"} done={false} index={5}/>
                        </ul>
                    </div>
                </div>

            </>
        ),
    }

    return (
        <Tabs orientation="vertical" value={activeTab} onValueChange={setActiveTab} className="h-full">
            <div className="flex h-48">
                <TabsList className="flex-grow h-full flex flex-col space-y-1 p-1">
                    {tabs.map((tab) => (
                        <TabsTrigger
                            key={tab.id}
                            value={tab.id}
                            className="flex justify-between items-center w-72 px-3 py-2 text-sm"
                        >
                            <span className="text-left truncate mr-2">{tab.label}</span>
                            <span
                                className="bg-background rounded-full px-2 py-1 text-xs flex-shrink-0">{tab.count}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
                <div className="flex-grow w-full p-4 h-full bg-gray-50 rounded-r-lg overflow-y-auto">
                    {tabs.map((tab) => (
                        <TabsContent key={tab.id} value={tab.id} className="mt-0 h-full">
                            {tabContents[tab.id]}
                        </TabsContent>
                    ))}
                </div>
            </div>
        </Tabs>
    )
}


const SmallStep = ({label, done, index, link}: {
    label: string,
    done: boolean,
    index: number,
    link?: string
}) => (

    <Button variant={'ghost'} size={'sm'} className="flex justify-start items-center w-max">
        <div
            className="mr-2 text-xs size-6 min-w-6 rounded-full flex justify-center items-center border text-gray-700">
            {index + 1}
        </div>
        <div className={"flex gap-2 text-wrap"}>
            {link ? <a href={link} className="text-gray-700 flex gap-2 hover:underline">
                    {label}
                    <MoveRightIcon className={"size-4"}/>
                </a>
                : <span className={cn(done && 'line-through text-gray-700')}>
                {label}
            </span>

            }
        </div>
    </Button>
)