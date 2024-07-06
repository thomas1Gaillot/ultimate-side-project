import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePomodoroStats } from "@/hooks/usePomodoroStats";

const FormSchema = z.object({
    task: z.string().min(2, {
        message: "Task is required.",
    }),
});

type Task = {
    id: number;
    name: string;
    duration: number;
};

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            task: "",
        },
    });

    const addTask = (taskName: string) => {
        const taskExists = tasks.some((task) => task.name === taskName);
        if (!taskExists) {
            setTasks((prevTasks) => [
                ...prevTasks,
                {
                    id: Math.random(),
                    name: taskName,
                    duration: 0,
                },
            ]);
        }
    };

    const deleteTask = (id: number) => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    };

    const updateTaskDuration = (duration: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => {
                if (task.name === form.getValues("task")) {
                    return {
                        ...task,
                        duration: task.duration + duration,
                    };
                }
                return task;
            })
        );
    };

    return {
        tasks,
        form,
        addTask,
        deleteTask,
        updateTaskDuration,
    };
};
