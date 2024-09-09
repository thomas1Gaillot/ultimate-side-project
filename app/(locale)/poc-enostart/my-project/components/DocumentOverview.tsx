import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {PmoStatus} from "@/app/(locale)/poc-enostart/data/pmo-status";
import {cn} from "@/lib/utils";
import {DocumentOverview} from "@/app/(locale)/poc-enostart/my-project/page";

export default function Component({doc, index}: {
    doc: DocumentOverview,
    index: number,
}) {
    return <Card key={index}
                 className={cn(" w-[200px] h-[250px] max-h-[250px] flex flex-col justify-between hover:shadow-none shadow-none  rounded",
                     doc.status === PmoStatus.Ignore && 'opacity-60',
                     (doc.status !== PmoStatus.ChoisirUnPlan && doc.status !== PmoStatus.Ignore ) ?
                         'bg-primary/5 border ' : 'border-none bg-gray-50 '
                     )}>
        <CardHeader>
            <p className="text-xs text-center relative bottom-2 text-gray-400">temps estimé
                : {doc.estimatedTime}</p>
            <CardTitle
                className="text-lg text-center text-gray-700 w-full leading-6">{doc.title}</CardTitle>


        </CardHeader>
        <CardContent className="flex flex-col items-center">
            {doc.icon}
        </CardContent>
        <CardFooter>
            <doc.Button/>
        </CardFooter>
    </Card>
}

