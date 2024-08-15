'use client'
import {Button} from "@/components/ui/button";
import {ClipboardIcon} from "lucide-react";
import {formatSecondsToMmss} from "@/lib/format-seconds-to-mmss";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {usePomodoro} from "@/domain/pomodoro/hooks/use-pomodoro";
import {useCopyToClipboard} from "@uidotdev/usehooks";
import {toast} from "@/components/hooks/use-toast";
import {UseFormReturn} from "react-hook-form";
import {CreateTask} from "@/domain/pomodoro/entities/Task";
import TasksTable from "@/app/(locale)/pomodoro/components/task-widget/TasksTable";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {PieChartByTag} from "@/app/(locale)/pomodoro/components/task-widget/pie-chart-by-tag";
import {TasksBarChartByName} from "@/app/(locale)/pomodoro/components/task-widget/bar-chart-by-name";

const TaskWidget = ({form}: { form: UseFormReturn<CreateTask> }) => {
    const {tasks} = usePomodoro(form)
    const [copiedText, copyToClipboard] = useCopyToClipboard();


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
                <Tabs defaultValue="list">
                    <CardHeader>
                        <CardTitle className={'w-full justify-between flex items-end'}>
                            Pomodoro Tasks
                            <TabsList className={"relative bottom-4 left-4"}>
                                <TabsTrigger value="list">
                                    <p className={"text-xs"}>List</p>
                                </TabsTrigger>
                                <TabsTrigger value="stats">
                                    <p className={"text-xs"}>Charts</p>

                                </TabsTrigger>
                            </TabsList>
                        </CardTitle>
                        <CardDescription className={'flex w-full justify-between'}>
                            A list of tasks with their durations for your Pomodoro sessions.
                            <Button onClick={copy} variant="outline" size={'sm'}>
                                <ClipboardIcon className="w-4 h-4 mr-2"/>
                                Copy
                            </Button></CardDescription>
                    </CardHeader>
                    <CardContent>


                        <TabsContent value="list">
                            <TasksTable form={form}/>
                        </TabsContent>
                        <TabsContent value="stats">
                            <Tabs defaultValue={'by-name'}>
                                <TabsList className={"relative bottom-4 left-4"}>
                                    <TabsTrigger value="by-name">
                                        <p className={"text-xs"}>by Name</p>
                                    </TabsTrigger>
                                    <TabsTrigger value="by-tags">
                                        <p className={"text-xs"}>by Tags</p>

                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value={'by-name'}>
                                    <TasksBarChartByName form={form}/>
                                </TabsContent>
                                <TabsContent value={'by-tags'}>
                                    <PieChartByTag form={form}/>
                                </TabsContent>
                            </Tabs>
                        </TabsContent>


                    </CardContent>
                </Tabs>
            </Card>
        </>
    );
};

export default TaskWidget;


