import {TypographyH4} from "@/components/ui/typography";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {BellIcon, DownloadIcon, SendIcon, TrashIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {pre_integres} from "../../data/participants";


export default function Page() {
    return <div className={"p-16"}><TypographyH4>Consommateurs Pré-intégrés (3)</TypographyH4>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Périmètre</TableHead>
                    <TableHead>Date d'export</TableHead>
                    <TableHead>Démarches PMO</TableHead>
                    <TableHead>Démarches Enedis</TableHead>
                    <TableHead>Démarches de vente</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {pre_integres.map((participant) => (
                    <TableRow key={participant.id}>
                        <TableCell>{participant.name}</TableCell>
                        <TableCell>{participant.perimeter}</TableCell>
                        <TableCell>{participant.exportDate}</TableCell>
                        <TableCell>
                            {participant.pmo && <div className={cn("flex items-center text-xs",
                                participant.pmo.icon === BellIcon ? 'text-primary' : 'text-gray-300')}>
                                {participant.pmo.name}
                                <participant.pmo.icon className={'size-4 ml-2'}/>
                            </div>}
                        </TableCell>
                        <TableCell>
                            {participant.enedis && <div className={cn("flex items-center text-xs",
                                participant.enedis.icon === BellIcon ? 'text-primary' : 'text-gray-300')}>
                                {participant.enedis.name}
                                <participant.enedis.icon className={'size-4 ml-2'}/>
                            </div>}
                        </TableCell>
                        <TableCell>
                            {participant.sales && <div className={cn("flex items-center text-xs",
                                participant.sales.icon === BellIcon ? 'text-primary' : 'text-gray-300')}>
                                {participant.sales.name}
                                <participant.sales.icon className={'size-4 ml-2'}/>
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
                ))}
            </TableBody>
        </Table>
    </div>
}