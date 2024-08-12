import { v4 as uuidv4 } from 'uuid';

const manageTasks = (
    tasks: any[],
    setTasks: (tasks: any[]) => void,
    form: any
) => {
    const addTask = (taskName: string) => {
        const taskExists = tasks.some((task) => task.name === taskName);
        if (!taskExists) {
            setTasks([{id: uuidv4(), name: taskName, duration: 0}, ...tasks]);
        }
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    const updateTaskDuration = (duration: number) => {
        setTasks(
            tasks.map((task) =>
                task.name === form.getValues("task")
                    ? {...task, duration: task.duration + duration}
                    : task
            )
        );
    };

    const redoTask = (taskName: string) => {
        form.setValue("task", taskName)
    }


    const renameTask = (id: number, newName: string) => {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? {...task, name: newName}
                    : task
            )
        );
    }
    const retimeTask = (id: number, newDuration: number) => {
        setTasks(
            tasks.map((task) =>
                task.id === id
                    ? {...task, duration: newDuration}
                    : task
            )
        );
    }

    return {addTask, deleteTask, renameTask, updateTaskDuration,retimeTask, redoTask};
};
export default manageTasks;
