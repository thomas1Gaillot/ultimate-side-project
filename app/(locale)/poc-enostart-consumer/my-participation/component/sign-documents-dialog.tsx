import {useState} from 'react'
import {Button} from "@/components/ui/button"
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import {FileIcon} from 'lucide-react'

export default function SignDocumentsDialog({onSubmit}: {
    onSubmit: () => void
}) {
    const [isOpen, setIsOpen] = useState(false)
    const documents = [
        "Bulletin d'adhésion à l'association PMO",
        "Accords de participation",
        "Contrat de vente"
    ]


    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Voir la proposition</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Documents à signer (3)</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    {documents.map((doc, index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <div className="bg-gray-100 p-2 rounded">
                                <FileIcon className="h-6 w-6 text-gray-500"/>
                            </div>
                            <div>
                                <p className="text-sm font-medium">{doc}</p>
                                <p className="text-xs text-gray-500">Format: PDF</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col items-stretch space-y-4">
                    <p className="text-sm text-gray-600 text-center">
                        {"Pour terminer votre intégration, vous allez recevoir ces documents à signer par e-mail. Ouvrez votre boîte et signez les documents."}
                    </p>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                        Ouvrir ma boîte mail
                    </Button>
                </div>
            </DialogContent>
        </Dialog>

    )
}