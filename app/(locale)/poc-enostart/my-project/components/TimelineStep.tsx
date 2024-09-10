import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";

interface TimelineStep {
    title: string;
    description: string;
    Button: () => JSX.Element;
    prerequisites?: { text: string, icon: any }[];
    ping: boolean;
}


export default function TimelineStep({step, index, key}: {
    step: TimelineStep;
    index: number;
    key: number
}) {
    return <div key={index} className={cn("flex")}>
        <div className={"flex flex-col mt-1 items-center mr-4"}>
            {step.ping ?
                <div className="w-4 h-4 min-h-4 bg-primary rounded-full mb-2">
                    <div className="w-4 h-4 min-h-4 animate-ping bg-primary rounded-full mb-2">
                    </div>
                </div> :
                <div className=" opacity-60 w-3 h-3 min-w-3 min-h-3 bg-gray-500 rounded-full"></div>}
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
            <h3 className={cn(!step.ping && 'opacity-60')}>{step.title}</h3>
            <p className={cn("text-xs text-gray-500", !step.ping && 'opacity-60')}>{step.description}</p>
            <div className={!step.ping ? 'opacity-60' : ''}>
                <step.Button/>
            </div>
        </div>
    </div>
}