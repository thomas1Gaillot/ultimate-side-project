'use client'
import MonECTabs from "@/app/(locale)/poc-enostart/components/MonECTabs";
import Overview from "@/app/(locale)/poc-enostart/components/overview/overview";
import {useState} from "react";
import {ChevronDown, ChevronUp, FootprintsIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

export default function Component() {
    const [open, setOpen] = useState(false)
    return (
        <>
            <Button className={"w-full opacity-80 hover:scale-100"} onClick={() => setOpen(!open)}>

                <FootprintsIcon className={"size-6 mr-2"}/>
                 Mon parcours
                {open ? <ChevronUp className={"size-4"}/> : <ChevronDown className={"size-4"}/>}
            </Button>
            {open && <Overview/>}
            <MonECTabs/>
        </>
    )
}

