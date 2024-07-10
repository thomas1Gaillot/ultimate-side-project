import {TypographyH1, TypographyLead} from "@/components/ui/typography";
import StackWidget from "@/app/(locale)/stack/StackWidget";

export default function Stack() {
    return (
        <div className={'flex flex-col gap-4 pb-8'}>
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