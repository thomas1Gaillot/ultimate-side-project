import {useEffect} from "react";
import {PmoStatus} from "@/app/(locale)/poc-enostart/data/pmo-status";
import {EnedisStatus} from "@/app/(locale)/poc-enostart/data/enedis-status";
import {SalesStatus} from "@/app/(locale)/poc-enostart/data/sales-status";
import SalesSubscriptionDialogContent
    from "@/app/(locale)/poc-enostart/my-project/components/SalesSubscriptionDialogContent";
import AccordSubscriptionContent from "@/app/(locale)/poc-enostart/my-project/components/AccordSubscriptionContent";
import BulletinSubscriptionDialogContent
    from "@/app/(locale)/poc-enostart/my-project/components/BulletinSubscriptionDialogContent";
import {Button} from "@/components/ui/button";
import PreRequisitePmo from "@/app/(locale)/poc-enostart/my-project/components/PreRequisitePmo";
import {usePrestations} from "@/app/(locale)/poc-enostart/data/documents/use-prestations";
import {useRouter} from "next/navigation";
import {
    initialAccordsDocument,
    initialBulletinDocument,
    initialConventionDocument,
    initialDeclarationDocument,
    initialSalesDocument,
    initialStatutPmoDocument,
    useStoredDocumentsOverview
} from "@/app/(locale)/poc-enostart/data/documents/use-stored-documents-overview";
import {useDocuments} from "@/app/(locale)/poc-enostart/data/documents/use-documents";


export default function useDocumentsOverview() {
    const {pmoDemarches, salesDemarches, enedisDemarches} = usePrestations()
    const router = useRouter()
    const {hasSalesContract} = useDocuments()
    const {
        sales, setSales,
        accords, setAccords,
        bulletin, setBulletin,
        declaration, setDeclaration,
        statutPmo, setStatutPmo,
        convention, setConvention
    } = useStoredDocumentsOverview()

    // update status for Documents when prestation changes
    useEffect(() => {

        if (salesDemarches === 'disabled') {
            setSales({
                ...sales,
                status: SalesStatus.Ignore,
                Button: () => <SalesSubscriptionDialogContent ignored={true}/>
            });
        }
        if (salesDemarches === 'active') {
            setSales({...sales, status: SalesStatus.ProposerUnPrix})
        }

    }, [salesDemarches]);
    useEffect(() => {
        switch (sales.status) {
            case SalesStatus.Ignore :
                break;
            case SalesStatus.ChoisirUnPlan :
                setSales(initialSalesDocument);
                break;
            case SalesStatus.ProposerUnPrix :
                if(hasSalesContract){
                    setSales({
                        ...sales,
                        Button: () => <Button variant={"outline"} size={'sm'}
                            onClick={() => router.push('/poc-enostart/my-demarches/vente?tab=create-contracts')}> {"Créer un autre contrat"} </Button>
                    });
                    break;
                }

                setSales({
                    ...sales,
                    Button: () => <Button
                        onClick={() => router.push('/poc-enostart/my-demarches/vente?tab=create-contracts')}> {"Créer un contrat ->"} </Button>
                });
                break;
            default:
                setSales({...sales, Button: () => <>Default Next step : {sales.status}</>});
                break;
        }
    }, [sales.status, hasSalesContract]);

    useEffect(() => {

        if (pmoDemarches === 'disabled') {
            setBulletin({
                ...bulletin,
                status: PmoStatus.Ignore,
                Button: () => <BulletinSubscriptionDialogContent ignored={true}/>
            });
            setStatutPmo({
                ...statutPmo,
                status: PmoStatus.Ignore,
                Button: () => <BulletinSubscriptionDialogContent ignored={true}/>
            });
        }
        if (pmoDemarches === 'active') {
            setBulletin({...bulletin, status: PmoStatus.IdentifierLaPmo})
            setStatutPmo({...statutPmo, status: PmoStatus.IdentifierLaPmo})
        }

    }, [pmoDemarches]);
    useEffect(() => {
        switch (bulletin.status) {
            case PmoStatus.Ignore :
                break;
            case PmoStatus.ChoisirUnPlan :
                setBulletin(initialBulletinDocument);
                setStatutPmo(initialStatutPmoDocument)
                break;
            case PmoStatus.IdentifierLaPmo :
                setBulletin({...bulletin, Button: () => <PreRequisitePmo/>});
                setStatutPmo({
                    ...statutPmo,
                    Button: () => <Button size={'sm'}
                                          onClick={() => router.push('/poc-enostart/my-demarches/pmo?tab=create-pmo')}> {"Créer la PMO ->"} </Button>
                });
                break;
            default:
                setBulletin({...bulletin, Button: () => <>Default Next step : {bulletin.status}</>});
                setStatutPmo({...statutPmo, Button: () => <>Default Next step : {statutPmo.status}</>});
                break;
        }
    }, [bulletin.status]);

    useEffect(() => {

        if (enedisDemarches === 'disabled') {
            setAccords({
                ...accords,
                status: EnedisStatus.Ignore,
                Button: () => <AccordSubscriptionContent ignored={true}/>
            });
            setDeclaration({
                ...declaration,
                status: EnedisStatus.Ignore,
                Button: () => <AccordSubscriptionContent ignored={true}/>
            });
            setConvention({
                ...convention,
                status: EnedisStatus.Ignore,
                Button: () => <AccordSubscriptionContent ignored={true}/>
            });
        }
        if (enedisDemarches === 'active') {
            setAccords({
                ...accords,
                status: EnedisStatus.IdentifierLaPmo,
            });
            setDeclaration({
                ...declaration,
                status: EnedisStatus.IdentifierLaPmo,
            });
            setConvention({
                ...convention,
                status: EnedisStatus.IdentifierLaPmo,
            });
        }

    }, [enedisDemarches]);
    useEffect(() => {
        switch (accords.status) {
            case EnedisStatus.Ignore :
                break;
            case EnedisStatus.ChoisirUnPlan :
                setAccords(initialAccordsDocument);
                setDeclaration(initialDeclarationDocument)
                setConvention(initialConventionDocument)
                break;
            case EnedisStatus.IdentifierLaPmo :
                setAccords({...accords, Button: () => <PreRequisitePmo/>});
                setDeclaration({...declaration, Button: () => <PreRequisitePmo/>});
                setConvention({...convention, Button: () => <PreRequisitePmo/>});
                break;
            default:
                setAccords({...accords, Button: () => <>Default Next step : {accords.status}</>});
                setDeclaration({...declaration, Button: () => <>Default Next step : {declaration.status}</>});
                setConvention({...convention, Button: () => <>Default Next step : {convention.status}</>});
                break;
        }
    }, [accords.status]);

    console.log('sales', sales)

    return {sales, accords, bulletin, convention, declaration, statutPmo}
};