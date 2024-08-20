import React from "react";
import {TypographyH4, TypographySmall} from "@/components/ui/typography";
import {Badge} from "@/components/ui/badge";
import {Hash} from "lucide-react";

interface TaskProps {
    taskName: string;
}

const parseTaskAndBadges = (name: string) => {
    const words = name.split(" ");
    let task = "";
    const badges: string[] = [];

    words.forEach((word) => {
        if (word.startsWith("#")) {
            badges.push(word.slice(1));
        } else {
            task += word + " ";
        }
    });

    return {task: task.trim(), badges};
};

const Task: React.FC<TaskProps> = ({taskName}) => {
    const {task, badges} = parseTaskAndBadges(taskName);

    return (
        <div className="h-full flex flex-col gap-1 w-full max-w-full">
            <div className={"flex"}>
                {badges.map((badge, index) => (
                    <Badge
                        variant="outline"
                        className="rounded-sm border-none w-max bg-secondary text-secondary-foreground mr-2"
                        key={`badge-${index}`}
                    >
                        <Hash className={'size-3 text-gray-500'}/>
                        {badge}
                    </Badge>
                ))}
            </div>
            <p className={'text-gray-900 text-md '}>{task}</p>
        </div>
    );
};

export default Task;
