'use client'
import MonECTabs from "@/app/(locale)/poc-enostart/components/MonECTabs";
import Overview from "@/app/(locale)/poc-enostart/components/overview/overview";
import {Button} from "@/components/ui/button";
import {QuestionMarkCircledIcon} from "@radix-ui/react-icons";
import {CodepenIcon} from "lucide-react";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header/>
            <Overview/>
            <div className={"3xl:px-32 2xl:px-16 px-4  md:px-8"}>
                <MonECTabs/>
                {children}
            </div>
        </>
    )
}

function Header() {
    return (
        <header className="h-[60px] border-b border-gray-200 bg-white px-8 flex items-center justify-between">
            <div className="flex items-center">
                <CodepenIcon className="size-8 text-green-600 mr-2"/>
                <span className="text-gray-800 font-semibold text-sm">{"Mon énergie collective"}</span>
            </div>
            <div className="flex items-center space-x-4">
                <Button variant="ghost" className="text-gray-600 flex items-center">
                    <QuestionMarkCircledIcon className="mr-2 h-4 w-4"/>
                    {"Centre d'aide"}
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                    <span className="sr-only">User profile</span>
                    <div
                        className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                        J
                    </div>
                </Button>
            </div>
        </header>
    )
}