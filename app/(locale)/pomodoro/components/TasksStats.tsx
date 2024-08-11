import {TrendingUp} from "lucide-react"
import {Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis} from "recharts"
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import {usePomodoro} from "@/domain/pomodoro/hooks/use-pomodoro";
import {CreateTask, Task} from "@/domain/pomodoro/entities/Task";
import {UseFormReturn} from "react-hook-form";

// Utilisation des tâches pour générer les données du graphique
function generateChartData(tasks:Task[]) {
    return tasks.map(task => ({
        name: task.name,
        duration: task.duration,
    }));
}
const chartConfig = {
    duration: {
        label: "Duration",
        color: "hsl(var(--chart-2))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig

export function TasksStats({form}: { form: UseFormReturn<CreateTask> }) {
    const {tasks, deleteTask, redoTask, renameTask} = usePomodoro(form)

    // Générer les données du graphique à partir des tâches
    const chartData = generateChartData(tasks);

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
                    <CartesianGrid horizontal={false} />
                    <YAxis
                        dataKey="name"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        hide
                    />
                    <XAxis dataKey="duration" type="number" hide />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar
                        dataKey="duration"
                        layout="vertical"
                        fill="var(--color-duration)"
                        radius={4}
                    >
                        <LabelList
                            dataKey="month"
                            position="insideLeft"
                            offset={8}
                            className="fill-[--color-label]"
                            fontSize={12}
                        />
                        <LabelList
                            dataKey="duration"
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
