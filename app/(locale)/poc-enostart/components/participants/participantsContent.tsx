"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Dummy data for participants
const participants = [
    { id: 1, name: "Alice Dupont", email: "alice@example.com", status: "En attente" },
    { id: 2, name: "Bob Martin", email: "bob@example.com", status: "Accepté" },
    { id: 3, name: "Claire Leroy", email: "claire@example.com", status: "En révision" },
]

export default function ParticipantsContent() {
    const [activeTab, setActiveTab] = useState("candidatures")

    const tabData = [
        { id: "candidatures", label: "1. Candidatures", buttonText: "J'accepte les candidatures" },
        { id: "pre-integres", label: "2. Pré-intégrés", buttonText: "Proposer un prix de vente" },
        { id: "passage-exploitation", label: "3. Passage en exploitation", buttonText: "Passer en exploitation" },
        { id: "integres", label: "4. Intégrés", buttonText: "Exporter sur Enopower" },
        { id: "refuses", label: "Refusés", buttonText: "Refuser" },
    ]

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
                {tabData.map((tab) => (
                    <TabsTrigger key={tab.id} value={tab.id}>
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabData.map((tab) => (
                <TabsContent key={tab.id} value={tab.id}>
                    <div className="mb-4">
                        <Button>{tab.buttonText}</Button>
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
            ))}
        </Tabs>
    )
}