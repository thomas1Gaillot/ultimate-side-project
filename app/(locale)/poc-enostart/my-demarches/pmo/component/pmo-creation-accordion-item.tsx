'use client'
import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Check, CheckIcon, Edit, Eye, UploadIcon} from "lucide-react"
import PmoCreationBanner from "@/app/(locale)/poc-enostart/my-demarches/pmo/component/pmo-creation-banner";
import {useDocuments, useStoredDocuments} from "@/app/(locale)/poc-enostart/data/use-documents";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";

export default function PmoCreationAccordionItem() {
    const {statutPmo, reglementInterieur, isPmoCreated} = useDocuments()
    const {setStatutPmo, setReglementInterieur} = useStoredDocuments()

    function actionFor(name: string, action: string) {
        if (action === "Téléverser en pdf") {
            if (name === "Statut PMO") {
                setStatutPmo({
                    name: "Statut PMO",
                    status: "check",
                    document: "Statut PMO.pdf",
                    actions: ["Visualiser"]
                })
            }
            if (name === "Règlement intérieur (facultatif)") {
                setReglementInterieur({
                    name: "Règlement intérieur (facultatif)",
                    status: "check",
                    document: "Règlement intérieur.pdf",
                    actions: ["Visualiser"]
                })
            }
        }
    }

    return (
        <AccordionItem value="pmo-creation">
            <AccordionTrigger className="text-lg font-semibold">
                <div className={"flex"}>
                    1. Je crée mon association PMO
                    {isPmoCreated && <CheckIcon className="h-6 w-6 text-green-500 ml-2"/>}
                </div>

                </AccordionTrigger>
            <AccordionContent className={"p-8 gap-4 grid"}>
                <Table>
                <TableHeader>
                        <TableRow className="bg-gray-100">
                            <TableHead className="w-1/4">NOM</TableHead>
                            <TableHead className="w-1/4">STATUT</TableHead>
                            <TableHead className="w-1/4">DOCUMENT</TableHead>
                            <TableHead className="w-1/4">ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[statutPmo, reglementInterieur].map((doc, index) => (
                            <TableRow key={index}>
                                <TableCell>{doc.name}</TableCell>
                                <TableCell>
                                    {doc.status === "check" ? (
                                        <Check className="text-green-500"/>
                                    ) : (
                                        <span className="text-gray-500">{doc.status}</span>
                                    )}
                                </TableCell>
                                <TableCell>{doc.document}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        {doc.actions.map((action, actionIndex) => (
                                            <Button
                                                onClick={() => actionFor(doc.name, action)}
                                                key={actionIndex} variant="ghost"
                                                className="text-gray-500 hover:text-gray-600 p-1">
                                                {action === "Éditer le fichier" ?
                                                    <span className={"text-xs flex items-center"}>Editer<Edit
                                                        className="h-4 w-4 ml-2"/></span> :
                                                    action === "Téléverser en pdf" ?
                                                        <span
                                                            className={"text-xs flex items-center"}>Téléverser en .pdf <UploadIcon
                                                            className="h-4 w-4 ml-2"/></span> :
                                                        <span className={"text-xs flex items-center"}><Eye
                                                            className="h-4 w-4"/></span>}
                                                <span className="sr-only">{action}</span>
                                            </Button>
                                        ))}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </AccordionContent>
        </AccordionItem>
    )
}