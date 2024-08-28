import {TypographyH4} from "@/components/ui/typography";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {CheckIcon, TrashIcon, XIcon} from "lucide-react";

const participants = [
    {id: 1, name: "JK Rowling", perimeter: "1.67 km", consumption: 14500},
    {id: 2, name: "George Lucas", perimeter: "2.40 km", consumption: 7000},
    {id: 3, name: "Steve Jobs", perimeter: "0.45 km", consumption: 14500},
    {id: 4, name: "Henry Cavill", perimeter: "0.12 km", consumption: 6000},

]


export default function Page() {
    return <div className={"p-16"}><TypographyH4>Candidatures</TypographyH4>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Périmètre</TableHead>
                    <TableHead>Consommation</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {participants.map((participant) => (
                    <TableRow key={participant.id}>
                        <TableCell>{participant.name}</TableCell>
                        <TableCell>{participant.perimeter}</TableCell>
                        <TableCell>{participant.consumption}</TableCell>
                        <TableCell>
                            <Button size={'sm'} className={'text-xs text-gray-700'} variant={'link'}>Accepter<CheckIcon
                                className={'size-4 ml-1'}/> </Button>
                            <Button size={'sm'} className={'text-red-500 text-xs'} variant={'link'}>Refuser<XIcon
                                className={'size-4 ml-1'}/> </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
}