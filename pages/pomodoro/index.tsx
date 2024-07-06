import PomodoroWidget from "@/pages/pomodoro/PomodoroWidget";
import {TypographyH1, TypographyH2, TypographyLead} from "@/components/ui/typography";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Card} from "@/components/ui/card";
import CodeBlocks from "@/components/[locale]/code-blocks";
import pomodoroWidgetContent from "@/data/pomodoro-widget-index";
export default function Pomodoro() {
    return (
        <div className={"flex flex-col gap-8 pb-8"}>
            <TypographyH1>
                Pomodoro Technique
            </TypographyH1>
            <TypographyLead>
                A time management technique that uses a timer to break down work into intervals, traditionally 25
                minutes in length, separated by short breaks.
            </TypographyLead>
            <Card className={"w-full p-8"}>
                <PomodoroWidget/>
            </Card>
            <TypographyH2>
                Stack
            </TypographyH2>
            <TypographyH2>
                Architecture
            </TypographyH2>

        </div>
    );
}