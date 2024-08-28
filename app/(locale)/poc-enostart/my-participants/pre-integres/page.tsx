import {TypographyH4} from "@/components/ui/typography";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {BellIcon, CheckIcon, DownloadIcon, HourglassIcon, SendIcon, TrashIcon} from "lucide-react";
import {cn} from "@/lib/utils";
enum SalesStatus {
    ProposerUnPrix = 'ProposerUnPrix',
    PrixPropose = 'PrixPropose',
    EditerLeContrat = 'EditerLeContrat',
    EnvoyerLeContrat = 'EnvoyerLeContrat',
    ContratEnvoye = 'ContratEnvoye',
    ContratSigne = 'ContratSigne',
    Ignore = 'Ignore',
}
const salesStatus = {
    [SalesStatus.ProposerUnPrix]: { name: 'Proposer un prix', icon: BellIcon },
    [SalesStatus.PrixPropose]: { name: 'Prix proposé', icon: HourglassIcon },
    [SalesStatus.EditerLeContrat]: { name: 'Editer le contrat', icon: BellIcon },
    [SalesStatus.EnvoyerLeContrat]: { name: 'Envoyer le contrat', icon: BellIcon },
    [SalesStatus.ContratEnvoye]: { name: 'Contrat envoyé', icon: HourglassIcon },
    [SalesStatus.ContratSigne]: { name: 'Contrat signé', icon: CheckIcon },
    [SalesStatus.Ignore]: { name: 'Ignoré', icon: CheckIcon },
};
enum PmoStatus {
    IdentifierLaPmo = 'IdentifierLaPmo',
    EnvoyerLeBulletin = 'EnvoyerLeBulletin',
    BulletinEnvoye = 'BulletinEnvoye',
    BulletinSigne = 'BulletinSigne',
    Ignore = 'Ignore',
}
const pmoStatus = {
    [PmoStatus.IdentifierLaPmo]: { name: 'Identifier la PMO', icon: BellIcon },
    [PmoStatus.EnvoyerLeBulletin]: { name: 'Envoyer le bulletin', icon: BellIcon },
    [PmoStatus.BulletinEnvoye]: { name: 'Bulletin envoyé', icon: HourglassIcon },
    [PmoStatus.BulletinSigne]: { name: 'Bulletin signé', icon: CheckIcon },
    [PmoStatus.Ignore]: { name: 'Ignoré', icon: CheckIcon },
};
enum EnedisStatus {
    EditerLAccord = 'EditerLAccord',
    EnvoyerLAccord = 'EnvoyerLAccord',
    AccordEnvoye = 'AccordEnvoye',
    AccordSigne = 'AccordSigne',
    Ignore = 'Ignore',
}
const enedisStatus = {
    [EnedisStatus.EditerLAccord]: { name: "Editer l'accord", icon: BellIcon },
    [EnedisStatus.EnvoyerLAccord]: { name: "Envoyer l'accord", icon: BellIcon },
    [EnedisStatus.AccordEnvoye]: { name: "Accord envoyé", icon: HourglassIcon },
    [EnedisStatus.AccordSigne]: { name: "Accord signé", icon: CheckIcon },
    [EnedisStatus.Ignore]: { name: 'Ignoré', icon: CheckIcon },
};

const participants = [
    {id: 1, name: "Alice Dupont", perimeter: "1.67 km", exportDate: "-", pmo : pmoStatus[PmoStatus.IdentifierLaPmo], enedis : enedisStatus[EnedisStatus.EditerLAccord], sales : salesStatus[SalesStatus.ProposerUnPrix] },
    {id: 2, name: "Bob Martin", perimeter: "0.45 km", exportDate: "05 Juillet 2024",pmo : pmoStatus[PmoStatus.IdentifierLaPmo],enedis : enedisStatus[EnedisStatus.EditerLAccord], sales : salesStatus[SalesStatus.PrixPropose]},
    {id: 3, name: "Claire Leroy", perimeter: "2.1 km", exportDate: "05 Juillet 2024",pmo : pmoStatus[PmoStatus.IdentifierLaPmo], enedis : enedisStatus[EnedisStatus.EditerLAccord],sales : salesStatus[SalesStatus.PrixPropose]},
]


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
                {participants.map((participant) => (
                    <TableRow key={participant.id}>
                        <TableCell>{participant.name}</TableCell>
                        <TableCell>{participant.perimeter}</TableCell>
                        <TableCell>{participant.exportDate}</TableCell>
                        <TableCell>
                            <div className={cn("flex items-center text-xs",
                                participant.pmo.icon === BellIcon  ? 'text-primary' : 'text-gray-300')}>
                                {participant.pmo.name}
                                <participant.pmo.icon className={'size-4 ml-2'}/>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className={cn("flex items-center text-xs",
                                participant.enedis.icon === BellIcon ? 'text-primary' : 'text-gray-300')}>
                                {participant.enedis.name}
                                <participant.enedis.icon className={'size-4 ml-2'}/>
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className={cn("flex items-center text-xs",
                                participant.sales.icon === BellIcon ? 'text-primary' : 'text-gray-300')}>
                                {participant.sales.name}
                                <participant.sales.icon className={'size-4 ml-2'}/>
                            </div>
                        </TableCell>
                        <TableCell>
                            <Button size={'sm'} className={'text-xs text-gray-700'} variant={'link'}><DownloadIcon className={'size-4 ml-2'}/> </Button>
                            <Button size={'sm'} className={'text-xs'} variant={'link'}><SendIcon className={'size-4 ml-2'}/> </Button>
                            <Button size={'sm'} className={'text-red-500 text-xs'} variant={'link'}><TrashIcon className={'size-4 ml-2'}/> </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
}