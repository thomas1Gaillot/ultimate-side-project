import {FileCheck2Icon, FileTextIcon, FolderArchiveIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useStoredPrestations} from "@/app/(locale)/poc-enostart/data/use-prestations";
import {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

const AccordSubscriptionContent = ({ignored}:{ignored : boolean}) => {
    const [openModal, setOpenModal] = useState(false)
    const {setEnedisDemarches} = useStoredPrestations();

    function subscribe() {
        setEnedisDemarches('active');

        setOpenModal(false)
    }

    function ignore() {
        setEnedisDemarches('disabled');
        setOpenModal(false)
    }

    return (
        <Dialog open={openModal}
                onOpenChange={() => setOpenModal(!openModal)}>
            <DialogTrigger asChild>
                {ignored ?
                    <Button className={'w-full font-normal text-sm'} variant={'ghost'} size={'sm'}>{"Ignoré.Changer d'avis ?"}</Button> :
                    <Button  size='sm' className=" w-full text-right">{"Commencer ->"}</Button>
                }
            </DialogTrigger>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>{"Souscription à la prestation : Accords, Déclaration et Convention"}</DialogTitle>
                </DialogHeader>
                <div
                    className="  h-full flex flex-col justify-between md:max-h-[80vh] text-gray-900 dark:text-neutral-400">
                    <div className="space-y-6 px-4 py-10   overflow-y-auto lg:space-y-10">

                        <div className={"grid grid-cols-[100px_1fr]"}>
                            <FileCheck2Icon className="shrink-0 mt-2 size-16 text-gray-800 dark:text-white"/>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Accords de
                                    participation</h2>
                                <p className="mt-3   text-xs text-gray-600">
                                    {"Les accords de participation sont des documents obligatoires pour créer une opération. Ils doivent être préparés à l'avance et signés par les consommateurs et producteurs impliqués dans votre projet."}
                                </p>
                            </div>
                        </div>


                        <div className="flex gap-x-5 sm:gap-x-8">
                            <span className={"text-xl font-bold text-gray-700"}>1</span>
                            <div className="grow">
                                <h3 className=" font-semibold text-gray-800 dark:text-neutral-200">Création du
                                    document</h3>
                                <p className="mt-1   text-xs text-gray-600">
                                    Notre plateforme vous permet de créer facilement le document. Remplissez les champs,
                                    et nous
                                    générons
                                    le document que vous pourrez exporter.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-x-5 sm:gap-x-8">
                            <span className={"text-xl font-bold text-gray-700"}>2</span>
                            <div className="grow">
                                <h3 className="font-semibold text-gray-800 dark:text-neutral-200">Envoi et récupération
                                    des signatures</h3>
                                <p className="mt-1  text-xs text-gray-600">
                                    {"Vous pouvez envoyer le document pour signature via notre plateforme. Suivez l'avancement des signatures et exportez les documents signés."}
                                </p>
                                <div className={"w-full text-right font-semibold text-primary text-2xl mt-4"}>15 € /
                                    accord signé
                                </div>
                            </div>
                        </div>

                        <div className={"grid grid-cols-[100px_1fr]"}>
                            <FileTextIcon className="shrink-0 mt-2 size-16 text-gray-800 dark:text-white"/>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 dark:text-white">Déclaration de mise en
                                    oeuvre</h2>
                                <p className="mt-3   text-xs text-gray-600">
                                    Mon énergie collective vous accompagne pour créer, éditer et envoyer la déclaration
                                    de mise
                                    en œuvre de votre opération.
                                </p>

                            </div>
                        </div>
                        <div className="flex gap-x-5 sm:gap-x-8">
                            <span className={"text-xl font-bold text-gray-700"}>1</span>
                            <div className="grow">
                                <h3 className=" font-semibold text-gray-800 dark:text-neutral-200">Création du
                                    document</h3>
                                <p className="mt-1   text-xs text-gray-600">
                                    Notre plateforme vous permet de créer facilement le document. Remplissez les champs,
                                    et nous
                                    générons
                                    le document que vous pourrez exporter.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-x-5 sm:gap-x-8">
                            <span className={"text-xl font-bold text-gray-700"}>2</span>
                            <div className="grow">
                                <h3 className="font-semibold text-gray-800 dark:text-neutral-200">Accompagnement et
                                    envoi du
                                    document</h3>
                                <p className="mt-1  text-xs text-gray-600">
                                    {"Vous pouvez envoyer le document pour signature via notre plateforme. Suivez l'avancement des signatures et exportez les documents signés."}
                                </p>
                            </div>
                        </div>
                        <div className={"w-full text-right font-semibold text-primary text-lg"}>Inclus</div>

                        <div className={"grid grid-cols-[100px_1fr]"}>
                            <FolderArchiveIcon className="shrink-0 mt-2 size-16 text-gray-800 dark:text-white"/>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 dark:text-white">{"Convention d'ACC"}</h2>
                                <p className="mt-3   text-xs text-gray-600">
                                    {" Mon énergie collective vous aide à créer et envoyer la convention d'ACC, l'étape finale de\n" +
                                        "                            votre opération."}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-x-5 sm:gap-x-8">
                            <span className={"text-xl font-bold text-gray-700"}>1</span>
                            <div className="grow">
                                <h3 className=" font-semibold text-gray-800 dark:text-neutral-200">Création du
                                    document</h3>
                                <p className="mt-1   text-xs text-gray-600">
                                    Notre plateforme vous permet de créer facilement le document. Remplissez les champs,
                                    et nous
                                    générons
                                    le document que vous pourrez exporter.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-x-5 sm:gap-x-8">
                            <span className={"text-xl font-bold text-gray-700"}>2</span>
                            <div className="grow">
                                <h3 className="font-semibold text-gray-800 dark:text-neutral-200">Accompagnement et
                                    envoi du
                                    document</h3>
                                <p className="mt-1  text-xs text-gray-600">
                                    {"Vous pouvez envoyer le document pour signature via notre plateforme. Suivez l'avancement des signatures et exportez les documents signés."}
                                </p>
                            </div>
                        </div>
                        <div className={"w-full text-right font-semibold text-primary text-lg"}>Inclus</div>
                    </div>

                    <Button className={'mt-4'} onClick={subscribe} size={'lg'}>Je souscris</Button>
                    <Button onClick={ignore}
                            variant={'link'} size={'sm'} className="text-xs text-gray-500 text-center mt-4">
                        Je ne souhaite pas me faire accompagner dans ces démarches.<br/> Je les réaliserai en dehors de
                        Mon
                        énergie collective.
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
};


export default AccordSubscriptionContent;