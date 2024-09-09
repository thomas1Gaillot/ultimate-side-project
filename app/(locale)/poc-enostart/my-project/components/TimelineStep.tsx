import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

interface TimelineStep {
    title: string;
    description: string;
    Button: ()=>JSX.Element;
    prerequisites?: { text: string, icon: any }[];
    ping: boolean;
}


export default function TimelineStep({step, index}: {
    step: TimelineStep;
    index: number
}) {
    return <div key={index} className={cn("flex", !step.ping && 'opacity-60')}>
        <div className={"flex flex-col mt-1 items-center mr-4"}>
            {step.ping ?
                <div className="w-4 h-4 min-h-4 bg-primary rounded-full mb-2">
                    <div className="w-4 h-4 min-h-4 animate-ping bg-primary rounded-full mb-2">
                    </div>
                </div> :
                <div className="w-3 h-3 min-w-3 min-h-3 bg-gray-500 rounded-full"></div>}
            <div className="h-full w-0.5 bg-gray-200  mt-2"></div>
        </div>
        <div>
            {step.prerequisites && (
                <Badge variant={'secondary'}
                       className={'grid text-gray-700 gap-1 bg-yellow-50 hover:bg-yellow-50 text-[10px]'}>
                    <p className=" uppercase min-w-max">{"Pré-requis"} </p>
                    {step.prerequisites.map((prerequisite, index) => <div
                        key={'prerequisite-' + index}
                        className={"flex items-start font-normal relative right-1"}>
                        <prerequisite.icon className="min-w-4 h-4"/>
                        <p>{prerequisite.text} </p>
                    </div>)}

                </Badge>
            )}
            <h3 className="">{step.title}</h3>
            <p className="text-xs text-gray-500">{step.description}</p>
            <step.Button  />
        </div>
    </div>
}