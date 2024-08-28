import { Button } from "@/components/ui/button";

export default function AccordsPage() {
    return (
        <div className="w-full">
            <div className="w-full rounded h-48 bg-gray-50 flex items-center justify-center">
                <span>Choix du plan - Accords de participation</span>
            </div>
            <div className="mb-4">
                <Button>Créer mon association</Button>
            </div>
        </div>
    );
}
