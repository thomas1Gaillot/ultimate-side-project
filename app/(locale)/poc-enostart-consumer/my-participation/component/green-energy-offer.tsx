import {useState} from 'react'
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Leaf} from 'lucide-react'

export default function GreenEnergyOffer({onSubmit}: {
    onSubmit: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Voir la proposition</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Leaf className="h-5 w-5 text-green-500"/>
                        Offre Énergie Verte
                    </DialogTitle>
                    <DialogDescription>
                        Une solution écologique pour votre consommation électrique
                    </DialogDescription>
                </DialogHeader>
                <div className="p-6">

                    <div className=" space-y-2 text-gray-800">
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Prix</span>
                            <span className="text-sm font-semibold">0.15 €/kWh</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm">Durée</span>
                            <span className="text-sm font-semibold">25 ans</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm ">{"Taux d'inflation"}</span>
                            <span className="text-sm font-semibold">2 %</span>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <div className=" flex flex-col">
                        <Button className={'w-full'} onClick={onSubmit}>
                            {"Accepter l'offre"}
                        </Button>
                        <p className="mt-4 text-xs text-gray-500 text-center">
                            {"Cette offre vous garantit un approvisionnement en électricité 100% verte à un tarif compétitif, avec une protection contre l'inflation."}
                        </p>
                        <Button variant={'link'} className={'text-red-500'} size='sm' onClick={onSubmit}>
                            {"Refuser et retirer ma candidature"}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}