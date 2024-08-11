'use client'
import {TypographySmall} from "@/components/ui/typography";
import {Button} from "@/components/ui/button";
import {ClipboardIcon, TrashIcon} from "lucide-react";
import {formatSecondsToMmss} from "@/lib/format-seconds-to-mmss";
import {cn} from "@/lib/utils";
import index from "@/domain/pomodoro/stores";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {usePomodoro} from "@/domain/pomodoro/hooks/use-pomodoro";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useCopyToClipboard} from "@uidotdev/usehooks";
import {toast} from "@/components/hooks/use-toast";

const TaskList = () => {
    const {
        tasks, form, deleteTask,
    } = usePomodoro();
    const [copiedText, copyToClipboard] = useCopyToClipboard();

    const {setIsPlaying} = index();

    function handleDeleteTask(id: number) {
        deleteTask(id);
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
                                    <TableCell>
                                        <TypographySmall>{task.name}</TypographySmall>
                                    </TableCell>
                                    <TableCell>
                                        <TypographySmall>{formatSecondsToMmss(task.duration)}</TypographySmall>
                                    </TableCell>
                                    <TableCell>
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
