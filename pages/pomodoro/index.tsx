import PomodoroWidget from "@/pages/pomodoro/PomodoroWidget";
import {TypographyBlockquote, TypographyH1, TypographyLead, TypographyList} from "@/components/ui/typography";

export default function PomodoroPage() {
    return (
        <div className={"flex flex-col gap-4 pb-8"}>
            <TypographyH1>
                Pomodoro Technique
            </TypographyH1>
            <TypographyLead>
                A time management technique that uses a timer to break down work into intervals, traditionally 25
                minutes in length, separated by short breaks.
            </TypographyLead>
            <TypographyList texts={[
                "Splitting tasks into short intervals makes you create achievable goals.",
                "Taking 3 short breaks and 1 long break allows you to feel refreshed and ready to start each new task.",
                "In two hours, you achieve 4 tasks ! That's big."
            ]}>
            </TypographyList>
            <TypographyBlockquote>
                {`"This technique makes me more productive, but also more relaxed."`}
            </TypographyBlockquote>
            <div className={"flex flex-col"}>
                <PomodoroWidget/>
            </div>
        </div>
    );
}