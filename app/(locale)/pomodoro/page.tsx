'use client'
import PomodoroWidget from "@/app/(locale)/pomodoro/components/pomodoro-widget/PomodoroWidget";
import {TypographyBlockquote, TypographyH1, TypographyLead, TypographyList} from "@/components/ui/typography";
import TaskWidget from "@/app/(locale)/pomodoro/components/task-widget";
import usePomodoroForm from "@/domain/pomodoro/hooks/use-pomodoro/use-pomodoro-form";

export default function PomodoroPage() {
    const form = usePomodoroForm()
    return (
        <div className={"flex flex-col gap-4 pb-8"}>
            <TypographyH1>
                Pomodoro Technique
            </TypographyH1>
            <TypographyLead>
                A time management technique that uses a timer to break down work into intervals, traditionally 25
                minutes in length, separated by short breaks.
            </TypographyLead>
            <div className={"flex flex-col pt-8 max-w-2xl gap-16"}>
                <PomodoroWidget form={form}/>
                <TaskWidget form={form}/>


            </div>
            <TypographyList texts={[
                "Splitting tasks into short intervals makes you create achievable goals.",
                "Taking 3 short breaks and 1 long break allows you to feel refreshed and ready to start each new task-pomodoro-widget.",
                "In two hours, you achieve 4 tasks ! That's big."
            ]}>
            </TypographyList>
            <TypographyBlockquote>
                {`"This technique makes me more productive, but also more relaxed."`}
            </TypographyBlockquote>

        </div>
    );
}
