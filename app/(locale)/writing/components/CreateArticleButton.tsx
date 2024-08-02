"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "@/components/hooks/use-toast";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const formSchema = z.object({
    title: z.string().min(2).max(100),
    article: z.string().min(10).max(10000),
});

const CreateArticleButton = () => {
    const [open, setOpen] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            article: "",
        },
    });

    // Access the QueryClient instance
    const queryClient = useQueryClient();

    // Define the mutation using useMutation
    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            // API call to create a new article
            const res = await axios.post('/api/article', {
                name: values.title,
                md: values.article,
            });
            return res.data;
        },
        onSuccess: () => {
            // Invalidate the articles query to refresh the list
            queryClient.invalidateQueries({ queryKey: ['articles'] });
            toast({
                title: 'Thanks for sharing!',
            });
            setOpen(false);
        },
        onError: (error: any) => {
            console.error('Error creating article:', error);
            toast({
                title: 'Failed to create article.',
                description: error?.message || 'An error occurred.',
                variant: 'destructive',
            });
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        mutation.mutate(values);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={'sm'} variant={'secondary'}>
                    <PlusIcon className={"size-4 mr-1"} />
                    New Article
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Post an article</DialogTitle>
                    <DialogDescription>
                        Share an idea, an article that you want to summarize, or anything you deem relevant.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Setup NextJS: a complete guide" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="article"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Article</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Add your article written with .md convention ..."
                                            className="min-h-[150px] w-full"
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        <Link
                                            href="/article-editor"
                                            className={" hover:text-secondary-foreground/90 underline underline-offset-2 "}
                                            prefetch={false}
                                        >
                                            Need help? Create and preview your article here.
                                        </Link>
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit"  loading={mutation.isPending} disabled={mutation.isPending}>
                                Post Article
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateArticleButton;
