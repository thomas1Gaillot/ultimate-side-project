"use client"

import {useState} from "react"
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch"
import {CheckCircle} from 'lucide-react'

interface PricingModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    description: string
    steps: string[]
    basePrice: number
    bulkPrice: number
    bulkQuantity: number
    pricingDescription: string
}

export function PricingModal({
                                 isOpen,
                                 onClose,
                                 title,
                                 description,
                                 steps,
                                 basePrice,
                                 bulkPrice,
                                 bulkQuantity,
                                 pricingDescription,
                             }: PricingModalProps) {
    const [isBulkPricing, setIsBulkPricing] = useState(false)

    const handleSubmit = () => {
        // Handle submission logic here
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    <div className="space-y-4">
                        <h3 className="font-medium">Processus détaillé</h3>
                        <ul className="grid gap-2">
                            {steps.map((step, index) => (
                                <li key={index} className="flex items-start gap-2">
                                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5"/>
                                    <span className="text-sm">{step}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-medium">Options de tarification</h3>
                        <div className="flex items-center justify-between space-x-4 p-4 border rounded-lg">
                            <div className="space-y-0.5">
                                <Label htmlFor="bulk-pricing">Tarification par lot</Label>
                                <p className="text-sm text-muted-foreground">
                                    Économisez 20% en choisissant le forfait pour {bulkQuantity} signatures
                                </p>
                            </div>
                            <Switch
                                id="bulk-pricing"
                                checked={isBulkPricing}
                                onCheckedChange={setIsBulkPricing}
                            />
                        </div>

                        <div className="p-4 border rounded-lg">
                            <div className="text-2xl font-bold">
                                {isBulkPricing ? (
                                    <>
                                        {bulkPrice}€ <span
                                        className="text-sm font-normal text-muted-foreground">/ {bulkQuantity} {pricingDescription.split('/')[1].trim()}</span>
                                    </>
                                ) : (
                                    <>
                                        {basePrice}€ <span
                                        className="text-sm font-normal text-muted-foreground">{pricingDescription}</span>
                                    </>
                                )}
                            </div>
                            {isBulkPricing && (
                                <p className="text-sm text-muted-foreground mt-2">
                                    Soit {(bulkPrice / bulkQuantity).toFixed(2)}€
                                    par {pricingDescription.split('/')[1].trim()}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-4">
                    <Button variant="outline" onClick={onClose}>
                        Annuler
                    </Button>
                    <Button onClick={handleSubmit}>
                        Confirmer la commande
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

