"use client";

import {usePathname, useRouter} from "next/navigation";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useDocuments} from "@/app/(locale)/poc-enostart/data/documents/use-documents";
import {cn} from "@/lib/utils";
import {BellIcon, LockIcon, RocketIcon} from "lucide-react";
import {usePrestations} from "@/app/(locale)/poc-enostart/data/documents/use-prestations";
import PmoDescriptionDialog from "@/app/(locale)/poc-enostart/my-demarches/pmo/component/pmo-description-dialog";
import {useState} from "react";

const demarchesTabs = (isPmoCreated: boolean, isBulletinEdited: boolean, isAccordsEdited: boolean, isDeclarationSent: boolean, isContratCreated: boolean, pathname: string | null,
                       enedisPlan: 'active' | 'disabled' | null, pmoPlan: 'active' | 'disabled' | null, salesPlan: 'active' | 'disabled' | null) => {
    const enedisHref = pathname?.includes('/poc-enostart/my-demarches/enedis') ? pathname : '/poc-enostart/my-demarches/enedis';
    const pmoHref = pathname?.includes('/poc-enostart/my-demarches/pmo') ? pathname : '/poc-enostart/my-demarches/pmo';
    const venteHref = pathname?.includes('/poc-enostart/my-demarches/vente') ? pathname : '/poc-enostart/my-demarches/vente';
    const overviewHref = '/poc-enostart/my-demarches/overview'

    return [
        {id: "overview", label: "Documents et prestations", href: overviewHref, ping: false, hide: false},
        {
            id: "vente",
            label: "Contrat de vente",
            href: venteHref,
            ping: !isContratCreated && salesPlan !== 'disabled',
            disabled: salesPlan !== 'active'
        },
        {
            id: "pmo",
            label: "Bulletin d'adhésion et PMO",
            href: pmoHref,
            done: isPmoCreated && isBulletinEdited,
            disabled: pmoPlan !== 'active',
            ping: !isBulletinEdited && pmoPlan !== 'disabled',
            hide: isBulletinEdited
        },
        {
            id: "enedis",
            label: "Accords, Déclaration, Convention",
            href: enedisHref,
            ping: (!isAccordsEdited || !isDeclarationSent) && enedisPlan !== 'disabled',
            disabled: enedisPlan !== 'active',
            hide: false
        },

    ]
}

export default function TabsLayout({children}: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [openPmoDialog, setOpenPmoDialog] = useState(false)

    const {
        isPmoCreated,
        isBulletinEdited,
        isAccordsParticipationEdited,
        isDeclarationSent,
        hasSalesContract
    } = useDocuments()
    const {enedisDemarches, pmoDemarches, salesDemarches} = usePrestations()

    return (
        <>
            {openPmoDialog && <PmoDescriptionDialog open={openPmoDialog} onOpenChange={setOpenPmoDialog}/>}
            <div className="flex flex-col w-full gap-8 mt-4">
                <Tabs value={pathname || ''} className="w-full flex">
                    <TabsList className="w-[400px] h-max flex flex-col gap-1 items-stretch bg-background">
                        {demarchesTabs(isPmoCreated, isBulletinEdited, isAccordsParticipationEdited, isDeclarationSent, hasSalesContract, pathname, enedisDemarches, pmoDemarches, salesDemarches).map((tab, index) => (
                            <TabsTrigger
                                key={tab.id}
                                onClick={() => tab.disabled ? setOpenPmoDialog(true) : router.push(tab.href)}
                                value={tab.id}
                                className={cn("flex data-[state=active]:bg-white justify-between items-center w-full px-3 py-2 text-sm",
                                    pathname?.includes(tab.href) && !tab.disabled && 'bg-muted',
                                    tab.hide && 'line-through')}
                            >
                                <div className={"flex items-center"}>

                                    <span className={cn("text-left font-normal truncate mr-2",
                                        tab.ping && 'text-primary font-bold')}>
                                            {tab.label}
                                        </span>
                                    {tab.disabled && <LockIcon className={"size-4 text-primary mr-2"}/>}
                                </div>
                                {tab.ping ? <span
                                        className="flex  text-primary gap-1 items-center ms-1 py-0.5 px-1.5 rounded-full text-xs font-medium bg-primary/10 text-gray-800 dark:bg-neutral-700 dark:text-neutral-300">

                                            <BellIcon className="size-4"/> à faire
                            </span> :
                                    <></>}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <div className="w-full px-16 py-4 ">
                        {children}
                    </div>
                </Tabs>
            </div>
        </>
    );
}



