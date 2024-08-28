'use client'
import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Check, Edit, Eye, UploadIcon} from "lucide-react"
import {useDocuments, useStoredDocuments} from "@/app/(locale)/poc-enostart/data/use-documents";

export default function AccordsParticipation() {
    const { isPmoCreated} = useDocuments()
    const {setAccordsParticipation, accordsParticipation} = useStoredDocuments()
    function actionFor(action: string) {
        if (action === "Éditer le fichier" ) {
            setAccordsParticipation({
                name: "Accords de participation",
                status: "check",
                document: "accords_participation.pdf",
                actions: ["Éditer le fichier", "Visualiser"]
            })
        }
    }

    return (
        <div className="w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">2. J'édite les accords de participation</h2>
            </div>
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
                            <TableCell>{accordsParticipation.name}</TableCell>
                            <TableCell>
                                {accordsParticipation.status === "check" ? (
                                    <Check className="text-green-500"/>
                                ) : (
                                    <span className="text-gray-500">{accordsParticipation.status}</span>
                                )}
                            </TableCell>
                            <TableCell>{accordsParticipation.document}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    {accordsParticipation.actions.map((action, actionIndex) => (
                                        <Button
                                            onClick={() => actionFor(action)}
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

                    </TableBody>
                </Table>:
                <span className={" text-sm"}>
                Vous devez d'abord créer votre association PMO pour éditer votre accordsParticipation d'adhésion
            </span> }
        </div>
    )
}