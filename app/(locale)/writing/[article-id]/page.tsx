'use client'
import {useSearchParams} from "next/navigation";
import {presetArticles} from "@/domain/article/Article";
import MarkdownPreview from "@/app/(locale)/article-editor/components/MarkdownPreview";

export default function ArticlePage() {
    const searchParams = useSearchParams();
    const articleId = searchParams?.get('article-id');
    console.log(searchParams, articleId)

    if (!articleId) return null;

    const article = presetArticles.find(article => article.href === articleId);
    console.log( article)
    if (!article) return null;


    return (
        <MarkdownPreview content={article.md}/>
    )
}