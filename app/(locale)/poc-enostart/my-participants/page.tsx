"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {TypographyH4} from "@/components/ui/typography";

// Dummy data for participants
const participants = [
    { id: 1, name: "Alice Dupont", email: "alice@example.com", status: "En attente" },
    { id: 2, name: "Bob Martin", email: "bob@example.com", status: "Accepté" },
    { id: 3, name: "Claire Leroy", email: "claire@example.com", status: "En révision" },
]

export default function ParticipantsContent() {

    const tabData = [
        { id: "candidatures", label: "1. Candidatures", buttonText: "J'accepte les candidatures" },
        { id: "pre-integres", label: "2. Pré-intégrés", buttonText: "Proposer un prix de vente" },
        { id: "passage-exploitation", label: "3. Passage en exploitation", buttonText: "Passer en exploitation" },
        { id: "integres", label: "4. Intégrés", buttonText: "Exporter sur Enopower" },
        { id: "refuses", label: "Refusés", buttonText: "Refuser" },
    ]

    return (
        <Tabs defaultValue={tabData[0].id} className={'flex w-full gap-8'} >
            <TabsList className="w-64 h-max  flex flex-col items-stretch bg-background">
                {tabData.map(tab => (
                    <TabsTrigger
                        key={tab.id}
                        value={tab.id}
                        className="justify-start px-4 py-2 text-left hover:bg-muted"
                    >
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            <TabsContent className={'flex flex-col w-full gap-2'} key={'candidatures'} value={'candidatures'}>
                <TypographyH4>{tabData[0].label}</TypographyH4>
                <div className="mb-4">
                    <Button>{tabData[0].buttonText}</Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nom</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Statut</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {participants.map((participant) => (
                            <TableRow key={participant.id}>
                                <TableCell>{participant.name}</TableCell>
                                <TableCell>{participant.email}</TableCell>
                                <TableCell>{participant.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TabsContent>
        </Tabs>
    )
}