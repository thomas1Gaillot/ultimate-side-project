import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {cn} from "@/lib/utils";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {ArrowUpIcon, PencilIcon, TrashIcon} from "lucide-react";
import {TypographyMuted, TypographySmall} from "@/components/ui/typography";
import {Input} from "@/components/ui/input";
import {formatSecondsToMmss} from "@/lib/format-seconds-to-mmss";
import usePomodoroStore from "@/domain/pomodoro/stores";
import {CreateTask} from "@/domain/pomodoro/entities/Task";
import {UseFormReturn} from "react-hook-form";
import {usePomodoro} from "@/domain/pomodoro/hooks/use-pomodoro";
import {Badge} from "@/components/ui/badge";

export default function TasksTable({form}: { form: UseFormReturn<CreateTask> }) {
    const {setIsPlaying} = usePomodoroStore();
    const {tasks, deleteTask, redoTask, renameTask} = usePomodoro(form);

    function handleDeleteTask(id: number) {
        deleteTask(id);
        setIsPlaying(false);
    }

    function handleRedoTask(taskText: string) {
        redoTask(taskText);
        setIsPlaying(false);
    }

    const submitNewRowValue = (e: any, id: number) => {
        e.preventDefault();
        renameTask(id, e.target.task.value);
        setIsPlaying(false);
    }
    return <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Task</TableHead>
                <TableHead className={'w-max truncate'}>Duration</TableHead>
                <TableHead>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {tasks?.map((task) => (
                <TableRow key={task.id} className={cn(
                    task.name === form.getValues('task') && 'bg-gray-100'
                )}>
                    <TableCell className={'flex justify-between items-center'}>
                        <Task name={task.name}/>
                        <Popover>
                            <PopoverTrigger>
                                <Button variant="ghost" size="icon">
                                    <PencilIcon className="size-4 text-secondary-foreground/60"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className={'grid gap-1'}>
                                <TypographySmall><>Edit Task : {task.name}</>
                                </TypographySmall>
                                <form onSubmit={(e) => submitNewRowValue(e, task.id)}>
                                    <Input
                                        name="task"
                                        defaultValue={task.name}
                                        placeholder="Task"
                                        className="w-full"/>
                                </form>
                                <TypographyMuted>Press Enter to submit</TypographyMuted>
                            </PopoverContent>
                        </Popover>

                    </TableCell>
                    <TableCell>
                        <TypographySmall>{formatSecondsToMmss(task.duration)}</TypographySmall>
                    </TableCell>
                    <TableCell className={'flex gap-1 item-center justify-center'}>

                        <Button variant="ghost" size="icon" onClick={() => handleRedoTask(task.name)}>
                            <ArrowUpIcon className="w-4 h-4"/>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                            <TrashIcon className="w-4 h-4"/>
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
}

const Task = ({name}: { name: string }) => {
    const renderContent = (text: string) => {
        return text.split(" ").map((word, index) =>
            word.startsWith("#") ? (
                <Badge
                    variant="default"
                    className="rounded-lg  bg-secondary text-secondary-foreground mr-1 first:ml-4"
                    key={index}
                >
                    {word.slice(1)}
                </Badge>
            ) : (
                word + " "
            )
        );
    };

    return (
        <TypographySmall><>{renderContent(name)}</>
        </TypographySmall>
    );

}