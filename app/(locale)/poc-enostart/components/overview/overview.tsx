import {useState} from "react";
import RadialChart from "@/app/(locale)/poc-enostart/components/RadialChart";
import SmallStep from "@/app/(locale)/poc-enostart/components/SmallStep";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {BellIcon, FootprintsIcon, InfoIcon} from "lucide-react";
import Timeline from "@/app/(locale)/poc-enostart/components/Timeline";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {
    candidatures_flow,
    demarchesTabs,
    participantsTab,
    sales_flow,
    signatures_flow
} from "@/app/(locale)/poc-enostart/data/flow";

export default function Overview() {

    const [activeTab, setActiveTab] = useState("nouvelles-candidatures")
    const candidatures = candidatures_flow()
    const sales = sales_flow()
    const signatures = signatures_flow()
    const tabContents: any = {
        "demarches": (
            <>
                 <span className={"text-xs text-gray-700"}>
                     Pour lancer votre opération, vous devez créer une association PMO et déclarer votre projet à Enedis.
                </span>
                <div className={"grid gap-4 mt-2 grid-cols-1 lg:grid-cols-3"}>
                    <div>
                        <div className={"flex items-center gap-4 mb-2"}>
                            <h3 className="font-semibold text-sm "> Démarches PMO</h3>
                            <RadialChart current={1} total={2}/>
                        </div>
                        <ul className="space-y-1 text-sm">
                            <SmallStep label={"Je crée mon association PMO"} done={true} index={0}/>
                            <SmallStep label={"Mon association PMO est créée"} done={true} index={1}/>
                            <SmallStep label={"J'édite les bulletins d'adhésion"} index={2}/>
                        </ul>
                    </div>
                    <div>
                        <div className={"flex items-center gap-4 mb-2"}>
                            <h3 className="font-semibold text-sm "> Déclaration ENEDIS</h3>
                            <RadialChart current={0} total={2}/>
                        </div>
                        <ul className="space-y-1 text-sm">
                            <SmallStep label={"J'envoi la déclaration de mise en oeuvre"} index={0}/>
                            <SmallStep label={"Mon association PMO est créée"} done={true} index={0}/>
                            <SmallStep disabled={false} label={"J'édite les accords de participation"}
                                       index={1}/>
                        </ul>
                    </div>
                </div>
            </>
        ),
        "nouvelles-candidatures":
            (
                <>
                    <h3 className="font-semibold text-sm mb-2 flex items-center mt-2">
                        <InfoIcon className={'size-6 mr-4'}/>
                        {`Comment accepter des candidatures ? (${candidatures.number})`}
                    </h3>
                    <ul className="text-sm grid  grid-cols-1 ml-6">
                        {candidatures.steps.map((step, index) => (
                            <SmallStep key={index} link={step.href} label={step.label} index={index} done={step.done}
                                       numberOfTaskDone={step.numberOfTaskDone}
                                       numberOfTask={step.numberOfTask}/>
                        ))}
                    </ul>
                </>
            ),
        "pre-integrations":
            (
                <>
                    <div className={"grid gap-4 mt-2  grid-cols-1 lg:grid-cols-2"}>
                        <div>
                            <h3 className="font-semibold text-sm mb-2 flex items-center">
                                <InfoIcon className={'size-6 mr-4'}/>
                                {"Comment faire valider mon prix de vente aux consommateurs?"}
                            </h3>

                            <ul className="ml-6 text-sm grid grid-cols-1">
                                {sales.steps.map((step, index) => (
                                    <SmallStep key={index} link={step.href} label={step.label} index={index} done={step.done}
                                                  numberOfTaskDone={step.numberOfTaskDone}
                                                  numberOfTask={step.numberOfTask}/>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            ),
        "documents":
            (
                <>
                    <div className={"grid gap-4 mt-2 grid-cols-1 lg:grid-cols-2"}>
                        <div>
                            <h3 className="font-semibold text-sm mb-2 flex items-center mt-2">
                                <InfoIcon className={'size-6 mr-4'}/>
                                {`Comment finaliser les démarches avec mes consommateurs ?`}
                            </h3>
                            <ul className="text-sm grid grid-cols-1 ml-6">
                                {signatures.steps.map((step, index) => (
                                    <SmallStep key={index} link={step.href} label={step.label} index={index} done={step.done}
                                                  numberOfTaskDone={step.numberOfTaskDone} disabled={step.disabled}
                                                  numberOfTask={step.numberOfTask}/>
                                ))}
                            </ul>
                        </div>
                    </div>

                </>
            ),
        "passages-en-exploitation":
            (
                <>
                    <div className={"grid gap-4 mt-2 grid-cols-1 lg:grid-cols-2"}>
                        <div><h3 className="font-semibold text-sm mb-2 flex items-center mt-2">
                            <InfoIcon className={'size-6 mr-4'}/>
                            {`Comment démarrer mon opération?`}
                        </h3>
                            <ul className="text-sm grid grid-cols-1 ml-6">
                                <SmallStep disabled={true} label={"Je sélectionne les participants à intégrer"}
                                           done={false}
                                           index={0}/>
                                <SmallStep disabled={true} label={"J'édite la convention d'autoconsommation collective"}
                                           done={false}
                                           index={1}/>
                                <SmallStep disabled={true} label={"J'envoi la convention à Enedis"} done={false}
                                           index={2}/>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm mb-2">{"ou comment ajouter les participants dans mon opération ?"}</h3>
                            <ul className="text-sm grid grid-cols-1 ">
                            <SmallStep disabled={true} label={"J'exporte la liste des participants sur EnoPower"}
                                           done={false}
                                           index={0}/>

                            </ul>
                        </div>
                    </div>

                </>
            ),
    }

    return <Accordion type="single" defaultValue={"item-1"}  collapsible className={""}>
        <AccordionItem value="item-1" className={"bg-gray-50  px-8"}>
            <AccordionTrigger>
                <div className={"w-max flex"}>
                    <FootprintsIcon className={"size-4 mr-4"}/>
                    {'Mon parcours '}
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <Tabs orientation="vertical" value={activeTab} onValueChange={setActiveTab} className="h-full ">
                    <div className="flex h-72 bg-gray-50">
                        <TabsList className="flex-grow h-full flex flex-col ">

                            <span className={"uppercase ml-2 text-xs w-full text-left"}>démarches</span>
                            {demarchesTabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.id}
                                    value={tab.id}
                                    className="flex data-[state=active]:bg-white justify-between items-center w-80 px-3 py-2 text-sm"
                                >
                                    <div className={"flex items-center"}>
                                        <span className="text-left truncate mr-2">{tab.label}</span>
                                    </div>
                                    {tab.ping ? <BellIcon className="size-4  text-primary"/> :
                                        <></>}
                                </TabsTrigger>
                            ))}
                            <span className={"uppercase text-xs w-full text-left ml-2 mt-4"}>Participants</span>

                            {participantsTab.map((tab, index) => (
                                <TabsTrigger
                                    key={tab.id}
                                    value={tab.id}
                                    className="flex data-[state=active]:bg-white py-0 justify-between items-center w-80 px-3 text-sm"
                                >
                                    <div className={"flex items-center "}>
                                        <Timeline index={index} length={participantsTab.length}/>
                                        <span className="text-left truncate mx-2">{tab.label}</span>
                                    </div>
                                    {tab.ping ? <div className={"flex text-sm  text-primary gap-1 items-center"}>
                                            {tab.number || ''} <BellIcon className="size-4" />
                                        </div> :
                                        <></>}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <div className="flex-grow w-full p-4 h-full bg-white/50 rounded-r-lg overflow-y-auto">
                            {demarchesTabs.map((tab) => (
                                <TabsContent key={tab.id} value={tab.id} className="mt-0 h-full ">
                                    {tabContents[tab.id]}
                                </TabsContent>
                            ))}
                            {participantsTab.map((tab) => (
                                <TabsContent key={tab.id} value={tab.id} className="mt-0 h-full">
                                    {tabContents[tab.id]}
                                </TabsContent>
                            ))}
                        </div>
                    </div>
                </Tabs>
            </AccordionContent>
        </AccordionItem>

    </Accordion>
}