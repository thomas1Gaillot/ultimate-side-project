'use client'
import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Check, CheckIcon, Edit, Eye, UploadIcon} from "lucide-react"
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {useRouter} from "next/navigation";
import {useStoredDocumentsOverview} from "@/app/(locale)/poc-enostart/data/documents/use-stored-documents-overview";
import {PmoStatus} from "@/app/(locale)/poc-enostart/data/pmo-status";
import {EnedisStatus} from "@/app/(locale)/poc-enostart/data/enedis-status";
import {usePmoDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/use-pmo-document";
import {useReglementDocument} from "@/app/(locale)/poc-enostart/data-refactored/document/use-reglement-document";

export default function PmoCreationAccordionItem() {
    const pmoStatut = usePmoDocument()
    const reglementInterieur = useReglementDocument()
    const documentsOverview = useStoredDocumentsOverview()
    const router = useRouter()

    const setTab = (newTab: string) => {
        // Set the new query parameter
        router.push(`?tab=${newTab}`); // This will update the URL with ?tab=newTab
    };

   function uploadPmoStatut(){
       pmoStatut.upload()
       documentsOverview.setStatutPmo({...documentsOverview.statutPmo, status: PmoStatus.EditerLeBulletin})
       documentsOverview.setBulletin({...documentsOverview.bulletin, status: PmoStatus.EditerLeBulletin})
       documentsOverview.setAccords({...documentsOverview.accords, status: EnedisStatus.EditerLAccord})
   }

    return (
        <AccordionItem value="create-pmo">
            <AccordionTrigger
                onClick={() => setTab('create-pmo')}
                className="text-lg font-semibold">
                <div className={"flex"}>
                    1. Téléverser les statuts PMO signés
                    {pmoStatut.isCreated && <CheckIcon className="h-6 w-6 text-green-500 ml-2"/>}
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
                        <TableRow>
                            <TableCell>Statut PMO signés</TableCell>
                            <TableCell>
                                {pmoStatut.isCreated ? (
                                    <Check className="text-green-500"/>
                                ) : (
                                    <span className="text-gray-500">-</span>
                                )}
                            </TableCell>
                            <TableCell>{pmoStatut.document?.name}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        onClick={uploadPmoStatut}
                                        variant="ghost"
                                        className="text-gray-500 hover:text-gray-600 p-1">
                                        <span
                                            className={"text-xs flex items-center"}>Téléverser en .pdf <UploadIcon
                                            className="h-4 w-4 ml-2"/></span>
                                        {pmoStatut.isCreated && <span className={"text-xs flex items-center"}><Eye
                                            className="h-4 w-4"/></span>}
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Règlement intérieur (facultatif)</TableCell>
                            <TableCell>
                                {reglementInterieur.isCreated ? (
                                    <Check className="text-green-500"/>
                                ) : (
                                    <span className="text-gray-500">-</span>
                                )}
                            </TableCell>
                            <TableCell>{reglementInterieur.document?.name}</TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button
                                        onClick={() => reglementInterieur.upload()}

                                        variant="ghost"
                                        className="text-gray-500 hover:text-gray-600 p-1">
                                        <span className={"text-xs flex items-center"}>Téléverser en .pdf <UploadIcon
                                            className="h-4 w-4 ml-2"/></span>
                                        {reglementInterieur.isCreated &&
                                            <span className={"text-xs flex items-center"}><Eye
                                                className="h-4 w-4"/></span>}
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </AccordionContent>
        </AccordionItem>
    )
}