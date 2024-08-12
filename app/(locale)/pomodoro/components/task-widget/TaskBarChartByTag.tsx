import {TrendingUp} from "lucide-react"
import {Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis} from "recharts"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import {usePomodoro} from "@/domain/pomodoro/hooks/use-pomodoro";
import {CreateTask, Task} from "@/domain/pomodoro/entities/Task";
import {UseFormReturn} from "react-hook-form";
import {formatSecondsToMmss} from "@/lib/format-seconds-to-mmss";

// Utilisation des tâches pour générer les données du graphique
function generateChartData(tasks: Task[]): { tagName: string, duration: number, formattedDuration: string }[] {
    let dataByTags: { tagName: string, duration: number, formattedDuration: string }[] = [];

    tasks.forEach(task => {
        // Extract tags from the task name using a regular expression
        const tags = task.name.match(/#[a-zA-Z0-9]+/g) || [];

        tags.forEach(tag => {
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
                    formattedDuration: formatSecondsToMmss(task.duration)
                });
            }
        });
    });

    return dataByTags;
}
const chartConfig = {
    duration: {
        label: "Duration",
        color: "hsl(var(--chart-4))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig

export function TaskBarChartByTag({form}: { form: UseFormReturn<CreateTask> }) {
    const {tasks} = usePomodoro(form)

    // Générer les données du graphique à partir des tâches
    const chartData = generateChartData(tasks);
    console.log(chartData)
    return (
        <div className={"grid gap-4"}>
            <ChartContainer config={chartConfig}>
                <BarChart
                    accessibilityLayer
                    data={chartData}
                    layout="vertical"
                    margin={{
                        right: 16,
                    }}
                >
                    <CartesianGrid horizontal={false}/>
                    <YAxis
                        dataKey="tagName"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        hide
                    />
                    <XAxis dataKey="duration" type="number" hide/>
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line"/>}
                    />
                    <Bar
                        dataKey="duration"
                        layout="vertical"
                        fill="var(--color-duration)"
                        radius={4}
                    >
                        <LabelList
                            dataKey="tagName"
                            position="insideLeft"
                            offset={8}
                            className="fill-[--color-label] truncate"
                            fontSize={12}
                        />
                        <LabelList
                            dataKey="formattedDuration"
                            position="right"
                            offset={8}
                            className="fill-foreground"
                            fontSize={12}
                        />
                    </Bar>
                </BarChart>
            </ChartContainer>
            <div className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month <TrendingUp className="h-4 w-4"/>
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total task durations for the recent tasks
                </div>
            </div>
        </div>
    )
}
