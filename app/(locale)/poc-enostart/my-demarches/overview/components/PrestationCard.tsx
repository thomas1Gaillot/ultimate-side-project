import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

// Type definition for prestations
interface Prestation {
    title: string;
    tasks: string[];
    pricing: string;
    action: (status: ("active" | "disabled" | null)) => void;
    state: "active" | "disabled" | null;
}

export default function PrestationCard({prestation, hideDescription, key}: {
    prestation: Prestation,
    hideDescription?: boolean,
    key?: number
}) {
    return (<Card
        key={key}
        className={cn(`rounded-lg shadow-lg ${prestation.state === 'disabled' ? "opacity-50" : ""}`,
            prestation.state === 'active' && "border-2 bg-primary/5 border-primary"
        )}>
        <CardHeader>
            <CardTitle
                className="text-sm font-semibold">{hideDescription ? 'Souscription' : prestation.title}</CardTitle>
        </CardHeader>
        <CardContent className={cn(!hideDescription && "h-[250px]")}>
            <div className={"h-full flex flex-col justify-between"}>
                <div className="flex items-center text-sm text-muted-foreground">
                    <span className="font-bold text-lg text-gray-700">{prestation.pricing}</span>
                </div>

                {!hideDescription && <ul className="list-disc h-full py-4 text-sm pl-5 space-y-2 mt-4">
                    {prestation.tasks.map((task: any, taskIndex: number) => (
                        <li key={taskIndex}>{task}</li>
                    ))}
                </ul>}
            </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
            {prestation.state !== 'active' && <Button
                className="w-full rounded-full bg-gradient-to-r from-gray-400 to-gray-500 text-white"
                onClick={() => prestation.action('active')}
            >
                Je souscris à cette prestation
            </Button>}
            <a
                href="#"
                onClick={(e) => {
                    e.preventDefault()
                    prestation.action('disabled')
                }}
                className="text-sm text-gray-600 underline"
            >
                {"Je souhaite réaliser cette prestation en dehors de l'application"}
            </a>
        </CardFooter>
    </Card>);
}