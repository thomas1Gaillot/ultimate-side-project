import {TypographyH4} from "@/components/ui/typography";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {BellIcon, DownloadIcon, SendIcon, TrashIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {participants} from "@/app/(locale)/poc-enostart/data/participants";
import {enedisMapper} from "@/app/(locale)/poc-enostart/data/enedis-status";
import { pmoMapper } from "../../data/pmo-status";
import {salesMapper} from "@/app/(locale)/poc-enostart/data/sales-status";


export default function Page() {
    return <div className={"p-16"}><TypographyH4>Consommateurs Pré-intégrés (3)</TypographyH4>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Périmètre</TableHead>
                    <TableHead>{"Date d'export"}</TableHead>
                    <TableHead>Démarches PMO</TableHead>
                    <TableHead>Accords de participation</TableHead>
                    <TableHead>Démarches de vente</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {participants.preIntegres.map((p) => {
                    const PmoIcon = p.pmo ?pmoMapper(p.pmo).icon as any : <></>
                    const EnedisIcon = p.enedis ? enedisMapper(p.enedis).icon as any  : <></>
                    const SalesIcon =  p.sales ? salesMapper(p.sales).icon as any  : <></>
                    return (
                        <TableRow key={p.id}>
                            <TableCell>{p.name}</TableCell>
                            <TableCell>{p.perimeter}</TableCell>
                            <TableCell>{p.exportDate}</TableCell>
                            <TableCell>
                                {p.pmo && <div className={cn("flex items-center text-xs",
                                    pmoMapper(p.pmo).icon === BellIcon ? 'text-gray-700' : 'text-gray-300')}>
                                    {pmoMapper(p.pmo).name}
                                    <PmoIcon className={'size-4 ml-2'}/>
                                </div>}
                            </TableCell>
                            <TableCell>
                                {p.enedis && <div className={cn("flex items-center text-xs",
                                    EnedisIcon === BellIcon ? 'text-gray-700' : 'text-gray-300')}>
                                    {enedisMapper(p.enedis).name}
                                    <EnedisIcon className={'size-4 ml-2'}/>
                                </div>}
                            </TableCell>
                            <TableCell>
                                {p.sales && <div className={cn("flex items-center text-xs",
                                    SalesIcon === BellIcon ? 'text-gray-700' : 'text-gray-300')}>
                                    {salesMapper(p.sales).name}
                                    <SalesIcon className={'size-4 ml-2'}/>
                                </div>}
                            </TableCell>
                            <TableCell>
                                <Button size={'sm'} className={'text-xs text-gray-700'} variant={'link'}><DownloadIcon
                                    className={'size-4 ml-2'}/> </Button>
                                <Button size={'sm'} className={'text-xs'} variant={'link'}><SendIcon
                                    className={'size-4 ml-2'}/> </Button>
                                <Button size={'sm'} className={'text-red-500 text-xs'} variant={'link'}><TrashIcon
                                    className={'size-4 ml-2'}/> </Button>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    </div>
}