import {Button} from "@/components/ui/button";
import {FileWarningIcon, XIcon} from "lucide-react";
import {useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useDocuments} from "@/app/(locale)/poc-enostart/data/use-documents";

export default function WarningDemarchesBanner() {
    const {
        isPmoCreated,
        isBulletinEdited,
        isAccordsParticipationEdited,
        isDeclarationSent,
        hasSalesContract
    } = useDocuments()
    const pathname = usePathname();
    const [close, setClose] = useState(false)
    const router = useRouter()
    const allDemarchesAnticipated = isPmoCreated && isBulletinEdited && isAccordsParticipationEdited && isDeclarationSent &&  hasSalesContract
    if(close || pathname?.includes('my-demarches/') || allDemarchesAnticipated) return null

    return <div className={"w-full rounded flex justify-between items-center bg-amber-50 py-1 my-4 px-4"}>
        <Button
            onClick={() => router.push('/poc-enostart/my-demarches/overview')}
            variant={'link'} className={"flex text-sm font-normal  text-gray-700  "}>
            <FileWarningIcon className={"size-4 mr-4 text-amber-600"}/>
            {"J'ai des démarches à anticiper"}
        </Button>
        <Button onClick={() => setClose(true)} variant={'link'}>
            <XIcon className={"size-4 text-amber-700"}/>
        </Button>
    </div>
}