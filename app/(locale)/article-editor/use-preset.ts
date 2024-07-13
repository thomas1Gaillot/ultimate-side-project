'use client'
import {useEffect, useState} from "react";
import {Article} from "@/domain/article/Article";

export default function usePreset() {
    const [selectedPreset, setSelectedPreset] = useState<Article>()
    const [articleContent, setArticleContent] = useState<string>('')

    useEffect(() => {
        if (selectedPreset?.md) {
            setArticleContent(selectedPreset.md)
        }
    }, [selectedPreset])

    return {selectedPreset, setSelectedPreset, articleContent, setArticleContent}
}