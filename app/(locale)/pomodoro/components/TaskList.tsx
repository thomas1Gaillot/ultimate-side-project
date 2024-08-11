'use client'
import {TypographyMuted, TypographySmall} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import {ArrowUpIcon, ClipboardIcon, PencilIcon, TrashIcon} from "lucide-react";
import {formatSecondsToMmss} from "@/lib/format-seconds-to-mmss";
import {cn} from "@/lib/utils";
import usePomodoroStore from "@/domain/pomodoro/stores";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {usePomodoro} from "@/domain/pomodoro/hooks/use-pomodoro";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useCopyToClipboard} from "@uidotdev/usehooks";
import {toast} from "@/components/hooks/use-toast";
import {UseFormReturn} from "react-hook-form";
import {CreateTask} from "@/domain/pomodoro/entities/Task";
import {Badge} from "@/components/ui/badge";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Input} from "@/components/ui/input";

const TaskList = ({form}: { form: UseFormReturn<CreateTask> }) => {
    const {tasks, deleteTask, redoTask, renameTask} = usePomodoro(form)
    const [copiedText, copyToClipboard] = useCopyToClipboard();

    const {setIsPlaying} = usePomodoroStore();

    function handleDeleteTask(id: number) {
        deleteTask(id);
        setIsPlaying(false);
    }

    function handleRedoTask(taskText: string) {
        redoTask(taskText);
        setIsPlaying(false);
    }


    function copy() {
        let tableText = "Task        | Duration (s) | Action\n";
        tableText += "------------|--------------|---------\n";

        tasks?.forEach((task) => {
            tableText += `${task.name.padEnd(12)}| ${formatSecondsToMmss(task.duration).padEnd(13)}| Delete\n`;
        });

        copyToClipboard(tableText)
        toast({
            description: `Copied ${tasks.length} rows to clipboard 🎉`
        })
    }

    const submitNewRowValue = (e:any, id:number) => {
        e.preventDefault();
        renameTask(id, e.target.task.value);
        setIsPlaying(false);
    }
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>
                        Pomodoro Tasks
                    </CardTitle>
                    <CardDescription className={'flex w-full justify-between'}>
                        A list of tasks with their durations for your Pomodoro sessions.
                        <Button onClick={copy} variant="outline" size={'sm'}>
                            <ClipboardIcon className="w-4 h-4 mr-2"/>
                            Copy
                        </Button></CardDescription>
                </CardHeader>
                <CardContent>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Task</TableHead>
                                <TableHead>Duration (s)</TableHead>
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
                                                    <PencilIcon className="size-4"/>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className={'grid gap-1'}>
                                                <TypographySmall>Edit Task : {task.name}</TypographySmall>
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
                                    <TableCell>

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
                </CardContent>
            </Card>
        </>
    );
};

export default TaskList;

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
