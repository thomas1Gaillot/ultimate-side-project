import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import usePomodoroStore from "@/hooks/usePomodoroStore";

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

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: formValues,
    });

    const addTask = (taskName: string) => {
        const taskExists = tasks.some((task) => task.name === taskName);
        if (!taskExists) {
            setTasks([
                ...tasks,
                {
                    id: Math.random(),
                    name: taskName,
                    duration: 0,
                },
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

    form.watch((values) => {
        if (!values.task) return;
        const newValues = {
            task: values.task
        }
        setFormValues(newValues);
    });

    return {
        tasks,
        form,
        addTask,
        deleteTask,
        updateTaskDuration,
    };
};
