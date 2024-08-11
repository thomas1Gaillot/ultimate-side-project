import {CreateTask} from "@/domain/pomodoro/entities/Task";

const manageTasks = (
    tasks: any[],
    setTasks: (tasks: any[]) => void,
    form: any
) => {
    const addTask = (taskName: string) => {
        const taskExists = tasks.some((task) => task.name === taskName);
        if (!taskExists) {
            setTasks([{ id: Math.random(), name: taskName, duration: 0 }, ...tasks]);
        }
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const updateTaskDuration = (duration: number) => {
        setTasks(
            tasks.map((task) =>
                task.name === form.getValues("task")
                    ? { ...task, duration: task.duration + duration }
                    : task
            )
        );
    };

    const redoTask = (taskName: string) => {
        form.setValue("task", taskName)
    }
    return { addTask, deleteTask, updateTaskDuration, redoTask };
};
export default manageTasks;
