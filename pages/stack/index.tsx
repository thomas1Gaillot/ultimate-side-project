import {TypographyH1, TypographyP} from "@/components/ui/typography";
import StackWidget from "@/pages/stack/StackWidget";

export default function Stack() {
    return (
        <div>
            <TypographyH1>
                Stack
            </TypographyH1>
            <TypographyP>
                Here is the stack I used to build this website.
            </TypographyP>
            <StackWidget/>
        </div>
    )
}