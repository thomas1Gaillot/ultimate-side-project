import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { TypographySmall, TypographyMuted } from "@/components/ui/typography";
import { Input } from "@/components/ui/input";
import { ArrowUpIcon, PencilIcon, TrashIcon } from "lucide-react";
import Task from "@/app/(locale)/pomodoro/components/task-widget/list/Task";
import { formatSecondsToMmss } from "@/lib/format-seconds-to-mmss";

interface TaskCardProps {
    task: {
        id: number;
        name: string;
        duration: number;
    };
    form: any;
    onDelete: (id: number) => void;
    onRedo: (taskName: string) => void;
    onRenameAndRetime: (id: number, newName: string, newDuration: number) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, form, onDelete, onRedo, onRenameAndRetime }) => {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newName:string = e.currentTarget.task.value;
        const newDuration = Number(e.currentTarget.duration.value);
        onRenameAndRetime(task.id, newName, newDuration);
    };

    return (
        <div className="bg-gray-50/60 hover:bg-gray-50 pl-4 pr-2 pt-2 pb-1 rounded-lg shadow-sm flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <Task taskName={task.name} />
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <PencilIcon className="size-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="grid gap-1">
                        <TypographySmall>Edit Task</TypographySmall>
                        <form onSubmit={handleSubmit}>
                            <Input
                                name="task"
                                defaultValue={task.name}
                                placeholder="Task"
                                className="w-full mb-2"
                            />
                            <Input
                                name="duration"
                                defaultValue={task.duration}
                                placeholder="Duration"
                                className="w-full mb-2"
                            />
                            <TypographyMuted>Press Enter to submit</TypographyMuted>
                            <div className={"flex justify-end w-full"}>
                                <Button type="submit">
                                    Save
                                </Button>
                            </div>


                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex items-center justify-between space-x-2">
                <div className={"space-x-1"}>
                    <TypographySmall>{formatSecondsToMmss(task.duration)}</TypographySmall>
                </div>
                <div className={"space-x-2"}>
                    <Button variant="ghost" size="icon" onClick={() => onRedo(task.name)}>
                        <ArrowUpIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(task.id)}>
                        <TrashIcon className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
