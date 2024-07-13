'use client'
import {useParams, useRouter} from "next/navigation";
import {presetArticles} from "@/domain/article/Article";
import MarkdownPreview from "@/app/(locale)/article-editor/components/MarkdownPreview";
import {Button} from "@/components/ui/button";
import {CornerUpLeftIcon} from "lucide-react";

export default function ArticlePage() {
    const router = useRouter();
    const params = useParams();
    const articleId = params?.['article-id']

    if (typeof articleId !== 'string') return null;

    const article = presetArticles.find(article => article.href === articleId);
    if (!article) return null;


    return (<>
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
        </>
    )
}