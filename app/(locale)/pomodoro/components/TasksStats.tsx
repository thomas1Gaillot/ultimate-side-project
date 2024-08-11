'use client'
import {usePomodoro} from "@/domain/pomodoro/hooks/use-pomodoro";
import {UseFormReturn} from "react-hook-form";
import {CreateTask} from "@/domain/pomodoro/entities/Task";

const TasksStats = ({form}: { form: UseFormReturn<CreateTask> }) => {
    const {tasks, deleteTask, redoTask, renameTask} = usePomodoro(form)


    return (
        <>
            An overview of your tasks and their durations.
        </>
    );
};

export default TasksStats;

