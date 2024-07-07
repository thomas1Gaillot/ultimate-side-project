import {TypographyH1, TypographyLarge, TypographyLead, TypographyP} from "@/components/ui/typography";
import StackWidget from "@/pages/stack/StackWidget";

export default function Stack() {
    return (
        <div className={'flex flex-col gap-8 pb-8'}>
            <TypographyH1>
                Stack
            </TypographyH1>
            <TypographyLead>
                Here is the stack I used to build this website.
            </TypographyLead>
            <StackWidget/>
        </div>
    )
}