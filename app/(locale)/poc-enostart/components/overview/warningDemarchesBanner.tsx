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

        return (
            <div className="bg-yellow-50 my-4 border border-yellow-200 text-gray-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-white" role="alert" aria-labelledby="hs-actions-label">
                <div className="flex">
                    <div className="shrink-0">
                        <FileWarningIcon className="shrink-0 size-4 mt-1" />
                    </div>
                    <div className="ms-3">
                        <h3 id="hs-actions-label" className="font-semibold">
                            {"J'ai des démarches à anticiper"}
                        </h3>
                        <div className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                            {"Pour créer une opération d'autoconsomation collective, vous devez anticiper certaines démarches. Mon énergie collective vous accompagne dans ces démarches."}
                        </div>
                        <div className="mt-4">
                            <div className="flex gap-x-3">
                                <button
                                    type="button"
                                    onClick={() => router.push('/poc-enostart/my-demarches/overview')}
                                    className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-yellow-600 hover:text-yellow-800 focus:outline-none focus:text-yellow-800 disabled:opacity-50 disabled:pointer-events-none dark:text-yellow-500 dark:hover:text-yellow-400 dark:focus:text-yellow-400"
                                >
                                    Consulter mes démarches
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
}