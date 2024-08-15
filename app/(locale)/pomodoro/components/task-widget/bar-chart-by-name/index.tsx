import {TrendingUp} from "lucide-react";
import {Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis} from "recharts";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {usePomodoro} from "@/domain/pomodoro/hooks/use-pomodoro";
import {CreateTask} from "@/domain/pomodoro/entities/Task";
import {UseFormReturn} from "react-hook-form";
import {chartConfig, truncateText} from "@/app/(locale)/pomodoro/components/task-widget/bar-chart-by-name/chart-config";
import {generateTop5TasksName} from "@/app/(locale)/pomodoro/components/task-widget/bar-chart-by-name/data";


export function TasksBarChartByName({form}: { form: UseFormReturn<CreateTask> }) {
    const {tasks} = usePomodoro(form);

    // Generate chart data from tasks
    const chartData = generateTop5TasksName(tasks);

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
                        dataKey="name"
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
                            dataKey="name"
                            position="insideLeft"
                            offset={8}
                            className="fill-[--color-label] "
                            fontSize={12}
                            formatter={(value: string) => truncateText(value, 30)} // Truncate within LabelList
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
    );
}
