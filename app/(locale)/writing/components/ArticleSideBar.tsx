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
import useScreenSize from "@/hooks/use-screen-size";


export default function ArticleSideBar() {
    const pathName = usePathname()
    const {tasks, formValues, secondsLeft} = usePomodoro();
    const {width} = useScreenSize();
    useEffect(() => {
        document.title = `${formatSecondsToMmss(secondsLeft)} 🍅 - ${formatStringToXChar(formValues.task, 20)}`;
    }, [secondsLeft, tasks]);
    console.log(pathName, width)
    if (!(pathName?.startsWith('/writing'))) return null
    if (pathName?.startsWith('/writing/') && width < 768) return null
    return <>
        <aside
            className={" 3xl:w-80 z-30 flex h-full max-h-screen min-h-screen w-full flex-none transform flex-col overflow-y-auto border-r border-gray-150 bg-white pb-10 transition duration-200 ease-in-out dark:border-gray-800 sm:pb-0  lg:relative lg:w-56 lg:translate-x-0 bg-gray-50 dark:bg-gray-900 2xl:w-72"}>
            <nav className={"flex-1 px-3 py-3 space-y-2"}>
                <TypographyH4>Articles</TypographyH4>
                <ul className={"space-y-2 "}>
                    {presetArticles.map((preset, index) => (
                        <li key={index} className={"flex items-stretch space-x-1 cursor-pointer"}>
                            <Link href={'/writing/' + preset.href}
                                  className={cn("flex flex-col flex-1 space-x-3 rounded-md px-2 py-1.5 text-sm font-regular text-gray-900 dark:text-gray-50 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-200",
                                      pathName?.includes(preset.href) && 'bg-gray-200')}>
                                <div className={"flex w-full items-center "}>
                                    <preset.icon className={"size-4 mr-2"}/>
                                    {preset.name}
                                </div>
                                <span
                                    className={"pl-3 text-xs text-gray-500 dark:text-gray-400"}>{preset.updatedAt}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    </>
}