import {FileCheck2Icon, FileSignatureIcon} from "lucide-react";

const AccordParticipationContent = () => (
    <div className="  h-full flex flex-col justify-between md:max-h-[80vh] text-gray-900 dark:text-neutral-400">
        <div className="space-y-6 px-4 py-10   overflow-y-auto lg:space-y-10">

            <div className={"grid grid-cols-[100px_1fr]"}>
                <FileCheck2Icon className="shrink-0 mt-2 size-16 text-gray-800 dark:text-white"/>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Accords de participation</h2>
                    <p className="mt-3   text-sm text-gray-600">
                        {"Les accords de participation sont des documents obligatoires pour créer une opération. Ils doivent être préparés à l'avance et signés par les consommateurs et producteurs impliqués dans votre projet."}
                    </p>
                </div>
            </div>


            {/* Icon Block */}
            <div className="flex gap-x-5 sm:gap-x-8">
                <FileCheck2Icon className="shrink-0 mt-2 size-6 text-gray-800 dark:text-white"/>
                <div className="grow">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">Création du
                        document</h3>
                    <p className="mt-1   text-sm text-gray-600">
                        Notre plateforme vous permet de créer facilement le document. Remplissez les champs, et nous
                        générons
                        le document que vous pourrez exporter.
                    </p>
                </div>
            </div>
            {/* End Icon Block */}

            {/* Icon Block */}
            <div className="flex gap-x-5 sm:gap-x-8">
                <FileSignatureIcon className="shrink-0 mt-2 size-6 text-gray-800 dark:text-white"/>
                <div className="grow">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-neutral-200">Envoi et récupération
                        des signatures</h3>
                    <p className="mt-1  text-sm text-gray-600">
                        {"Vous pouvez envoyer le document pour signature via notre plateforme. Suivez l'avancement des signatures et exportez les documents signés."}
                    </p>
                    <div className={"w-full text-right font-semibold text-primary text-2xl mt-4"}>15 € / accord signé
                    </div>
                </div>
            </div>
            {/* End Icon Block */}

            <div className={"grid grid-cols-[100px_1fr]"}>
                <FileCheck2Icon className="shrink-0 mt-2 size-16 text-gray-800 dark:text-white"/>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Déclaration de mise en oeuvre</h2>
                    <p className="mt-3   text-sm text-gray-600">
                        Mon énergie collective vous accompagne pour créer, éditer et envoyer la déclaration de mise
                        en œuvre de votre opération.
                    </p>
                    <div className={"w-full text-right font-semibold text-primary text-lg"}>Inclus</div>

                </div>
            </div>

            <div className={"grid grid-cols-[100px_1fr]"}>
                <FileCheck2Icon className="shrink-0 mt-2 size-16 text-gray-800 dark:text-white"/>
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">{"Convention d'ACC"}</h2>
                    <p className="mt-3   text-sm text-gray-600">
                        {" Mon énergie collective vous aide à créer et envoyer la convention d'ACC, l'étape finale de\n" +
                            "                            votre opération."}
                    </p>
                    <div className={"w-full text-right font-semibold text-primary text-lg"}>Inclus</div>
                </div>
            </div>
        </div>
        <button className="mt-6 w-full py-3 bg-primary text-white font-semibold rounded-lg">Je souscris</button>

        <p className="text-sm text-center mt-4">
            Je ne souhaite pas me faire accompagner dans ces démarches.<br/> Je les réaliserai en dehors de Mon
            énergie collective.
        </p>
    </div>
);


export default AccordParticipationContent;