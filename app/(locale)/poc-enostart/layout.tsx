'use client'
import MonECTabs from "@/app/(locale)/poc-enostart/components/MonECTabs";
import Overview from "@/app/(locale)/poc-enostart/components/overview/overview";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Overview/>
            <MonECTabs/>
            {children}
        </>
    )
}

