import {LabelList, Pie, PieChart} from "recharts";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {usePomodoro} from "@/domain/pomodoro/hooks/use-pomodoro";
import {CreateTask, Task} from "@/domain/pomodoro/entities/Task";
import {UseFormReturn} from "react-hook-form";
import {formatSecondsToMmss} from "@/lib/format-seconds-to-mmss";
import {generateTop5TasksTag} from "@/app/(locale)/pomodoro/components/task-widget/pie-chart-by-tag/data";



const chartConfig = {
    duration: {
        label: "Duration",
        color: "hsl(var(--chart-4))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig;

export function PieChartByTag({form}: { form: UseFormReturn<CreateTask> }) {
    const {tasks} = usePomodoro(form);

    // Generate chart data from tasks
    const chartData = generateTop5TasksTag(tasks);

    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
            <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                    data={chartData}
                    dataKey="duration"
                    nameKey="tagName"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    label={({ name }: { name: string}) => `${name}`}
                />
            </PieChart>
        </ChartContainer>

    );
}
