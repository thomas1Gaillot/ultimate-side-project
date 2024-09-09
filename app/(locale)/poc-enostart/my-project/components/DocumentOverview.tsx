import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {PmoStatus} from "@/app/(locale)/poc-enostart/data/pmo-status";
import {EnedisStatus} from "@/app/(locale)/poc-enostart/data/enedis-status";
import {SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import {cn} from "@/lib/utils";

export default function DocumentOverview({doc, index, openModal, setOpenModal, documentStatus}:{
    doc: {icon: any, title: string, estimatedTime: string, dialogContent : any},
    documentStatus : PmoStatus | EnedisStatus | SalesStatus;
    index: number,
    openModal: string,
    setOpenModal: (value: string) => void
}) {
    return <Card key={index}
                 className={cn("bg-gray-50 w-[200px] h-[250px] max-h-[250px] flex flex-col justify-between hover:shadow-none shadow-none border-none rounded",
                     documentStatus === PmoStatus.Ignore && 'opacity-60')}>
        <CardHeader>
            <p className="text-xs text-center relative bottom-2 text-gray-400">temps estimé
                : {doc.estimatedTime}</p>
            <CardTitle
                className="text-lg text-center text-gray-700 w-full leading-6">{doc.title}</CardTitle>


        </CardHeader>
        <CardContent className="flex flex-col items-center">
            {doc.icon}
        </CardContent>
        <CardFooter>
            {documentStatus === PmoStatus.ChoisirUnPlan && <ChoosePlanButton doc={doc} openModal={openModal} setOpenModal={setOpenModal}/>}
            {documentStatus === PmoStatus.Ignore && <Ignored doc={doc} openModal={openModal} setOpenModal={setOpenModal}/>}
        </CardFooter>
    </Card>
}

const ChoosePlanButton = ({doc, openModal, setOpenModal}: {
    doc: {icon: any, title: string, estimatedTime: string, dialogContent : any},
    openModal: string,
    setOpenModal: (value: string) => void
}) => {
    return (<Dialog open={openModal === doc.title}
                    onOpenChange={() => setOpenModal(openModal === doc.title ? '' : doc.title)}>
        <DialogTrigger asChild>
            <Button  size='sm'
                     className=" w-full text-right">
                {"Commencer ->"}
            </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
            <DialogHeader>
                <DialogTitle>Souscription à la prestation : {doc.title}</DialogTitle>
            </DialogHeader>
            <doc.dialogContent close={() => setOpenModal('')}/>
        </DialogContent>
    </Dialog>)
}

const Ignored =  ({doc, openModal, setOpenModal}: {
    doc: {icon: any, title: string, estimatedTime: string, dialogContent : any},
    openModal: string,
    setOpenModal: (value: string) => void
}) => {
    return (<Dialog open={openModal === doc.title}
                    onOpenChange={() => setOpenModal(openModal === doc.title ? '' : doc.title)}>
        <DialogTrigger asChild>
            <Button className={'w-full'} variant={'ghost'} size={'sm'}>Prestation ignorée</Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
            <DialogHeader>
                <DialogTitle>Souscription à la prestation : {doc.title}</DialogTitle>
            </DialogHeader>
            <doc.dialogContent close={() => setOpenModal('')}/>
        </DialogContent>
    </Dialog>)
}