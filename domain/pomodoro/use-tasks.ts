import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import usePomodoroStore from "@/domain/pomodoro/use-pomodoro-store";
import {useEffect} from "react";

const FormSchema = z.object({
    task: z.string().min(2, {
        message: "Task is required.",
    }),
});


/**
 * Custom hook to manage the tasks logic
 **/

export const useTasks = () => {
    const {tasks, setTasks, formValues, setFormValues} = usePomodoroStore();
    console.log(tasks, formValues)
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: formValues,
    });

    form.watch((values) => {
        if (!values.task) return;
        const newValues = {
            task: values.task
        }
        setFormValues(newValues);
    });


    const addTask = (taskName: string) => {
        const taskExists = tasks.some((task) => task.name === taskName);
        if (!taskExists) {
            setTasks([
                {
                    id: Math.random(),
                    name: taskName,
                    duration: 0,
                },
                ...tasks,
            ]);
        }
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const updateTaskDuration = (duration: number) => {
        setTasks(tasks.map((task) => {
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

    const handlePhaseChange = (type: string) => {
        switch (type) {
            case 'work':
                form.setValue("task", "new task");
                break;
            case 'break':
                form.setValue("task", "5 min break");
                break;
            case 'longBreak':
                form.setValue("task", "15 min break");
                break;
            default:
                form.setValue("task", "");
        }
    };



    return {
        tasks,
        form,
        addTask,
        deleteTask,
        updateTaskDuration,
        handlePhaseChange
    };
};
