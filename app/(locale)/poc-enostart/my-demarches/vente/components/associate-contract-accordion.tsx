import {useParticipants} from "@/app/(locale)/poc-enostart/data/participants";
import {SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import {AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {TrashIcon, XIcon} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {useRouter} from "next/navigation";
import {Badge} from "@/components/ui/badge";
import {Pencil1Icon} from "@radix-ui/react-icons";
import {Separator} from "@/components/ui/separator";
import {Label} from "@/components/ui/label";
import {Switch} from "@/components/ui/switch";
import {Input} from "@/components/ui/input";
import {useState} from "react";

export default function AssociateContractAccordion() {
    const {preIntegres, reject, completeContract, completeContractForAll} = useParticipants()
    const preIntegresToAssociatePrice = preIntegres.filter(p => p.sales === SalesStatus.AssocierLeContrat)
    const [isReconduction, setIsReconduction] = useState(false)
    const [hasSubscription, setHasSubscription] = useState(false)

    const router = useRouter()
    return (
        <AccordionItem value="associate-contract">
            <AccordionTrigger
                className="text-lg font-semibold">
                <div className={"flex"}>
                    {"2. Je complète le contrat de vente pour chaque consommateur"}
                </div>
            </AccordionTrigger>
            <AccordionContent className={"p-8 gap-4 grid"}>
                {preIntegresToAssociatePrice.length > 0 ? <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Informations du contrat</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {preIntegresToAssociatePrice.map((p) => {
                                return (
                                    <TableRow key={p.id}>
                                        <TableCell>{p.name}</TableCell>
                                        <TableCell>
                                            <div className={"flex flex-col gap-1"}>
                                            <span className={"text-xs"}>
                                                {p?.contractDocument?.name}
                                            </span>
                                                <div className={'flex gap-2'}>
                                                    <Badge variant={'outline'}>{p?.contractDocument?.duration}</Badge>
                                                    <Badge variant={'outline'}>{p?.contractDocument?.price}</Badge>
                                                    <Badge variant={'outline'}>{p?.contractDocument?.indexation}</Badge>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        size={'sm'} className={'text-xs text-primary'} variant={'link'}>
                                                        Compléter le contrat de vente
                                                        <Pencil1Icon
                                                            className={'size-4 ml-2'}/> </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-xl overflow-y-auto h-full">
                                                    <DialogHeader>
                                                        <DialogTitle>{"Compléter le contrat"}</DialogTitle>
                                                    </DialogHeader>
                                                    <div className={" p-2 flex flex-col gap-4"}>
                                                    <span className={"pt-8"}>
                                                        <h3 className="text-xl font-semibold">
                                                            Prix de vente proposé à {p.name}
                                                        </h3>
                                                        </span>
                                                        <div className={"grid gap-2 "}>
                                                            <div className={"grid grid-cols-2  w-full text-sm"}>
                                                                <span className={" text-gray-700"}> Prix de vente</span>
                                                                <span>{p?.contractDocument?.price}</span>
                                                            </div>
                                                            <div className={"grid grid-cols-2  w-full text-sm"}>
                                                                <span className={"text-gray-700"}> Durée</span>
                                                                <span>{p?.contractDocument?.duration}</span>
                                                            </div>
                                                            <div className={"grid grid-cols-2  w-full text-sm"}>
                                                                <span className={"text-gray-700"}> Indexation</span>
                                                                <span>{p?.contractDocument?.indexation}</span>
                                                            </div>
                                                        </div>
                                                        <span className={"pt-8"}>
                                                         <h3 className="text-xl font-semibold">Compléter le contrat de vente</h3>
                                                        </span>
                                                        <div className="space-y-4">
                                                            <h3 className="text-lg font-semibold">Informations
                                                                générales</h3>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="penalite">Pénalité (%)</Label>
                                                                    <Input id="penalite" type="number" placeholder="0"/>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="penalite2">Pénalité 2 (kWh estimé /
                                                                        an)</Label>
                                                                    <Input id="penalite2" type="number" placeholder="0"/>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center space-x-2">
                                                                <Switch
                                                                    id="reconduction"
                                                                    checked={isReconduction}
                                                                    onCheckedChange={setIsReconduction}
                                                                />
                                                                <Label htmlFor="reconduction">Reconduction tacite</Label>
                                                            </div>
                                                            {isReconduction && (
                                                                <div className="grid grid-cols-2 gap-4">
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="delai-preavis">Délai préavis départ
                                                                            (mois)</Label>
                                                                        <Input id="delai-preavis" type="number"
                                                                               placeholder="0"/>
                                                                    </div>
                                                                    <div className="space-y-2">
                                                                        <Label htmlFor="delai-facture">Délai facture de
                                                                            résiliation (mois)</Label>
                                                                        <Input id="delai-facture" type="number"
                                                                               placeholder="0"/>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <Separator/>

                                                        <div className="space-y-4">
                                                            <h3 className="text-lg font-semibold">Prix</h3>
                                                            <div className="flex items-center space-x-2">
                                                                <Switch
                                                                    id="abonnement"
                                                                    checked={hasSubscription}
                                                                    onCheckedChange={setHasSubscription}
                                                                />
                                                                <Label htmlFor="abonnement">Abonnement</Label>
                                                            </div>
                                                            {hasSubscription && (
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="montant-abonnement">Montant abonnement
                                                                        (€ /
                                                                        an)</Label>
                                                                    <Input id="montant-abonnement" type="number"
                                                                           placeholder="0"/>
                                                                </div>
                                                            )}
                                                        </div>

                                                        <Separator/>

                                                        <div className="space-y-4">
                                                            <h3 className="text-lg font-semibold">Facturation</h3>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="frequence-facturation">Fréquence de
                                                                        facturation</Label>
                                                                    <Input id="frequence-facturation"
                                                                           placeholder="Mensuelle"/>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="mode-paiement">Mode de paiement</Label>
                                                                    <Input id="mode-paiement"
                                                                           placeholder="Prélèvement automatique"/>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <Separator/>

                                                        <div className="space-y-4">
                                                            <h3 className="text-lg font-semibold">Information
                                                                Producteur</h3>
                                                            <div className="grid grid-cols-2 gap-4">
                                                                <div className="space-y-2">
                                                                    <Label
                                                                        htmlFor="type-energie">{"Type d'énergie renouvelable"}</Label>
                                                                    <Input id="type-energie" placeholder="Solaire"/>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="capacite-production">Capacité de
                                                                        production
                                                                        (kW)</Label>
                                                                    <Input id="capacite-production" type="number"
                                                                           placeholder="0"/>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label
                                                                        htmlFor="date-installation">{"Date d'installation"}</Label>
                                                                    <Input id="date-installation" type="date"/>
                                                                </div>
                                                                <div className="space-y-2">
                                                                    <Label htmlFor="contrat-rachat">Contrat de
                                                                        rachat</Label>
                                                                    <Input id="contrat-rachat" placeholder="Oui / Non"/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button
                                                            variant={'default'}
                                                            onClick={() => completeContractForAll(p.id)}
                                                            type="submit">Compléter ce contrat pour tous</Button>
                                                        <Button
                                                            variant={'secondary'}
                                                            onClick={() => completeContract(p.id)}
                                                            type="submit">Compléter seulement pour {p.name}</Button>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>


                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger>
                                                        <Button onClick={() => reject(p.id)} size={'sm'} className={'text-red-500 text-xs'} variant={'link'}>Refuser<XIcon
                                                            className={'size-4 ml-1'}/> </Button>
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>Refuser {p.name}</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>

                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table> :
                    <div>
                        Pas de nouveaux participants à associer un contrat.
                        <Button
                            onClick={() => router.push('/poc-enostart/my-participants/pre-integres')}
                            variant={'link'}>Voir la liste de participants pré-intégrés</Button>
                    </div>}
            </AccordionContent>
        </AccordionItem>
    )
}