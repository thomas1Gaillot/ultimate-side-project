import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Building, DownloadIcon, FileText, PencilLine, Users} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";
import {PrestationCard} from "@/app/(locale)/poc-enostart/my-demarches/overview/page";
import {useStoredPrestations} from "@/app/(locale)/poc-enostart/my-demarches/data/use-prestations";


export default function PmoDescriptionDialog({open, onOpenChange}: { open: boolean, onOpenChange: any }) {
    const {pmoDemarches, setPmoDemarches} = useStoredPrestations();
    const pmoPrestation = {
        title: "Démarches PMO",
        tasks: [
            "Aide à la création de la PMO",
            "Édition des bulletins d'adhésion"
        ],
        pricing: "5€ par signature de bulletin d'adhésion",
        action: setPmoDemarches,
        state: pmoDemarches
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={"h-full overflow-y-auto sm:max-w-[900px]"}>
                <DialogHeader>
                    <DialogTitle>{"Qu'est ce qui est compris dans la prestation : Démarches PMO ?"}</DialogTitle>
                </DialogHeader>
                <Card className="w-full mx-auto">
                    <CardHeader>
                        <CardTitle className="text-sm font-bold text-center">
                            Les étapes de création de votre association PMO
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-6 md:grid-cols-4">
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-2 bg-primary/10 rounded-full">
                                <FileText className="h-8 w-8 text-primary"/>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Étape 1</h3>
                            <p className="text-sm text-muted-foreground">
                                Construire les statuts
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-2 bg-primary/10 rounded-full">
                                <Users className="h-8 w-8 text-primary"/>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Étape 2</h3>
                            <p className="text-sm text-muted-foreground">
                                {"Réaliser l'assemblée générale de constitution"}
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-2 bg-primary/10 rounded-full">
                                <Building className="h-8 w-8 text-primary"/>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Étape 3</h3>
                            <p className="text-sm text-muted-foreground">
                                {"Déclarer l'association en préfecture"}
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-2 bg-primary/10 rounded-full">
                                <DownloadIcon className="h-8 w-8 text-primary"/>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Étape 4</h3>
                            <p className="text-sm text-muted-foreground">
                                {"Téléverser les statuts PMO signés sur Mon énergie collective"}
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-2 bg-primary/10 rounded-full">
                                <FileText className="h-8 w-8 text-primary"/>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Étape 5</h3>
                            <p className="text-sm text-muted-foreground">
                                {"Editer le bulletin d'adhésion"}
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-2 bg-primary/10 rounded-full">
                                <PencilLine className="h-8 w-8 text-primary"/>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Étape 6</h3>
                            <p className="text-sm text-muted-foreground">
                                {"Faire signer les bulletins d'adhésion par les consommateurs"}
                            </p>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <div className="mb-4 p-2 bg-primary/10 rounded-full">
                                <PencilLine className="h-8 w-8 text-primary"/>
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Étape 7</h3>
                            <p className="text-sm text-muted-foreground">
                                {"Faire signer les bulletins d'adhésion par les producteurs"}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <PrestationCard prestation={pmoPrestation} hideDescription={true}/>
            </DialogContent>
        </Dialog>
    );
}
