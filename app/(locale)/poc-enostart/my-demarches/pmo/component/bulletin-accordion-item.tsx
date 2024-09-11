'use client'
import {Button} from "@/components/ui/button"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table"
import {Check, CheckIcon, Edit, Eye} from "lucide-react"
import {useDocuments, useStoredDocuments} from "@/app/(locale)/poc-enostart/data/documents/use-documents";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {useRouter} from "next/navigation";
import {PmoStatus} from "@/app/(locale)/poc-enostart/data/pmo-status";
import {useStoredDocumentsOverview} from "@/app/(locale)/poc-enostart/data/documents/use-stored-documents-overview";
import {useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot} from "@/components/ui/input-otp";
import {Switch} from "@/components/ui/switch";

export default function BulletinAccordionItem() {
    const {bulletin, isPmoCreated, isBulletinEdited} = useDocuments()
    const {setBulletinDocument} = useStoredDocuments()
    const documentsOverview = useStoredDocumentsOverview()
    const router = useRouter()

    const setTab = (newTab: string) => {
        // Set the new query parameter
        router.push(`?tab=${newTab}`); // This will update the URL with ?tab=newTab
    };

    function sendForm() {
        documentsOverview.setStatutPmo({...documentsOverview.statutPmo, status: PmoStatus.EnvoyerLeBulletin})
        documentsOverview.setBulletin({...documentsOverview.bulletin, status: PmoStatus.EnvoyerLeBulletin})

        setBulletinDocument({
            name: "Bulletin d'adhésion",
            status: "check",
            document: "bulletin_adhesion.pdf",
            actions: ["Éditer le fichier", "Pré-Visualiser"]
        })
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
                                        <EditBulletinDialog sendForm={sendForm}/>
                                        <Button
                                            variant="ghost"
                                            className="text-gray-500 hover:text-gray-600 p-1">
                                            <span className={"text-xs flex items-center"}><Eye
                                                className="h-4 w-4"/></span>
                                        </Button>
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

const EditBulletinDialog = ({sendForm}: { sendForm(): void }) => {
    const [openModal, setOpenModal] = useState(false)
    const [hasCotisation, setHasCotisation] = useState(false)

    function sendAndClose() {
        sendForm()
        setOpenModal(false)
    }

    return <Dialog open={openModal}
                   onOpenChange={() => setOpenModal(!openModal)}>
        <DialogTrigger asChild>
            <Button
                variant="ghost" className="text-gray-500 hover:text-gray-600 p-1">

                    <span className={"text-xs flex items-center"}>Editer<Edit
                        className="h-4 w-4 ml-2"/></span>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Informations PMO</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
                <div className={"grid grid-cols-2 gap-4"}>
                    <div className="space-y-2">
                        <label htmlFor="association-name">{"Nom de l'association"}</label>
                        <Input id="association-name" required/>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="association-email">{"Email de l'association"}</label>
                        <Input id="association-email" type="email" required/>
                    </div>
                </div>
                <div className="space-y-2">
                    <label htmlFor="rna-number">Numéro RNA</label>
                    <InputOTP maxLength={10} value={'W'}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0}/>
                            <InputOTPSeparator/>
                            <InputOTPSlot index={1}/>
                            <InputOTPSlot index={2}/>
                            <InputOTPSlot index={3}/>
                            <InputOTPSeparator/>
                            <InputOTPSlot index={4}/>
                            <InputOTPSlot index={5}/>
                            <InputOTPSlot index={6}/>
                            <InputOTPSeparator/>
                            <InputOTPSlot index={7}/>
                            <InputOTPSlot index={8}/>
                            <InputOTPSlot index={9}/>
                        </InputOTPGroup>
                    </InputOTP>
                </div>
                <div className={"grid grid-cols-2 gap-4"}>
                    <div className="space-y-2">
                        <label htmlFor="address">Adresse du siège social</label>
                        <Select>
                            <SelectTrigger id="address">
                                <SelectValue placeholder="Sélectionnez une adresse"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="address1">Adresse 1</SelectItem>
                                <SelectItem value="address2">Adresse 2</SelectItem>
                                <SelectItem value="address3">Adresse 3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="operation">{"Identification de l'opération"}</label>
                        <Input id="operation" defaultValue="Nom du projet ou adresse projet" required/>
                    </div>
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Cotisation</h3>
                    <div className="flex items-center space-x-2">
                        <Switch id="cotisation" checked={hasCotisation} onCheckedChange={setHasCotisation}/>
                        <label htmlFor="cotisation">{"J'ai de la cotisation"}</label>
                    </div>
                </div>

                {hasCotisation && (
                    <>
                        <div className={"grid grid-cols-2 gap-4"}>
                            <div className="space-y-2">
                                <label htmlFor="annual-amount">Montant annuel (€/an)</label>
                                <Input id="annual-amount" type="number" required/>
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="payment-method">Moyen de paiement</label>
                                <Select>
                                    <SelectTrigger id="payment-method">
                                        <SelectValue placeholder="Sélectionnez un moyen de paiement"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="virement">Paiement par virement</SelectItem>
                                        <SelectItem value="cheque">Paiement par cheque</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="iban-number">IBAN</label>
                            <InputOTP maxLength={27} value={'FR'}>
                                <InputOTPGroup className={"flex flex-wrap"}>
                                    <InputOTPSlot index={0}/>
                                    <InputOTPSlot index={1}/>
                                    <InputOTPSeparator/>
                                    <InputOTPSlot index={2}/>
                                    <InputOTPSlot index={3}/>
                                    <InputOTPSlot index={4}/>
                                    <InputOTPSlot index={5}/>
                                    <InputOTPSeparator/>
                                    <InputOTPSlot index={6}/>
                                    <InputOTPSlot index={7}/>
                                    <InputOTPSlot index={8}/>
                                    <InputOTPSlot index={9}/>
                                    <InputOTPSeparator/>
                                    <InputOTPSlot index={10}/>
                                    <InputOTPSlot index={11}/>
                                    <InputOTPSlot index={12}/>
                                    <InputOTPSlot index={13}/>
                                    <InputOTPSeparator/>
                                    <InputOTPSlot index={14}/>
                                    <InputOTPSlot index={15}/>
                                    <InputOTPSlot index={16}/>
                                    <InputOTPSlot index={17}/>
                                    <InputOTPSeparator/>
                                    <InputOTPSlot index={18}/>
                                    <InputOTPSlot index={19}/>
                                    <InputOTPSlot index={20}/>
                                    <InputOTPSlot index={21}/>
                                    <InputOTPSeparator/>
                                    <InputOTPSlot index={22}/>
                                    <InputOTPSlot index={23}/>
                                    <InputOTPSlot index={24}/>
                                    <InputOTPSlot index={25}/>
                                    <InputOTPSlot index={26}/>
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="association-email">{"BIC"}</label>
                            <Input id="association-email" type="bic" required/>
                        </div>
                    </>
                )}
                <div className="pt-4">
                    <Button type="submit" onClick={sendAndClose}
                            className="w-full">{"Valider le bulletin d'adhésion"}</Button>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                    <p className="text-sm">
                        Attention, vérifiez attentivement que vos informations sont correctes.
                        Vous ne pourrez plus les modifier après avoir validé sa conformité.
                    </p>
                </div>
            </form>
        </DialogContent>
    </Dialog>
}