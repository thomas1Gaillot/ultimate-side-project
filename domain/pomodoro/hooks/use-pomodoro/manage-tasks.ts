import {CreateTask} from "@/domain/pomodoro/entities/Task";

const manageTasks = (
    tasks: any[],
    setTasks: (tasks: any[]) => void,
    formValues: CreateTask
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
                task.name === formValues.task
                    ? { ...task, duration: task.duration + duration }
                    : task
            )
        );
    };

    return { addTask, deleteTask, updateTaskDuration };
};
export default manageTasks;
