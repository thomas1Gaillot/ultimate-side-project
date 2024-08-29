'use client'
import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Check, Edit, Eye, UploadIcon} from "lucide-react"
import {useDocuments, useStoredDocuments} from "@/app/(locale)/poc-enostart/data/use-documents";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

export default function Bulletin() {
    const {bulletin, isPmoCreated} = useDocuments()
    const {setBulletinDocument} = useStoredDocuments()

    function actionFor(action: string) {
        if (action === "Éditer le fichier") {
            setBulletinDocument({
                name: "Bulletin d'adhésion",
                status: "check",
                document: "bulletin_adhesion.pdf",
                actions: ["Éditer le fichier", "Pré-Visualiser"]
            })
        }
    }

    return (
        <Accordion type="single" collapsible className="w-full grid gap-4 max-w-4xl">
            <AccordionItem value="prestation">
                <AccordionTrigger
                    className="text-lg font-semibold">{"2. J'édite les bulletins d'adhésion"}</AccordionTrigger>
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
        </Accordion>
    )
}