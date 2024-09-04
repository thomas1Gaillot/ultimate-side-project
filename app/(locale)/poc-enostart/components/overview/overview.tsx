import {useState} from "react";
import SmallStep from "@/app/(locale)/poc-enostart/components/SmallStep";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {BellIcon, FootprintsIcon, InfoIcon} from "lucide-react";
import Timeline from "@/app/(locale)/poc-enostart/components/Timeline";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {
    candidatures_flow,
    declaration_flow,
    demarches_pmo_accords,
    demarches_pmo_creation,
    demarches_pmo_flow,
    participantsTab,
    sales_flow,
    signatures_flow
} from "@/app/(locale)/poc-enostart/data/flow";
import {useStoredParticipants} from "@/app/(locale)/poc-enostart/data/participants";
import {useDocuments} from "@/app/(locale)/poc-enostart/data/use-documents";
import {cn} from "@/lib/utils";

export default function Overview() {

    const [activeTab, setActiveTab] = useState("nouvelles-candidatures")
    const {participants} = useStoredParticipants()
    const {isPmoCreated, isDeclarationSent, isBulletinEdited, isAccordsParticipationEdited} = useDocuments()
    const candidatures = candidatures_flow(participants)
    const sales = sales_flow(participants)
    const signatures = signatures_flow(participants)
    const demarchesPmo = demarches_pmo_flow(isPmoCreated, isBulletinEdited)
    const demarchesPmoCreation = demarches_pmo_creation(isPmoCreated)
    const demarchesAccords = demarches_pmo_accords(isPmoCreated, isAccordsParticipationEdited)
    const declaration = declaration_flow(isDeclarationSent)
    const tabContents: any = {
        "demarches": (
            <>
                 <span className={"text-xs text-gray-700"}>
{"Pour lancer votre opération, vous devez créer une association PMO. Ensuite, editez les bulletins d'adhésion et les accords de participation pour vos participants."}                </span>
                <div>
                    <div className={"flex items-center gap-4 mt-4"}>
                        <h3 className="font-semibold text-sm ">{"1. J'identifie ma PMO"}</h3>
                    </div>
                    <ul className="grid gap-2 text-sm pt-1 pb-2">
                        {demarchesPmoCreation.map((step, index) => (
                            <SmallStep disabled={step.disabled} key={index} link={step.href} label={step.label}
                                       done={step.done} numberOfTaskDone={step.numberOfTaskDone}
                                       numberOfTask={step.numberOfTask}/>
                        ))}
                    </ul>
                </div>
                <div className={"grid gap-4 mt-2 grid-cols-1 lg:grid-cols-2"}>

                    <div>
                        <div className={"flex items-center gap-4 mb-2"}>
                            <h3 className="font-semibold text-sm "> 2. Démarches PMO</h3>
                        </div>
                        <ul className="grid gap-2 text-sm pt-1 pb-2">
                            {demarchesPmo.map((step, index) => (
                                <SmallStep disabled={step.disabled} key={index} link={step.href} label={step.label}
                                           done={step.done} numberOfTaskDone={step.numberOfTaskDone}
                                           numberOfTask={step.numberOfTask}/>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className={"flex items-center gap-4 mb-2"}>
                            <h3 className="font-semibold text-sm "> 2. Accords de participation</h3>
                        </div>
                        <ul className="grid gap-2 text-sm pt-1 pb-2">
                            {demarchesAccords.map((step, index) => (
                                <SmallStep disabled={step.disabled} key={index} link={step.href} label={step.label}
                                           done={step.done} numberOfTaskDone={step.numberOfTaskDone}
                                           numberOfTask={step.numberOfTask}/>
                            ))}
                        </ul>
                    </div>
                </div>
            </>
        ),
        "declaration": (
            <>
                <span className={"text-xs text-gray-700"}>
                     {"Pour lancer votre opération, vous devez déclarer votre projet auprès d'Enedis."}
                </span>
                <div className={"grid gap-4 mt-2 grid-cols-1 lg:grid-cols-3"}>
                    <div>
                        <div className={"flex items-center gap-4 mb-2"}>
                            <h3 className="font-semibold text-sm ">Déclaration Enedis</h3>
                        </div>
                        <ul className="grid gap-2 text-sm pt-1 pb-2">
                            {declaration.map((step, index) => (
                                <SmallStep disabled={step.disabled} key={index} link={step.href} label={step.label}
                                           done={step.done} index={index}/>
                            ))}
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
                    <ul className="grid gap-2 text-sm pt-1 pb-2">
                        {candidatures.steps.map((step, index) => (
                            <SmallStep key={index} link={step.href} label={step.label} index={index} done={step.done}
                                       numberOfTaskDone={step.numberOfTaskDone} disabled={step.disabled}
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

                            <ul className="grid gap-2 text-sm pt-1 pb-2">
                                {sales.steps.map((step, index) => (
                                    <SmallStep key={index} link={step.href} label={step.label} index={index}
                                               done={step.done} disabled={step.disabled}
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
                            <ul className="grid gap-2 text-sm pt-1 pb-2">
                                {signatures.steps.map((step, index) => (
                                    <SmallStep key={index} link={step.href} label={step.label} index={index}
                                               done={step.done}
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
                            <ul className="grid gap-2 text-sm pt-1 pb-2">
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
                            <ul className="grid gap-2 text-sm pt-1 pb-2">
                                <SmallStep disabled={true} label={"J'exporte la liste des participants sur EnoPower"}
                                           done={false}
                                           index={0}/>

                            </ul>
                        </div>
                    </div>

                </>
            ),
    }

    return <Accordion type="single"collapsible className={""}>
        <AccordionItem value="item-1" className={"bg-gray-50  px-8"}>
            <AccordionTrigger>
                <div className={"w-max flex  text-primary"}>
                    <FootprintsIcon className={"size-4 mr-4"}/>
                    {"J'ai besoin d'aide dans le parcours des participants"}
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <Tabs orientation="vertical" value={activeTab} onValueChange={setActiveTab} className="h-full ">
                    <div className="flex h-48 bg-gray-50">
                        <TabsList className="flex-grow h-full flex flex-col ">
                            <span
                                className={"uppercase text-xs w-full text-left ml-2 mt-4"}>Parcours des Participants</span>

                            {participantsTab(participants, isBulletinEdited, isAccordsParticipationEdited).map((tab, index) => (
                                <TabsTrigger
                                    key={tab.id}
                                    value={tab.id}
                                    className="flex data-[state=active]:bg-white py-0 justify-between items-center w-[400px] px-3 text-sm"
                                >
                                    <div className={"flex items-center "}>
                                        <Timeline index={index}
                                                  length={participantsTab(participants, isBulletinEdited, isAccordsParticipationEdited).length}/>
                                        <span className={cn("text-left font-normal truncate ml-2",
                                            tab.ping && 'text-primary  font-bold')}>
                                            {tab.label}</span>
                                    </div>
                                    {tab.ping ?
                                        <span
                                            className="flex text-sm  text-primary gap-1 items-center ms-1 py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary/10 text-gray-800 dark:bg-neutral-700 dark:text-neutral-300">
                                            <BellIcon className="size-4"/>  à faire
                            </span> :
                                        <></>}
                                </TabsTrigger>
                            ))}
                            {/*<span className={"uppercase ml-2 mt-4 text-xs w-full text-left"}>démarches</span>*/}
                            {/*{demarchesTabs(isBulletinEdited, isAccordsParticipationEdited, isDeclarationSent).map((tab) => (*/}
                            {/*    <TabsTrigger*/}
                            {/*        key={tab.id}*/}
                            {/*        value={tab.id}*/}
                            {/*        className={cn("flex data-[state=active]:bg-white justify-between items-center w-[400px]  px-3 py-2 text-sm",*/}
                            {/*            tab.hide && 'line-through')}*/}
                            {/*    >*/}
                            {/*        <div className={"flex items-center"}>*/}
                            {/*            <span className={cn("text-left font-normal truncate mr-2",*/}
                            {/*                tab.ping && 'text-primary font-bold')}>*/}
                            {/*                {tab.label}*/}
                            {/*            </span>*/}
                            {/*        </div>*/}
                            {/*        {tab.ping ? <span*/}
                            {/*                className="flex text-sm  text-primary gap-1 items-center ms-1 py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary/10 text-gray-800 dark:bg-neutral-700 dark:text-neutral-300">*/}

                            {/*                <BellIcon className="size-4"/> à faire*/}
                            {/*</span> :*/}
                            {/*            <></>}*/}
                            {/*    </TabsTrigger>*/}
                            {/*))}*/}
                        </TabsList>
                        <div className="flex-grow w-full p-4 h-full bg-white/50 rounded-r-lg overflow-y-auto">
                            {/*{demarchesTabs(isBulletinEdited, isAccordsParticipationEdited, isDeclarationSent).map((tab) => (*/}
                            {/*    <TabsContent key={tab.id} value={tab.id} className="mt-0 h-full ">*/}
                            {/*        {tabContents[tab.id]}*/}
                            {/*    </TabsContent>*/}
                            {/*))}*/}
                            {participantsTab(participants, isBulletinEdited, isAccordsParticipationEdited).map((tab) => (
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