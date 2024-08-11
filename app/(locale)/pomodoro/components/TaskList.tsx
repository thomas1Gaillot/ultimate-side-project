'use client'
import {TypographySmall} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import {TrashIcon} from "lucide-react";
import {formatSecondsToMmss} from "@/lib/format-seconds-to-mmss";
import {cn} from "@/lib/utils";
import index from "@/domain/pomodoro/use-pomodoro-store";

const TaskList = ({tasks, deleteTask, currentTask}: {
    tasks: { id: number; name: string; duration: number }[];
    deleteTask: (id: number) => void;
    currentTask: string;
}) => {
    const {setIsPlaying} = index();
    function handleDeleteTask(id: number) {
        deleteTask(id);
        setIsPlaying(false);
    }
    return (
        <div className="grid gap-2 w-full pt-8">
            {tasks?.map((task) => (
                <div key={task.id}
                     className={cn("flex items-center justify-between gap-8  pr-2 pl-4 py-1",
                         task.name === currentTask && 'bg-gray-100' )}>
                    <TypographySmall>{task.name}</TypographySmall>
                    <div className="flex items-center gap-2 text-slate-800">
                        <TypographySmall>{formatSecondsToMmss(task.duration)}</TypographySmall>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                            <TrashIcon className="w-4 h-4"/>
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
