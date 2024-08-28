'use client'
import {cn} from "@/lib/utils";
import {useSidebarToggle} from "@/components/hooks/use-sidebar-toggle";
import ArticleSideBar from "@/app/(locale)/writing/components/ArticleSideBar";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {usePathname} from "next/navigation";

const queryClient = new QueryClient()

export default function MainLayout({children}: { children: React.ReactNode }) {
    const sidebar = useSidebarToggle()
const pathName=usePathname()
    if (!sidebar) return null;
    return (
        <QueryClientProvider client={queryClient}>
            <div
                className={cn("flex transition-[margin-left] ease-in-out duration-300 ",
                    sidebar?.isOpen === false ? "lg:ml-[60px]" : "lg:ml-56  2xl:ml-72 3xl:ml-80")}>
                <ArticleSideBar/>
                <div className={cn("overflow-y-auto   w-full h-full  3xl:px-32 2xl:px-16 px-4 py-12 pb-10 md:px-8",
                    pathName?.includes('poc-enostart') && 'p-0 md:p-0 xl:p-0 2xl:p-0 3xl:p-0')}>
                    {children}

                </div>
            </div>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    )
}