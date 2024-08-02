'use client'
import {useEffect, useState} from "react";
import {Article} from "@/domain/article/Article";
import useArticleEditorStore from "@/domain/article/use-article-editor-store";

export default function usePreset() {
    const [selectedPreset, setSelectedPreset] = useState<Article>()
    const {article, setArticle} = useArticleEditorStore()
    useEffect(() => {
        if (selectedPreset?.md) {
            setArticle(selectedPreset.md)
        }
    }, [selectedPreset])

    return {selectedPreset, setSelectedPreset, articleContent : article, setArticleContent : setArticle}
}