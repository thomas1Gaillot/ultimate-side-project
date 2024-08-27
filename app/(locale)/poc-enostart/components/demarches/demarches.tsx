"use client"

import {useState} from "react"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Button} from "@/components/ui/button"
import {MapIcon} from "lucide-react";

export default function DemarchesContent() {
    const [activeTab, setActiveTab] = useState("pmo")

    const tabData = [
        {id: "pmo", label: "Démarches PMO", buttonText: "Créer mon association"},
        {id: "enedis", label: "Déclaration Enedis", buttonText: "Envoyer la déclaration de mise en oeuvre"},
        {id: "vente", label: "Démarches vente", buttonText: "Editer les contrats de vente"},
        {id: "convention", label: "Convention ACC", buttonText: "Editer la convention"},
    ]

    return (
        <Tabs value={activeTab} onValueChange={setActiveTab} className={'flex w-full gap-8'}>
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
            {tabData.map((tab) => (
                <TabsContent className={'w-full'} key={tab.id} value={tab.id}>
                    <div className={"w-full rounded h-48 bg-gray-50 flex items-center justify-center"}>
                        <span>Choix du plan</span>
                    </div>
                    <div className="mb-4">
                        <Button>{tab.buttonText}</Button>
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    )
}