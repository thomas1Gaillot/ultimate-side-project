import {CheckCircle2, Circle} from "lucide-react";
import {Button} from "@/components/ui/button";

const ExplanationStep = ({title, done, buttonTitle, buttonAction}: {
    title: string,
    done: boolean,
    buttonTitle: string,
    buttonAction: () => void
}) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                {done ? <CheckCircle2 className="text-green-500"/> : <Circle className="text-gray-300"/>}
                <span>{title}</span>
            </div>
            <Button onClick={buttonAction} size={'sm'} variant="outline" disabled={done}>{buttonTitle}</Button>
        </div>
    )
}

export default ExplanationStep