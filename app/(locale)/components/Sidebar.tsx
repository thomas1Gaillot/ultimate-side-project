'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {LucideProps, Menu} from "lucide-react";
import {Sheet, SheetClose, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {usePages} from "@/app/(locale)/data/usePages";
import {ForwardRefExoticComponent, RefAttributes, useEffect} from "react";
import {usePomodoro} from "@/domain/pomodoro/use-pomodoro";
import {formatSecondsToMmss} from "@/lib/format-seconds-to-mmss";
import {formatStringToXChar} from "@/lib/format-string-to-X-char";


export default function Sidebar() {
    const pages = usePages()
    const pathName = usePathname()

    const {tasks, formValues, secondsLeft} = usePomodoro();

    useEffect(() => {
        document.title = `${formatSecondsToMmss(secondsLeft)} 🍅 - ${formatStringToXChar(formValues.task, 20)}`;
    }, [secondsLeft, tasks]);

    return <>
        <aside
            className={"absolute -translate-x-full 3xl:w-80 z-30 flex h-full max-h-screen min-h-screen w-3/4 flex-none transform flex-col overflow-y-auto border-r border-gray-150 bg-white pb-10 transition duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-900 sm:w-1/2 sm:pb-0 md:w-1/3 lg:relative lg:w-56 lg:translate-x-0 lg:bg-gray-50 lg:dark:bg-gray-900 2xl:w-72"}>
            <nav className={"flex-1 px-3 py-3 space-y-2"}>
                {pages.map(({section, pages}) => (
                    <ul key={section} className={"space-y-2 py-4 "}>
                        {section &&
                            <h4 className={"px-2 text-xs  text-gray-700 text-opacity-40 dark:text-white"}>{section}</h4>}
                        {pages.map(({href, label, icon: Icon}) => (
                            <li key={href} className={"flex items-stretch space-x-1 cursor-pointer"}>
                                <Link href={href}
                                      className={cn("flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-regular",
                                          pathName?.startsWith(href) ?
                                              'text-gray-50 dark:text-gray-900 bg-gray-900' :
                                              "text-gray-900 dark:text-gray-50 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200")}>
                                    <Icon className={cn("w-4 h-4 text-muted-foreground mr-2 ",
                                        pathName?.startsWith(href) ?
                                            "text-gray-50 dark:text-gray-900" : "text-gray-900 dark:text-gray-50"
                                    )}/>
                                    {label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                ))}
            </nav>
        </aside>
        {pathName && <MobileSidebar pathName={pathName} pages={pages}/>}
    </>
}


const MobileSidebar = ({pathName, pages}: {
    pathName: string,
    pages: {
        section: string
        pages: {
            href: string
            label: string
            icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
        }[]
    }[]
}) => {
    if(pathName.startsWith('/writing/')) return null

    return <header className="lg:hidden flex sticky top-0 mt-4 mb-2  h-16 items-center gap-4 bg-background px-4 lg:px-6">
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 lg:hidden"
                >
                    <Menu className="h-5 w-5"/>
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className={" overflow-y-auto space-y-2 px-3 py-3"}>
                <nav className={"flex-1  "}>
                    {pages.map(({section, pages}) => (
                        <ul key={section} className={"space-y-2 py-4 first:mt-4"}>
                            {section &&
                                <h4 className={"px-2 text-xs  text-gray-700 text-opacity-40 dark:text-white"}>{section}</h4>}
                            {pages.map(({href, label, icon: Icon}) => (

                                <li key={href} className={"flex items-stretch space-x-1 cursor-pointer"}>
                                    <SheetClose asChild>
                                        <Link href={href}
                                              className={cn("flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-regular",
                                                  pathName?.startsWith(href) ?
                                                      'text-gray-50 dark:text-gray-900 bg-gray-900' :
                                                      "text-gray-900 dark:text-gray-50 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200")}>
                                            <Icon className={cn("w-4 h-4 text-muted-foreground mr-2 ",
                                                pathName?.startsWith(href) ?
                                                    "text-gray-50 dark:text-gray-900" : "text-gray-900 dark:text-gray-50"
                                            )}/>
                                            {label}
                                        </Link>
                                    </SheetClose>
                                </li>

                            ))}
                        </ul>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    </header>
}