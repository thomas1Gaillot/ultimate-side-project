import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {ZoomInIcon} from "lucide-react";
import Image from "next/image";

export default function Flowchart() {
    return <>
        <h1 className="text-2xl font-bold mb-6">{"Vue d'ensemble : Démarches et prestations"}</h1>
        <Card className={cn("w-full  my-4")}>
            <CardHeader>
                <CardTitle className="text-sm font-bold text-center flex justify-between">
                    <h1 className="text-lg font-bold  mb-2">{"J'anticipe les démarches de création de mon opération"}</h1>

                    <a href={'/poc-enostart/flow-demarches.svg'} target={"_blank"} rel="noopener noreferrer">
                        <Button
                            variant={'secondary'}>
                            <ZoomInIcon
                                className={"size-5 text-gray-700"}/>
                        </Button>
                    </a>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Image
                    src={'/poc-enostart/flow-demarches.svg'}
                    alt={"Flowchart des démarches"}
                    width={2254}
                    height={894}
                    className={"w-full h-auto"}/>
            </CardContent>
        </Card>

    </>
}
