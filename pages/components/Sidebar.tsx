'use client'
import Link from "next/link";
import {useRouter} from "next/router";
import {cn} from "@/lib/utils";
import {pages} from "@/data/pages";


export default function Sidebar() {
    const pathName = useRouter().asPath
    return <aside
        className={"absolute -translate-x-full 3xl:w-80 z-30 flex h-full max-h-screen min-h-screen w-3/4 flex-none transform flex-col overflow-y-auto border-r border-gray-150 bg-white pb-10 transition duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-900 sm:w-1/2 sm:pb-0 md:w-1/3 lg:relative lg:w-56 lg:translate-x-0 lg:bg-gray-50 lg:dark:bg-gray-900 2xl:w-72"}>
        <div className={"flex-1 px-3 py-3 space-y-2"}>
            {pages.map(({section, pages}) => (
                <ul key={section} className={"space-y-2 py-4 "}>
                    {section &&
                        <h4 className={"px-2 text-xs  text-gray-700 text-opacity-40 dark:text-white"}>{section}</h4>}
                    {pages.map(({href, label, icon: Icon}) => (
                        <li key={href} className={"flex items-stretch space-x-1 cursor-pointer"}>
                            <Link href={href}
                                  className={cn("flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-regular",
                                      pathName === href ?
                                          'text-gray-50 dark:text-gray-900 bg-gray-900' :
                                          "text-gray-900 dark:text-gray-50 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200")}>
                                <Icon className={cn("w-4 h-4 text-muted-foreground mr-2 ",
                                    pathName === href ?
                                        "text-gray-50 dark:text-gray-900" : "text-gray-900 dark:text-gray-50"
                                )}/>
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            ))}
        </div>
    </aside>
}