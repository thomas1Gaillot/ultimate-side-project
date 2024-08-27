import {cn} from "@/lib/utils";
import {CircleIcon} from "lucide-react";

export default function Timeline({index, length}: {
    index: number,
    length: number
}) {
    return (
        <div className={"flex flex-col gap-0.5 items-center justify-center"}>
            <div
                className={cn(' h-3 w-[1px] bg-gray-400', index === 0 && 'bg-gray-50')}/>

            <CircleIcon className={'size-3 text-gray-400'}/>
            <div
                className={cn(' h-3 w-[1px] bg-gray-400', index === length - 1 && 'bg-gray-50')}/>
        </div>
    )
}