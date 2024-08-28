import { Button } from "@/components/ui/button";

export default function EnedisPage() {
    return (
        <div className="w-full">
            <div className="w-full rounded h-48 bg-gray-50 flex items-center justify-center">
                <span>Choix du plan - Enedis</span>
            </div>
            <div className="mb-4">
                <Button>Envoyer la déclaration de mise en oeuvre</Button>
            </div>
        </div>
    );
}
