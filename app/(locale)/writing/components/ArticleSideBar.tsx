'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {TypographyH4} from "@/components/ui/typography";
import useScreenSize from "@/hooks/use-screen-size";
import axios from "axios";
import {Skeleton} from "@/components/ui/skeleton";
import {formatDateString} from "@/lib/formatDateString";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/hooks/use-toast";
import useGetArticle from "@/domain/article/use-get-article";


export default function ArticleSideBar() {
    const pathName = usePathname()
    const {width} = useScreenSize();
    const {articles, isLoading} = useGetArticle()

    if (!(pathName?.startsWith('/writing'))) return null
    if (pathName?.startsWith('/writing/') && width < 1024) return null
    return <>
        <aside
            className={" 3xl:w-80 z-30 flex h-full max-h-screen min-h-screen w-full flex-none transform flex-col overflow-y-auto border-r border-gray-150 bg-white pb-10 transition duration-200 ease-in-out dark:border-gray-800 sm:pb-0  lg:relative lg:w-56 lg:translate-x-0 bg-gray-50 dark:bg-gray-900 2xl:w-72"}>
            <nav className={"flex-1 px-3 py-3 space-y-2"}>
                <div className={"w-full flex justify-between"}>
                    <TypographyH4>Articles</TypographyH4>

                    <NewArticleButton/>
                </div>
                <ul className={"space-y-2 "}>
                    {isLoading && <li className={"flex  gap-2 "}>
                        <Skeleton className={"w-8 h-8"}/>
                        <div className={"flex flex-col gap-2"}>
                            <Skeleton className={"w-32 h-3"}/><Skeleton className={"w-32 h-3"}/>
                        </div>
                    </li>}
                    {articles.map((article, index) => (
                        <li key={index} className={"flex items-stretch space-x-1 cursor-pointer"}>
                            <Link href={'/writing/' + article.href}
                                  className={cn("flex flex-col flex-1 space-x-3 rounded-md px-2 py-1.5 text-sm font-regular text-gray-900 dark:text-gray-50 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-gray-200",
                                      pathName?.includes(article.href) && 'bg-gray-200')}>
                                {article.name}
                                <span
                                    className={"text-xs text-gray-500 dark:text-gray-400"}>{formatDateString(article.updatedAt)}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    </>
}


const formSchema = z.object({
    title: z.string().min(2).max(100),
    article: z.string().min(10).max(10000)
})

const NewArticleButton = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            article: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        const res = await axios.post('/api/article', {
            name: values.title,
            md: values.article
        })
        if (res.status === 200) {
            toast({
                title: 'Thanks for sharing !',
            });
        }
    }

    return <Dialog>
        <DialogTrigger asChild>
            <Button size={'sm'} variant={'secondary'}>
                <PlusIcon className={"size-4 mr-1"}/>
                New Article
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Post an article</DialogTitle>
                <DialogDescription>
                    Share an idea, an article that you want to summarize or anithing you seems relevant.
                </DialogDescription>
            </DialogHeader>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="title"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input placeholder="Setup NextJS : a complete guide" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="article"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Article</FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="Add your article written with .md convention ..."
                                              className="min-h-[150px] w-full"/>
                                </FormControl>
                                <FormDescription>
                                    <Link href="/article-editor"
                                          className={" hover:text-secondary-foreground/90 underline underline-offset-2   "}
                                          prefetch={false}>
                                        Need help? Create and preview your article here.
                                    </Link>
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <Button type="submit">
                            Post Article
                        </Button>
                    </DialogFooter>
                </form>
            </Form>
        </DialogContent>
    </Dialog>
}