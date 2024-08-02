'use client'
import {useParams, useRouter} from "next/navigation";
import MarkdownPreview from "@/app/(locale)/article-editor/components/MarkdownPreview";
import {Button} from "@/components/ui/button";
import {CornerUpLeftIcon} from "lucide-react";
import {useQuery} from "@tanstack/react-query";
import {fetchArticles} from "@/domain/article/fetch-articles";

export default function ArticlePage() {
    const router = useRouter();
    const params = useParams();
    const articleId = params?.['article-id']

    const { data: articles = [], error, isLoading } = useQuery({
        queryKey: ['articles'],
        queryFn: fetchArticles,
        refetchOnWindowFocus: false, // Disable refetching when the window regains focus
    });

    const article = articles.find(article => article.href === articleId);

    if (typeof articleId !== 'string') return null;
    if (!article) return null;

    return (<div className={"lg:ml-80 2xl:ml-96"}>
            <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden mb-8"
                onClick={() => router.push('/writing')}
            >
                <CornerUpLeftIcon className="h-5 w-5"/>
                <span className="sr-only">Toggle navigation menu</span>
            </Button>

            <MarkdownPreview content={article.md}/>
        </div>
    )
}