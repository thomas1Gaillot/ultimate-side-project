'use client'
import WarningDemarchesBanner from "@/app/(locale)/poc-enostart/components/overview/warningDemarchesBanner";
import Overview from "@/app/(locale)/poc-enostart/components/overview/overview";
import Flowchart from "@/app/(locale)/poc-enostart/my-informations/component/Flowchart";

export default function MyProject(){
    return <div className={"mt-8 grid gap-4"}>
        <WarningDemarchesBanner/>
        <Overview/>
        <Flowchart/>
        <div className={"h-72 w-full bg-gray-50 flex items-center justify-center"}>
            Mes informations / Editer mes informations
        </div>
    </div>
}
