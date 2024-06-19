import Link from "next/link";
import {badgeVariants} from "@/components/ui/badge";
import LetterPullup from "@/components/magicui/letter-pullup";

export default function CentralizedApp() {
    return (
        <div className="container py-24 lg:py-32">
            {/* Announcement Banner */}
            <div className="flex flex-col items-center gap-8 justify-center">
                <LetterPullup className={"italic  "} words={"Professional already made the work"} delay={0.04}/>
                <MadeWithZodBadges/>
            </div>
        </div>
    );
}


function MadeWithZodBadges() {
    return (
        <div className={"flex items-center gap-2"}>
            <p className={' text-xs font-light text-gray-500'}>made with</p>
            <Link target={'_blank'} href={'https://zod.dev/'}
                  className={badgeVariants({variant: "outline"})}>zod</Link>
            <Link target={'_blank'} href={'https://ui.shadcn.com'}
                  className={badgeVariants({variant: "outline"})}>shadcn-ui</Link>
            <Link target={'_blank'} href={'https://react-hook-form.com/'}
                  className={badgeVariants({variant: "outline"})}>react-hook-form</Link>
        </div>
    );
}