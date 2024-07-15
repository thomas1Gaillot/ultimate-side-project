'use client'
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {ExternalLinkIcon, LucideProps, Menu} from "lucide-react";
import {Sheet, SheetClose, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import {usePages} from "@/app/(locale)/data/usePages";
import {ForwardRefExoticComponent, RefAttributes, useEffect} from "react";
import {usePomodoro} from "@/domain/pomodoro/use-pomodoro";
import {formatSecondsToMmss} from "@/lib/format-seconds-to-mmss";
import {formatStringToXChar} from "@/lib/format-string-to-X-char";
import {useSidebarToggle} from "@/components/hooks/use-sidebar-toggle";
import {SidebarToggle} from "@/app/(locale)/components/sidebar-toggle";
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Image from "next/image";


export default function Sidebar() {
    const pages = usePages()
    const pathName = usePathname()
    const sidebar = useSidebarToggle()
    const router = useRouter()

    const {tasks, formValues, secondsLeft} = usePomodoro();

    useEffect(() => {
        document.title = `${formatSecondsToMmss(secondsLeft)} 🍅 - ${formatStringToXChar(formValues.task, 20)}`;
    }, [secondsLeft, tasks]);

    if (!sidebar) return null;

    return <>

        <aside
            className={cn("z-40 fixed  h-screen border bg-background -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300",
                sidebar?.isOpen === false ? "w-[60px]" : "w-3/4  sm:w-1/2  lg:w-56  2xl:w-72 3xl:w-80 ")}>
            <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen}/>

            <nav className={"flex-1 px-3 py-3 space-y-2"}>
                <Button onClick={() => router.push('/home')} variant={'ghost'} size={'icon'}>
                    <Image alt={'avocado-icon'} src={'/avocado.ico'} width={24} height={24}/>
                </Button>
                    {pages.map(({section, pages}) => (
                        <ul key={section} className={"space-y-2 py-4 "}>
                            {section &&
                                <h4 className={"px-2 text-xs  text-gray-700 text-opacity-40 dark:text-white"}>
                                    {sidebar?.isOpen ? section : <DotsHorizontalIcon className={"size-3"}/>}
                                </h4>}
                            {pages.map(({href, label, icon: Icon, newTab}) => (
                                <li key={href} className={"flex items-stretch space-x-1 cursor-pointer"}>

                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger className={'w-full'}>
                                                <Link target={newTab ? '_blank' : ''} href={href}
                                                      className={cn("flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-regular",
                                                          pathName?.startsWith(href) ?
                                                              'text-gray-50 dark:text-gray-900 bg-gray-900' :
                                                              "text-gray-900 dark:text-gray-50 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200")}>
                                                    <Icon
                                                        className={cn("w-4 h-4 min-h-4 min-w-4 text-muted-foreground mr-2 ",
                                                            pathName?.startsWith(href) ?
                                                                "text-gray-50 dark:text-gray-900" : "text-gray-900 dark:text-gray-50"
                                                        )}/>
                                                    {sidebar?.isOpen && <>{label}</>}
                                                    {newTab && <ExternalLinkIcon className={'size-4'}/>}
                                                </Link>
                                            </TooltipTrigger>
                                            <TooltipContent side={'right'}>
                                                {label}
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
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
            icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>,
            newTab : boolean
        }[]
    }[]
}) => {
    if (pathName.startsWith('/writing/')) return null

    return <header
        className="lg:hidden flex sticky top-0 mt-4 mb-2  h-16 items-center gap-4 bg-background px-4 lg:px-6">
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
                            {pages.map(({href, label, icon: Icon, newTab}) => (

                                <li key={href} className={"flex items-stretch space-x-1 cursor-pointer"}>
                                    <SheetClose asChild>
                                        <Link target={newTab ? '_blank' : ''} href={href}
                                              className={cn("flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-regular",
                                                  pathName?.startsWith(href) ?
                                                      'text-gray-50 dark:text-gray-900 bg-gray-900' :
                                                      "text-gray-900 dark:text-gray-50 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200")}>
                                            <Icon className={cn("w-4 h-4 text-muted-foreground mr-2 ",
                                                pathName?.startsWith(href) ?
                                                    "text-gray-50 dark:text-gray-900" : "text-gray-900 dark:text-gray-50"
                                            )}/>
                                            {label}
                                            {newTab && <ExternalLinkIcon className={'size-4'}/>}
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