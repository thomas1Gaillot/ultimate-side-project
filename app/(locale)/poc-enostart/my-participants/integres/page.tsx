import {TypographyH4} from "@/components/ui/typography";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {DownloadIcon, SendIcon} from "lucide-react";

const participants = [
    {id: 1, name: "Gilles Lelouche", perimeter: "1.67 km", consumption: 14500},
]


export default function Page() {
    return <div className={"p-16"}><TypographyH4>Intégrés</TypographyH4>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Périmètre</TableHead>
                    <TableHead>Consommation</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {participants.map((participant) => (
                    <TableRow key={participant.id}>
                        <TableCell>{participant.name}</TableCell>
                        <TableCell>{participant.perimeter}</TableCell>
                        <TableCell>{participant.consumption}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
}