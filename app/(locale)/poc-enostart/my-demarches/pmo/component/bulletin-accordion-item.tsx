'use client'
import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Check, CheckIcon, Edit, Eye, UploadIcon} from "lucide-react"
import {useDocuments, useStoredDocuments} from "@/app/(locale)/poc-enostart/data/documents/use-documents";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {useRouter} from "next/navigation";
import {PmoStatus} from "@/app/(locale)/poc-enostart/data/pmo-status";
import {useStoredDocumentsOverview} from "@/app/(locale)/poc-enostart/data/documents/use-stored-documents-overview";

export default function BulletinAccordionItem() {
    const {bulletin, isPmoCreated, isBulletinEdited} = useDocuments()
    const {setBulletinDocument} = useStoredDocuments()
    const documentsOverview = useStoredDocumentsOverview()

    const router = useRouter()

    const setTab = (newTab: string) => {
        // Set the new query parameter
        router.push(`?tab=${newTab}`); // This will update the URL with ?tab=newTab
    };

    function actionFor(action: string) {
        if (action === "Éditer le fichier") {
            documentsOverview.setStatutPmo({...documentsOverview.statutPmo, status : PmoStatus.EnvoyerLeBulletin})
            documentsOverview.setBulletin({...documentsOverview.bulletin, status : PmoStatus.EnvoyerLeBulletin})

            setBulletinDocument({
                name: "Bulletin d'adhésion",
                status: "check",
                document: "bulletin_adhesion.pdf",
                actions: ["Éditer le fichier", "Pré-Visualiser"]
            })
        }
    }

    return (
        <AccordionItem value="create-bulletin">
            <AccordionTrigger
                onClick={() => setTab('create-bulletin')}

                className="text-lg font-semibold">
                <div className={"flex"}>
                    {"2. J'édite les bulletins d'adhésion"}
                    {isBulletinEdited && <CheckIcon className="h-6 w-6 text-green-500 ml-2"/>}
                </div>
                </AccordionTrigger>
            <AccordionContent className={"p-8 gap-4 grid"}>
                {isPmoCreated ? <Table>
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableHead className="w-1/4">NOM</TableHead>
                                <TableHead className="w-1/4">STATUT</TableHead>
                                <TableHead className="w-1/4">DOCUMENT</TableHead>
                                <TableHead className="w-1/4">ACTIONS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>{bulletin.name}</TableCell>
                                <TableCell>
                                    {bulletin.status === "check" ? (
                                        <Check className="text-green-500"/>
                                    ) : (
                                        <span className="text-gray-500">{bulletin.status}</span>
                                    )}
                                </TableCell>
                                <TableCell>{bulletin.document}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        {bulletin.actions.map((action, actionIndex) => (
                                            <Button
                                                onClick={() => actionFor(action)}
                                                key={actionIndex} variant="ghost"
                                                className="text-gray-500 hover:text-gray-600 p-1">
                                                {action === "Éditer le fichier" ?
                                                    <span className={"text-xs flex items-center"}>Editer<Edit
                                                        className="h-4 w-4 ml-2"/></span> :
                                                    action === "Téléverser en pdf" ?
                                                        <span
                                                            className={"text-xs flex items-center"}>{"Téléverser en .pdf"}
                                                            <UploadIcon
                                                                className="h-4 w-4 ml-2"/></span> :
                                                        <span className={"text-xs flex items-center"}><Eye
                                                            className="h-4 w-4"/></span>}
                                                <span className="sr-only">{action}</span>
                                            </Button>
                                        ))}
                                    </div>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table> :
                    <span className={" text-sm"}>
                {"Vous devez d'abord créer votre association PMO pour éditer votre bulletin d'adhésion"}
            </span>}
            </AccordionContent>
        </AccordionItem>
    )
}