import { Button } from "@/components/ui/button";

export default function ConventionPage() {
    return (
        <div className="w-full">
            <div className="w-full rounded h-48 bg-gray-50 flex items-center justify-center">
                <span>Choix du plan - Convention ACC</span>
            </div>
            <div className="mb-4 flex gap-2">
                <Button>1. Editer la convention</Button>
                <Button disabled={true} className="">{"2. Envoyer la convention à Enedis"}</Button>
            </div>
        </div>
    );
}
