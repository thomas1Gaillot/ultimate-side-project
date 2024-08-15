import {ChartConfig} from "@/components/ui/chart";

const chartConfig = {
    duration: {
        label: "Duration",
        color: "hsl(var(--chart-2))",
    },
    label: {
        color: "hsl(var(--background))",
    },
} satisfies ChartConfig;

function truncateText(text:string, maxLength:number) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}

export {chartConfig, truncateText}