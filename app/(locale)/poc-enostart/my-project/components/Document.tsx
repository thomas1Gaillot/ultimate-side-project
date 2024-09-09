import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import AccordParticipationContent from "@/app/(locale)/poc-enostart/my-project/components/AccordParticipantContent";

export default function DocumentOverview({doc, index, openModal, setOpenModal}:{
    doc: {icon: any, title: string, estimatedTime: string},
    index: number,
    openModal: string,
    setOpenModal: (value: string) => void
}) {
    return <Card key={index}
                 className="bg-gray-50 w-[200px] h-[250px] max-h-[250px] flex flex-col justify-between hover:shadow-none shadow-none border-none rounded">
        <CardHeader>
            <CardTitle
                className="text-lg text-center text-gray-700 w-full">{doc.title}</CardTitle>
            <p className="text-xs text-center relative bottom-2 text-gray-400">temps estimé
                : {doc.estimatedTime}</p>

        </CardHeader>
        <CardContent className="flex flex-col items-center">
            {doc.icon}
        </CardContent>
        <CardFooter>
            <Dialog open={openModal === doc.title}
                    onOpenChange={() => setOpenModal(openModal === doc.title ? '' : doc.title)}>
                <DialogTrigger asChild>
                    <Button variant="ghost" size='sm'
                            className="text-primary w-full text-right">
                        {"Continuer ->"}
                    </Button>
                </DialogTrigger>
                <DialogContent className="bg-white">
                    <DialogHeader>
                        <DialogTitle>Souscription à la prestation</DialogTitle>
                    </DialogHeader>
                    {doc.title === "Accord de participation" ? <AccordParticipationContent/> :
                        <p>Additional information about {doc.title} would go here.</p>}
                </DialogContent>
            </Dialog>
        </CardFooter>
    </Card>
}