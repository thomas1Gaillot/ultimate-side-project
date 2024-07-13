'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {useEffect} from "react";
import {usePomodoro} from "@/domain/pomodoro/use-pomodoro";
import {formatSecondsToMmss} from "@/lib/format-seconds-to-mmss";
import {formatStringToXChar} from "@/lib/format-string-to-X-char";
import {presetArticles} from "@/domain/article/Article";
import {TypographyH4} from "@/components/ui/typography";


export default function ArticleSideBar() {
    const pathName = usePathname()

    const {tasks, formValues, secondsLeft} = usePomodoro();

    useEffect(() => {
        document.title = `${formatSecondsToMmss(secondsLeft)} 🍅 - ${formatStringToXChar(formValues.task, 20)}`;
    }, [secondsLeft, tasks]);

    if (!(pathName === '/writing')) return null
    return <>
        <aside
            className={"absolute -translate-x-full 3xl:w-80 z-30 flex h-full max-h-screen min-h-screen w-3/4 flex-none transform flex-col overflow-y-auto border-r border-gray-150 bg-white pb-10 transition duration-200 ease-in-out dark:border-gray-800 dark:bg-gray-900 sm:w-1/2 sm:pb-0 md:w-1/3 lg:relative lg:w-56 lg:translate-x-0 lg:bg-gray-50 lg:dark:bg-gray-900 2xl:w-72"}>
            <nav className={"flex-1 px-3 py-3 space-y-2"}>
                <TypographyH4>Articles</TypographyH4>
                <ul className={"space-y-2 "}>
                    {presetArticles.map((preset, index) => (
                        <li key={index} className={"flex items-stretch space-x-1 cursor-pointer"}>
                            <Link href={'/writing/' + preset.href}
                                  className={cn("flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-regular",
                                      pathName === preset.name ?
                                          'text-gray-50 dark:text-gray-900 bg-gray-900' :
                                          "text-gray-900 dark:text-gray-50 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200")}>
                                <preset.icon className={"size-4 mr-2"}/>
                                {preset.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    </>
}