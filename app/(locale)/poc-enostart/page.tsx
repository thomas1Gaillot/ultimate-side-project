'use client'
import {useState} from 'react'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {BellIcon, HourglassIcon} from "lucide-react"
import SmallStep from './components/SmallStep'
import RadialChart from "@/app/(locale)/poc-enostart/components/RadialChart";

export default function Component() {
    const [activeTab, setActiveTab] = useState("nouvelles-candidatures")

    const tabs = [

        {id: "demarches", label: "Démarches", count: 3, ping: true},
        {id: "nouvelles-candidatures", label: "Mes Candidatures", count: 7, ping: true},
        {id: "pre-integrations", label: "Mes Pré-intégrations", count: 3, ping: false},
        {id: "passages-en-exploitation", label: "Mes Passages en exploitation", count: 2, ping: false},
    ]

    const tabContents: any = {

        "demarches": (
            <>
                 <span className={"text-xs text-gray-700"}>
                     Pour créer une opération, vous devez créer une association PMO et communiquer à Enedis.
                </span>
                <div className={"grid gap-4 mt-2 grid-cols-1 lg:grid-cols-2"}>
                    <div>
                        <div className={"flex items-center gap-4 mb-2"}>
                            <h3 className="font-semibold text-sm "> Démarches PMO</h3>
                            <RadialChart current={1} total={2}/>
                        </div>
                        <ul className="space-y-1 text-sm">
                            <SmallStep label={"Je crée mon association PMO"} done={true} index={0}/>
                            <SmallStep label={"J'édite les bulletins d'adhésion"} index={1}/>
                        </ul>
                    </div>
                    <div>
                        <div className={"flex items-center gap-4 mb-2"}>
                            <h3 className="font-semibold text-sm "> Démarches ENEDIS</h3>
                            <RadialChart current={0} total={2}/>
                        </div>
                        <ul className="space-y-1 text-sm">
                            <SmallStep label={"J'envoi la déclaration de mise en oeuvre"} index={0}/>
                            <SmallStep disabled={true} label={"J'édite les accords de participation"}
                                       index={1}/>
                        </ul>
                    </div>
                </div>
            </>
        ),
        "nouvelles-candidatures":
            (
                <>
                <span className={"text-xs text-gray-700"}>
                           Vous avez 7 candidatures en attente.  Vérifiez le périmètre et pré-intégrez le participant.
                </span>
                    <h3 className="font-semibold text-sm mt-2">Pré-intégrer un participant</h3>

                    <ul className="text-sm grid  grid-cols-1">

                        <SmallStep link={'#'}
                                   label={"Je vérifie le périmètre"} index={0}/>
                        <SmallStep link={'#'} label={"J'accepte le consommateur"} done={false} index={1}/>
                    </ul>
                </>
            ),
        "pre-integrations":
            (
                <>
                    <div className={"grid gap-4 mt-2  grid-cols-1 lg:grid-cols-2"}>
                        <div>
                            <h3 className="font-semibold text-sm mb-2">{"J'étudie les données et propose un prix"}</h3>

                            <ul className="text-sm grid   grid-cols-1">
                                <SmallStep link={'#'} label={"Je télécharge les données pour étude"}
                                           numberOfTaskDone={2}
                                           numberOfTask={3}
                                           index={0}/>
                                <SmallStep label={"Je propose un prix de vente à chaque consommateur"}
                                           numberOfTaskDone={3}
                                           numberOfTask={3}
                                           index={1}/>
                                <SmallStep label={"Chaque consommateur accepte le prix"} done={false} index={2}/>
                            </ul>
                        </div>
                    </div>
                </>
            ),
        "passages-en-exploitation":
            (
                <>
                    <div className={"grid gap-4 mt-2 grid-cols-1 lg:grid-cols-2"}>
                        <div>
                            <h3 className="font-semibold text-sm mb-2">{"Envoyer les documents pour signature"}</h3>
                            <ul className="text-sm grid grid-cols-1 ">
                                <SmallStep label={"Les démarches sont terminées"} numberOfTaskDone={1} numberOfTask={4}
                                           index={0}/>
                                <SmallStep label={"J'édite les contrats de vente "} numberOfTaskDone={2}
                                           numberOfTask={2}
                                           index={1}/>
                                <SmallStep disabled={true}
                                           label={"J'envoi les documents aux consommateurs pour signature"}
                                           numberOfTaskDone={0} numberOfTask={2}
                                           index={2}/>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm mb-2">{"Editer et envoyer la convention"}</h3>
                            <ul className="text-sm grid grid-cols-1 ">
                                <SmallStep disabled={true} numberOfTaskDone={0} numberOfTask={2} label={"Je reçois les documents signés"} done={false}
                                           index={3}/>
                                <SmallStep disabled={true}  label={"Je crée la convention d'ACC"} done={false}
                                           index={4}/>
                                <SmallStep disabled={true}  label={"J'envoi la convention à Enedis"} done={false}
                                           index={5}/>
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
                            <div className={"flex items-center"}>
                                <span className="text-left truncate mr-2">{tab.label}</span>
                                <span
                                    className="bg-background rounded-full px-2 py-1 text-xs flex-shrink-0">{tab.count}</span>

                            </div>
                            {tab.ping ? <BellIcon className="size-4  text-primary"/> :
                                <HourglassIcon className="size-4 text-gray-700"/>}
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


