import {ScrollTextIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useStoredPrestations} from "@/app/(locale)/poc-enostart/data/use-prestations";

const BulletinSubscriptionDialogContent =({close}: {
    close: () => void
}) => {
    const {setPmoDemarches} = useStoredPrestations();

    function subscribe() {
        setPmoDemarches('active');
        close()
    }

    function ignore() {
        setPmoDemarches('disabled');
        close()
    }

    return (<div className="  h-full flex flex-col justify-between md:max-h-[80vh] text-gray-900 dark:text-neutral-400">
        <div className="space-y-6 px-4 py-10   overflow-y-auto lg:space-y-10">

            <div className={"grid grid-cols-[100px_1fr]"}>
                <ScrollTextIcon className="shrink-0 mt-2 size-16 text-gray-800 dark:text-white"/>
                <div>
                    <h2 className="text-lg font-bold text-gray-800 dark:text-white">{"Bulletin d'adhésion"}</h2>
                    <p className="mt-3   text-xs text-gray-600">
                        {"Les bulletins d'adhésion sont des documents obligatoires pour créer une opération. Ils doivent être préparés à l'avance et signés par les consommateurs et producteurs impliqués dans votre projet."}
                    </p>
                </div>
            </div>
            <div className="flex gap-x-5 sm:gap-x-8">
                <span className={"text-xl font-bold text-gray-700"}>1</span>
                <div className="grow">
                    <h3 className=" font-semibold text-gray-800 dark:text-neutral-200">Création du
                        document</h3>
                    <p className="mt-1   text-xs text-gray-600">
                        Notre plateforme vous permet de créer facilement le document. Remplissez les champs, et nous
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
                    <div className={"w-full text-right font-semibold text-primary text-2xl mt-4"}>10 € / bulletins signé
                    </div>
                </div>
            </div>
        </div>
        <Button className={'mt-4'} onClick={subscribe} size={'lg'}>Je souscris</Button>
        <Button onClick={ignore}
                variant={'link'} size={'sm'} className="text-xs text-gray-500 text-center mt-4">
            Je ne souhaite pas me faire accompagner dans ces démarches.<br/> Je les réaliserai en dehors de Mon
            énergie collective.
        </Button>
    </div>)
};


export default BulletinSubscriptionDialogContent;