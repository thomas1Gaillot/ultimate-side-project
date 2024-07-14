'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {TypographyH4} from "@/components/ui/typography";
import useScreenSize from "@/hooks/use-screen-size";
import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton";
import {formatDateString} from "@/lib/formatDateString";
import {toast} from "@/components/hooks/use-toast";
import useGetArticle from "@/domain/article/use-get-article";
import EditArticleButton from "@/app/(locale)/writing/components/EditArticleDialog";
import CreateArticleButton from "@/app/(locale)/writing/components/CreateArticleButton";


export default function ArticleSideBar() {
    const pathName = usePathname()
    const {width} = useScreenSize();
    const {articles, isLoading} = useGetArticle()

    const onDelete = async (articleId: string) => {
        const res = await axios.delete(`/api/article/${articleId}`);
        if (res.status === 200) {
            toast({
                title: 'Article deleted!',
            });
        }
    }

    if (!(pathName?.startsWith('/writing'))) return null
    if (pathName?.startsWith('/writing/') && width < 1024) return null
    return <>
        <aside
            className={"fixed lg:w-80 2xl:w-96 z-30 flex h-full max-h-screen overflow-hidden min-h-screen w-full flex-none transform flex-col overflow-y-auto border-r border-gray-150 bg-white pb-10 transition duration-200 ease-in-out dark:border-gray-800 sm:pb-0   lg:translate-x-0 bg-gray-50 dark:bg-gray-900"}>
            <nav className={"pl-6 flex-1 px-3 py-3 space-y-2 w-full"}>
                <div className={"w-full flex justify-between"}>
                    <TypographyH4>Articles</TypographyH4>
                    <CreateArticleButton/>
                </div>
                <ul className={"space-y-2 "}>
                    {isLoading && <li className={"flex  gap-2 "}>
                        <Skeleton className={"w-8 h-8"}/>
                        <div className={"flex flex-col gap-2"}>
                            <Skeleton className={"w-64 h-3"}/><Skeleton className={"w-32 h-3"}/>
                        </div>
                    </li>}
                    {articles.map((article, index) => (
                        <li key={index} className={"flex items-stretch space-x-1 cursor-pointer"}>
                            <Link href={'/writing/' + article.href}
                                  className={cn("flex flex-col flex-1 space-x-3 rounded-md px-4 py-2 text-sm font-light text-gray-900 dark:text-gray-50 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-200",
                                      pathName?.includes(article.href) && 'bg-gray-200')}>
                                {article.name}
                                <span
                                    className={"text-xs text-gray-500 dark:text-gray-400"}>{formatDateString(article.updatedAt)}</span>
                            </Link>
                            <EditArticleButton article={article}/>
                        </li>
                    ))}

                </ul>
            </nav>
        </aside>
    </>
}


