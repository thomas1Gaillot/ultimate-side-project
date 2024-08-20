import React from "react";
import TaskCard from "./TaskCard";
import { UseFormReturn } from "react-hook-form";
import usePomodoroStore from "@/domain/pomodoro/stores";
import { usePomodoro } from "@/domain/pomodoro/hooks/use-pomodoro";
import { CreateTask } from "@/domain/pomodoro/entities/Task";

export default function TasksList({
                                      form
                                  }: {
    form: UseFormReturn<CreateTask>;
}) {
    const { setIsPlaying } = usePomodoroStore();
    const { tasks, deleteTask, redoTask, retimeAndRenameTask } = usePomodoro(form);

    function handleDeleteTask(id: number) {
        deleteTask(id);
        setIsPlaying(false);
    }

    function handleRedoTask(taskName: string) {
        redoTask(taskName);
        setIsPlaying(false);
    }


    const handleRetimeAndRenameTask = (id: number, newName : string, newDuration: number) => {
        retimeAndRenameTask(id, newName, newDuration);
        setIsPlaying(false);
    };

    return (
        <div className="grid grid-cols-1 gap-4">
            {tasks?.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    form={form}
                    onDelete={handleDeleteTask}
                    onRedo={handleRedoTask}
                    onRenameAndRetime={handleRetimeAndRenameTask}
                />
            ))}
        </div>
    );
}
