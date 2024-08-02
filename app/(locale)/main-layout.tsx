'use client'
import {cn} from "@/lib/utils";
import {useSidebarToggle} from "@/components/hooks/use-sidebar-toggle";
import ArticleSideBar from "@/app/(locale)/writing/components/ArticleSideBar";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

const queryClient = new QueryClient()

export default function MainLayout({children}: { children: React.ReactNode }) {
    const sidebar = useSidebarToggle()

    if (!sidebar) return null;
    return (
        <QueryClientProvider client={queryClient}>
            <div
                className={cn("flex transition-[margin-left] ease-in-out duration-300 ",
                    sidebar?.isOpen === false ? "lg:ml-[60px]" : "lg:ml-56  2xl:ml-72 3xl:ml-80")}>
                <ArticleSideBar/>
                <div className={"overflow-y-auto   w-full h-full  3xl:px-32 2xl:px-16 px-4 py-12 pb-10 md:px-8"}>

                    {children}

                </div>
            </div>
            <ReactQueryDevtools/>
        </QueryClientProvider>
    )
}