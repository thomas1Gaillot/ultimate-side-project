import {Badge} from "@/components/ui/badge";
import {SquareUserIcon} from "lucide-react";

export default function PreRequisitePmo(){
    return <Badge variant={'secondary'}
                  className={'grid text-gray-700 gap-1 bg-yellow-50 hover:bg-yellow-50 text-[10px]'}>
        <p className=" uppercase min-w-max">{"Pré-requis"} </p>
        <div
            key={'prerequisite-'}
            className={"flex items-start font-normal relative right-1"}>
            <SquareUserIcon className="min-w-4 h-4"/>
            <p>{"Statuts PMO Associative"} </p>
        </div>
    </Badge>
}