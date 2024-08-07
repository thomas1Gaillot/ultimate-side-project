import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Textarea} from "@/components/ui/textarea";
import {SquareIcon, TabletSmartphoneIcon} from "lucide-react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import MarkdownPreview from "@/app/(locale)/article-editor/components/MarkdownPreview";
import {useEffect, useRef, useState} from "react";
import MarkdownButtons from "@/app/(locale)/article-editor/components/MarkdownButtons";
import useScreenSize from "@/hooks/use-screen-size";

export default function ArticleEditorWidget({articleContent, setArticleContent}: {
    articleContent: string,
    setArticleContent(content: string): void
}) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const { width } = useScreenSize();
    const [tab, setTab] = useState('default');

    useEffect(() => {
        if (width >= 768) { // Taille md selon TailwindCSS
            setTab('withPreview');
        } else {
            setTab('default');
        }
    }, [width]);
    return (<>
        <Tabs value={tab} className="flex-1 p-4">
            <div className="w-full flex  justify-end mb-4">
                <TabsList className="grid md:grid-cols-3 grid-cols-2">
                    <TabsTrigger value="default" onClick={() => setTab('default')}>
                        <SquareIcon className="h-5 w-5 mr-2"/>
                        <span>Editor</span>
                    </TabsTrigger>
                    <TabsTrigger value="withPreview" onClick={() => setTab('withPreview')} className={'hidden md:flex'}>
                        <TabletSmartphoneIcon className={'h-5 w-5 mr-2'}/>
                        <span>Editor + Preview</span>
                    </TabsTrigger>
                    <TabsTrigger value="preview" onClick={() => setTab('preview')}>
                        <TabletSmartphoneIcon className={'h-5 w-5 mr-2'}/>
                        <span>Preview</span>
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="withPreview" className="mt-0 border-0 p-0">
                <div className="flex flex-col space-y-4">
                    <ResizablePanelGroup direction="horizontal">
                        <ResizablePanel defaultSize={50} minSize={20} className={"rounded-l-md border min-w-xs"}>
                            <MarkdownButtons textareaRef={textareaRef} articleContent={articleContent}
                                             setArticleContent={setArticleContent}/>
                            <Textarea
                                ref={textareaRef}
                                onChange={(e) => setArticleContent(e.target.value)}
                                value={articleContent}
                                placeholder="Start writing your article here..."
                                className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px] rounded-none border-none  focus-visible:ring-0"
                            />
                        </ResizablePanel>
                        <ResizableHandle withHandle/>
                        <ResizablePanel defaultSize={50} minSize={30}
                                        className="rounded-r-md bg-muted/40  min-w-xs p-8">

                            <MarkdownPreview content={articleContent}/>
                        </ResizablePanel>
                    </ResizablePanelGroup>

                </div>
            </TabsContent>
            <TabsContent value="default">
                <div className={"rounded-l-md border min-w-xs"}>
                    <MarkdownButtons textareaRef={textareaRef} articleContent={articleContent}
                                     setArticleContent={setArticleContent}/>

                    <Textarea
                        ref={textareaRef}
                        onChange={(e) => setArticleContent(e.target.value)}
                        value={articleContent}
                        placeholder="Start writing your article here..."
                        className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px] rounded-none border-none  focus-visible:ring-0"
                    />
                </div>
            </TabsContent>
            <TabsContent value="preview" className="mt-0 border-0">
                <div className="flex h-full flex-col space-y-4">
                    <MarkdownPreview content={articleContent}/>
                </div>
            </TabsContent>
        </Tabs>
    </>)
}