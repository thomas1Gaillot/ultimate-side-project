'use client'
import {TypographyH4} from "@/components/ui/typography";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import useParticipants from "@/app/(locale)/poc-enostart/data-refactored/participant/use-participants";


export default function Page() {
    const {refuses} = useParticipants()

    return <div className={"px-4"}><TypographyH4>Consommateurs Refusés</TypographyH4>
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