"use client"

import {useState} from "react"
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {CheckCircle} from 'lucide-react'
import {PricingModal} from "./PricingModal"

interface ServiceCardProps {
    title: string
    description: string
    steps: string[]
    basePrice: number
    bulkPrice: number
    bulkQuantity: number
    modalId: string
    pricingDescription: string
}

export function ServiceCard({
                                title,
                                description,
                                steps,
                                basePrice,
                                bulkPrice,
                                bulkQuantity,
                                modalId,
                                pricingDescription,
                            }: ServiceCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <Card className="flex flex-col h-full transition-all hover:shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl">{title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                    <ul className="space-y-2">
                        {steps.map((step, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5"/>
                                <span className="text-sm">{step}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button
                        className="w-full"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Choisir cette prestation
                    </Button>
                </CardFooter>
            </Card>

            <PricingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={title}
                description={description}
                basePrice={basePrice}
                bulkPrice={bulkPrice}
                bulkQuantity={bulkQuantity}
                steps={steps}
                pricingDescription={pricingDescription}
            />
        </>
    )
}

