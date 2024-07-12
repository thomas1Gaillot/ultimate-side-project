import PomodoroWidget from "@/app/(locale)/pomodoro/PomodoroWidget";
import {TypographyBlockquote, TypographyH1, TypographyLead, TypographyList} from "@/components/ui/typography";

export default function ArticleEditor() {
    return (
        <div className={"flex flex-col gap-4 pb-8"}>
            <TypographyH1>
                Article Editor
            </TypographyH1>
            <TypographyLead>
                Create and edit articles with ease by giving an .md file.
            </TypographyLead>
            <div className={"flex flex-col pt-8"}>
                Editor Widget
            </div>
        </div>
    );
}