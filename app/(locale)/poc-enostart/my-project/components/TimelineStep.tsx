import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import {CheckIcon} from "lucide-react";

interface TimelineStep {
    title: string;
    description: string;
    Button: ({disabled}:{disabled:boolean}) => JSX.Element;
    prerequisites: { text: string, icon: any, done:boolean }[];
    ping: boolean;
    active?: boolean;
}


export default function TimelineStep({step, index, key}: {
    step: TimelineStep;
    index: number;
    key: number
}) {
    const prerequisTodo = step.prerequisites.length >  0 && step.prerequisites.some(prerequisite => !prerequisite.done)
    const allPrerequisDone = step.prerequisites.length >  0 && step.prerequisites.every(prerequisite => prerequisite.done)
    return <div key={index} className={cn("flex my-6")}>
        <div className={"flex flex-col mt-1 items-center mr-4"}>
            {(step.ping || prerequisTodo) ?
                <div className={cn("w-4 h-4 min-h-4 bg-primary rounded-full mb-2",
                    prerequisTodo && 'bg-amber-400 w-4 h-4 min-h-4')}>
                    <div className={cn("animate-ping  rounded-full mb-2",
                        step.ping && 'visible bg-primary w-4 h-4 min-h-4 ',
                        prerequisTodo && 'bg-amber-400  w-4 h-4 min-h-4',
                        !step.ping && 'hidden' )}>
                    </div>
                </div> :
                <div className={cn(" opacity-60 w-3 h-3 min-w-3 min-h-3 bg-gray-500 rounded-full",
                step.active && 'bg-primary')}></div>}
            <div className="h-full w-0.5 bg-gray-200  mt-2"></div>
        </div>
        <div>
            {step.prerequisites.length >  0 && (
                <Badge variant={'secondary'}
                       className={cn('grid my-2 text-gray-700 gap-1 bg-yellow-50 hover:bg-yellow-50 text-[10px]', allPrerequisDone && 'bg-gray-50 hover:bg-gray-50')}>
                    {prerequisTodo && <p className=" uppercase min-w-max">{"Pré-requis"} </p>}
                    {step.prerequisites.map((prerequisite, index) => <div
                        key={'prerequisite-' + index}
                        className={"flex items-start font-normal relative right-1"}>
                        <prerequisite.icon className="min-w-4 h-4"/>
                        <p className={cn(prerequisite.done && 'line-through')}>{prerequisite.text} </p>
                        {prerequisite.done && <CheckIcon className="size-3 ml-2"/>}
                    </div>)}
                </Badge>
            )}
            <h3 className={cn(!step.ping && !step.active &&  'opacity-60')}>{step.title}</h3>
            <p className={cn("text-xs text-gray-500", !step.ping && !step.active  && 'opacity-60')}>{step.description}</p>
            <div className={!step.ping && !step.active  ? 'opacity-60' : ''}>
                <step.Button disabled={prerequisTodo || false}/>
            </div>
        </div>
    </div>
}