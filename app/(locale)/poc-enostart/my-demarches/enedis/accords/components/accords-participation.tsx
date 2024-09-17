'use client'
import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Check, CheckIcon, Edit} from "lucide-react"
import {useStoredDocumentsOverview} from "@/app/(locale)/poc-enostart/data/documents/use-stored-documents-overview";
import {EnedisStatus} from "@/app/(locale)/poc-enostart/data/enedis-status";
import {usePmoDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/use-pmo-document";
import {useAccordsDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/use-accords-document";

export default function AccordsParticipation() {
    const pmoStatut = usePmoDocument()
    const accords = useAccordsDocument()
    const documentsOverview = useStoredDocumentsOverview()

    function editAccords() {
        accords.upload()
        documentsOverview.setAccords({...documentsOverview.accords, status: EnedisStatus.EnvoyerLAccord})
    }

    return (
        <>
            <div className={"flex text-lg font-semibold mt-8"}>
                {"J'édite les accords de participation"}
                {accords.isCreated && <CheckIcon className="h-6 w-6 text-green-500 ml-2"/>}
            </div>
            <div className={"p-4 gap-4 grid"}>
                {pmoStatut.isCreated ? <Table>
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
                                <TableCell>Accords de participation</TableCell>
                                <TableCell>
                                    {accords.isCreated ? (
                                        <Check className="text-green-500"/>
                                    ) : (
                                        <span className="text-gray-500">-</span>
                                    )}
                                </TableCell>
                                <TableCell>{accords.accords?.name}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-2">
                                        <Button
                                            onClick={editAccords} variant="ghost"
                                            className="text-gray-500 hover:text-gray-600 p-1">
                                               <span className={"text-xs flex items-center"}>Editer<Edit
                                                   className="h-4 w-4 ml-2"/></span>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table> :
                    <span className={" text-sm"}>
                {"Vous devez d'abord créer votre association PMO pour éditer vos accords de participation"}
            </span>}
            </div>
        </>
    )
}