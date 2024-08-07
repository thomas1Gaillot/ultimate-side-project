"use client"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import axios from "axios";
import {toast} from "@/components/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {DotsVerticalIcon} from "@radix-ui/react-icons";
import {Article} from "@/domain/article/Article";
import {useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const formSchema2 = z.object({
    title: z.string().min(2).max(100),
    article: z.string().min(10).max(10000)
})

const EditArticleButton = ({article}: { article: Article, }) => {

    const [open, setOpen] = useState(false)
    const form2 = useForm<z.infer<typeof formSchema2>>({
        resolver: zodResolver(formSchema2),
        defaultValues: {
            title: article.name,
            article: article.md
        }
    })

    const queryClient = useQueryClient();
    // Define the mutation using useMutation
    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema2>) => {
            // API call to update the article
            const res = await axios.put(`/api/article/${article.id}`, {
                name: values.title,
                md: values.article,
            });
            return res.data;
        },
        onSuccess: () => {
            // Invalidate the articles query to refresh the list
            queryClient.invalidateQueries({queryKey : ['articles']});
            toast({
                title: 'Article updated successfully!',
            });
            setOpen(false);
        },
        onError: (error: any) => {
            console.error('Error updating article:', error);
            toast({
                title: 'Failed to update article.',
                description: error?.message || 'An error occurred.',
                variant: 'destructive',
            });
        },
    });


    const onSubmit = async (values: z.infer<typeof formSchema2>) => {
        mutation.mutate(values);
    };

    return <>
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size={'icon'} className={'h-12'}>
                    <span className="sr-only">Edit</span>
                    <DotsVerticalIcon className="h-4 w-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit an article</DialogTitle>
                    <DialogDescription>
                        Share an idea, an article that you want to summarize or anithing you seems relevant.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form2} >
                    <form onSubmit={form2.handleSubmit(onSubmit)}>
                        <FormField
                            control={form2.control}
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
                            control={form2.control}
                            name="article"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Article</FormLabel>
                                    <FormControl>
                                        <Textarea {...field}
                                                  placeholder="Add your article written with .md convention ..."
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
                            <Button type="submit" loading={mutation.isPending} disabled={mutation.isPending}>
                                Edit Article
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    </>

}

export default EditArticleButton;