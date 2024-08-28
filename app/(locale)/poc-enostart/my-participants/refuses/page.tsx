'use client'
import {TypographyH4} from "@/components/ui/typography";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {parse, useStoredParticipants} from "@/app/(locale)/poc-enostart/data/participants";


export default function Page() {
    const {participants} = useStoredParticipants()
    const {refuses} = parse(participants)
    return <div className={"p-16"}><TypographyH4>Consommateurs Refusés</TypographyH4>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Nom</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {refuses.map((participant) => (
                    <TableRow key={participant.id}>
                        <TableCell>{participant.name}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
}