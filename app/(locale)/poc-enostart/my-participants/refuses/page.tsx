import {TypographyH4} from "@/components/ui/typography";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const participants = [
    {id: 1, name: "Jean Dupont", email: "alice@example.com"},
    {id: 2, name: "Toto Martin", email: "bob@example.com"},
]


export default function Page() {
    return <div className={"p-16"}> <TypographyH4>Consommateurs Refusés</TypographyH4>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {participants.map((participant) => (
                    <TableRow key={participant.id}>
                        <TableCell>{participant.name}</TableCell>
                        <TableCell>{participant.email}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
}