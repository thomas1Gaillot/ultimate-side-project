'use client'
import {TypographyH1, TypographyH4, TypographyLead} from "@/components/ui/typography";
import ArticleEditorWidget from "@/app/(locale)/article-editor/ArticleEditorWidget";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {PresetSelector} from "@/app/(locale)/article-editor/components/PresetSelector";
import {Separator} from "@/components/ui/separator";
import usePreset from "@/app/(locale)/article-editor/use-preset";
import CopyToClipboardButton from "@/components/[locale]/copy-to-clipboard-button";

export default function ArticleEditor() {
    const {selectedPreset, setSelectedPreset, articleContent, setArticleContent} = usePreset()

    return (
        <div className={"flex flex-col gap-4 pb-8"}>
            <TypographyH1>
                Article Editor
            </TypographyH1>
            <TypographyLead>
                Create and edit articles with ease by giving an .md file.
            </TypographyLead>
            <div className={"flex flex-col pt-8"}>
                <Card>
                    <CardHeader>
                        <CardTitle className={"flex w-full justify-between"}>
                            <p className="scroll-m-20 text-lg font-semibold tracking-tight text-black">Article
                                Editor</p>
                            <div className={"flex gap-2"}>
                                <PresetSelector selectedPreset={selectedPreset} setSelectedPreset={setSelectedPreset}/>
                                <CopyToClipboardButton textToCopy={articleContent}/>
                            </div>
                        </CardTitle>
                    </CardHeader>
                    <Separator/>
                    <CardContent>
                        <ArticleEditorWidget articleContent={articleContent} setArticleContent={setArticleContent}/>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}