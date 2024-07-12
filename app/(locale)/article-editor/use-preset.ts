'use client'
import {useEffect, useState} from "react";
import {Preset} from "@/app/(locale)/article-editor/data/presets";

export default function usePreset() {
    const [selectedPreset, setSelectedPreset] = useState<Preset>()
    const [articleContent, setArticleContent] = useState<string>('Start writing your article or load a preset ...')

    useEffect(() => {
        if (selectedPreset?.md) {
            setArticleContent(selectedPreset.md)
        }
    }, [selectedPreset])

    return {selectedPreset, setSelectedPreset, articleContent}
}