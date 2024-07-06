import { TypographySmall } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { formatSecondsToMmss } from "@/lib/format-seconds-to-mmss";

const TaskList = ({ tasks, deleteTask }:{
    tasks: { id: number; name: string; duration: number }[];
    deleteTask: (id: number) => void;
}) => {
    return (
        <div className="grid gap-2 w-full">
            {tasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between gap-8 bg-muted rounded-md pr-2 pl-4 py-1">
                    <TypographySmall>{task.name}</TypographySmall>
                    <div className="flex items-center gap-2">
                        <TypographySmall>{formatSecondsToMmss(task.duration)}</TypographySmall>
                        <Button variant="outline" size="icon" onClick={() => deleteTask(task.id)}>
                            <TrashIcon className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
