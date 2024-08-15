import { Task } from "@/domain/pomodoro/entities/Task";
import { formatSecondsToMmss } from "@/lib/format-seconds-to-mmss";

function generateTop5TasksTag(tasks: Task[]): {
    tagName: string,
    duration: number,
    formattedDuration: string,
    fill: string
}[] {
    // Create a map to accumulate durations by tag
    let dataByTags: { tagName: string, duration: number, formattedDuration: string, fill: string }[] = [];

    tasks.forEach((task) => {
        // Extract tags from the task name using a regular expression
        const tags = task.name.match(/#[a-zA-Z0-9]+/g) || [];

        tags.forEach((tag) => {
            // Find the tag in dataByTags
            const tagData = dataByTags.find(data => data.tagName === tag);

            if (tagData) {
                // If the tag already exists, add the task duration to the existing tag duration
                tagData.duration += task.duration;
                tagData.formattedDuration = formatSecondsToMmss(tagData.duration); // Update the formatted duration
            } else {
                // If the tag does not exist, create a new entry in dataByTags
                dataByTags.push({
                    tagName: tag,
                    duration: task.duration,
                    formattedDuration: formatSecondsToMmss(task.duration),
                    fill: '' // Placeholder for fill, will be updated after sorting
                });
            }
        });
    });

    // Sort tags by duration in descending order
    dataByTags.sort((a, b) => b.duration - a.duration);

    // Set fill with decreasing opacity for the top 4 tags
    dataByTags.forEach((tag, index) => {
        const opacity = 1 - index * 0.2; // Decreasing opacity by 0.2 for each step
        tag.fill = `hsl(var(--chart-4) / ${opacity})`;
    });

    // Get the top 4 tags
    const top4Tags = dataByTags.slice(0, 4);

    // Sum the durations of the remaining tags
    const otherTagsDuration = dataByTags.slice(4).reduce((sum, tag) => sum + tag.duration, 0);

    // Create the "Other" tag
    const otherTag = {
        tagName: "Other",
        duration: otherTagsDuration,
        formattedDuration: formatSecondsToMmss(otherTagsDuration),
        fill: `hsl(var(--chart-4) / 0.2)`, // Constant lower opacity for "Other"
    };

    // Combine top 4 tags and the "Other" tag
    const result = [...top4Tags, otherTag];

    return result;
}

export { generateTop5TasksTag };
