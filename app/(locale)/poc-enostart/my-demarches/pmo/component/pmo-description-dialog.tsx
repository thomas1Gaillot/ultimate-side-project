import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Building, FileText, PencilLine, Users} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import PrestationCard from "@/app/(locale)/poc-enostart/my-demarches/overview/components/PrestationCard";
import {useStoredPrestations} from "@/app/(locale)/poc-enostart/data/use-prestations";
import {useState} from "react";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";
import {cn} from "@/lib/utils";

export default function PmoDescriptionDialog({ open, onOpenChange }: { open: boolean, onOpenChange: any }) {
    const { pmoDemarches, setPmoDemarches } = useStoredPrestations();

    const pmoPrestation = {
        title: "Démarches PMO",
        tasks: [
            "Aide à la création de la PMO",
            "Édition des bulletins d'adhésion"
        ],
        pricing: "5€ par signature de bulletin d'adhésion",
        action: setPmoDemarches,
        state: pmoDemarches
    };


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className={"h-full overflow-y-auto sm:max-w-[900px]"}>
                <DialogHeader>
                    <DialogTitle>
                        {"Qu'est ce qui est compris dans la prestation : Démarches PMO ?"}
                    </DialogTitle>
                </DialogHeader>

                {/* Toggle switch for association creation */}


                <PmoSteps/>

                <PrestationCard prestation={pmoPrestation} hideDescription={true} />
            </DialogContent>
        </Dialog>
    );
}


export function PmoSteps(){
    const [associationCreated, setAssociationCreated] = useState(false); // Toggle state

    // Define all steps
    const allSteps = [
        {
            icon: <FileText className="h-5 w-5 text-primary" />,
            title: "Étape 1",
            description: "Construire les statuts",
            selected : true
        },
        {
            icon: <Users className="h-5 w-5 text-primary" />,
            title: "Étape 2",
            description: "Réaliser l'assemblée générale de constitution",
            selected : false
        },
        {
            icon: <PencilLine className="h-5 w-5 text-primary" />,
            title: "Étape 3",
            description: "Signer les statuts PMO",
            selected : false
        },
        {
            icon: <Building className="h-5 w-5 text-primary" />,
            title: "Étape 4",
            description: "Déclarer l'association en préfecture",
            selected : false
        },
        {
            icon: <FileText className="h-5 w-5 text-primary" />,
            title: "Étape 5",
            description: "Editer le bulletin d'adhésion",
            selected : false
        },
        {
            icon: <PencilLine className="h-5 w-5 text-primary" />,
            title: "Étape 6",
            description: "Faire signer les bulletins d'adhésion par les consommateurs",
            selected : false
        },
        {
            icon: <PencilLine className="h-5 w-5 text-primary" />,
            title: "Étape 7",
            description: "Faire signer les bulletins d'adhésion par les producteurs",
            selected : false
        }
    ];

    // Steps when the association is already created (excluding the "Déclarer l'association" step)
    const filteredSteps = allSteps
        .slice(2) // Remove steps 1 and 2 when the association is already created
        .filter(step => step.description !== "Déclarer l'association en préfecture"); // Hide "Déclarer l'association"

    // Steps to display based on toggle
    const stepsToShow = associationCreated
        ? filteredSteps.map((step, index) => ({
            ...step,
            title: `Étape ${index + 1}` // Renumber steps starting from 1
        }))
        : allSteps;

    return <Card className="w-full mx-auto">
        <CardHeader>
            <CardTitle className="text-sm grid items-center font-bold text-center">
                Les étapes de création de votre association PMO
                <div className="flex items-center mb-6">
                    <Label htmlFor="association-created" className="mr-4">
                        {"J'ai déjà créé mon association"}
                    </Label>
                    <Switch id="association-created" checked={associationCreated}
                            onCheckedChange={setAssociationCreated}/>
                </div>
            </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-4">
            {stepsToShow.map((step, index) => (
                <div key={index} className={cn("flex flex-col items-center text-center", !step.selected && 'opacity-60')}>
                    <div className={cn("mb-4 p-2  rounded-full", step.selected ? 'bg-primary/10':'bg-muted')}>
                        {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
            ))}
        </CardContent>
    </Card>
}