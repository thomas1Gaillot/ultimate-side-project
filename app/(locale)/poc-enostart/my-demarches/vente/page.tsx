import { Button } from "@/components/ui/button";

export default function VentePage() {
    return (
        <div className="w-full">
            <div className="w-full rounded h-48 bg-gray-50 flex items-center justify-center">
                <span>Choix du plan - Vente</span>
            </div>
            <div className="mb-4">
                <Button>Editer les contrats de vente</Button>
            </div>
        </div>
    );
}
