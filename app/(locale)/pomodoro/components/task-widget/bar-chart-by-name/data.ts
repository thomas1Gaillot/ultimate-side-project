import { Task } from "@/domain/pomodoro/entities/Task";
import { formatSecondsToMmss } from "@/lib/format-seconds-to-mmss";

function generateTop5TasksName(tasks: Task[]) {
    // Sort tasks by duration in descending order
    const sortedTasks = tasks.sort((a, b) => b.duration - a.duration);

    // Get the top 5 tasks
    const top4Tasks = sortedTasks.slice(0, 4);

    // Sum the durations of the remaining tasks
    const otherTasksDuration = sortedTasks.slice(4).reduce((sum, task) => sum + task.duration, 0);

    // Create the "other" task
    const otherTask = {
        name: "Other",
        duration: otherTasksDuration,
        formattedDuration: formatSecondsToMmss(otherTasksDuration),
        fill: `hsl(var(--chart-4) / 0.2)`, // Constant lower opacity for "Other"
    };

    // Calculate fill with decreasing opacity
    const result = [
        ...top4Tasks.map((task, index) => {
            const opacity = 1 - index * 0.15; // Decreasing opacity
            return {
                name: task.name,
                duration: task.duration,
                formattedDuration: formatSecondsToMmss(task.duration),
                fill: `hsl(var(--chart-4) / ${opacity})`,
            };
        }),
        otherTask
    ];

    return result;
}

export { generateTop5TasksName };
