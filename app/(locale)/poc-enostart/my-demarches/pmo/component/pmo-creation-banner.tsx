import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, Building } from "lucide-react"

export default function PmoCreationBanner() {
    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle className="text-sm font-bold text-center">3 étapes pour créer une association</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-4">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-2 bg-primary/10 rounded-full">
                        <FileText className="h-8 w-8 text-primary"/>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Étape 1</h3>
                    <p className="text-sm text-muted-foreground">Construire les statuts</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-2 bg-primary/10 rounded-full">
                        <Users className="h-8 w-8 text-primary"/>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Étape 2</h3>
                    <p className="text-sm text-muted-foreground">{"Réaliser l'assemblée générale de constitution"}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-2 bg-primary/10 rounded-full">
                        <Building className="h-8 w-8 text-primary"/>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Étape 3</h3>
                    <p className="text-sm text-muted-foreground">{"Déclarer l'association en préfecture"}</p>
                </div>
                <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-2 bg-primary/10 rounded-full">
                        <Building className="h-8 w-8 text-primary"/>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Étape 4</h3>
                    <p className="text-sm text-muted-foreground">{"Téléverser les statut PMO sur Mon énergie collective"}</p>
                </div>
            </CardContent>
        </Card>
    )
}