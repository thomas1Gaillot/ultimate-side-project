import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Textarea} from "@/components/ui/textarea";
import {SquareIcon, TabletSmartphoneIcon} from "lucide-react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";
import MarkdownPreview from "@/app/(locale)/article-editor/components/MarkdownPreview";

export default function ArticleEditorWidget({articleContent, setArticleContent}:{articleContent: string, setArticleContent(content: string): void}) {
    return (<>
        <Tabs defaultValue="withPreview" className="flex-1 p-4">
            <div className="w-full flex  justify-end mb-4">
                <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="default">
                        <SquareIcon className="h-5 w-5 mr-2"/>
                        <span>Editor</span>
                    </TabsTrigger>
                    <TabsTrigger value="withPreview">
                        <TabletSmartphoneIcon className={'h-5 w-5 mr-2'}/>
                        <span>Editor + Preview</span>
                    </TabsTrigger>
                    <TabsTrigger value="preview">
                        <TabletSmartphoneIcon className={'h-5 w-5 mr-2'}/>
                        <span>Preview</span>
                    </TabsTrigger>
                </TabsList>
            </div>

            <TabsContent value="withPreview" className="mt-0 border-0 p-0">
                <div className="flex flex-col space-y-4">
                        <ResizablePanelGroup direction="horizontal">
                            <ResizablePanel defaultSize={33} minSize={20} className={"rounded-l-md border min-w-xs"}>
                                <Textarea
                                    onChange={(e) => setArticleContent(e.target.value)}
                                    value={articleContent}
                                    placeholder="Start writing your article here..."
                                    className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px] rounded-none border-none"
                                />
                            </ResizablePanel>
                            <ResizableHandle withHandle/>
                            <ResizablePanel defaultSize={67} minSize={30} className="rounded-r-md bg-muted/40  min-w-xs p-8">
                                <MarkdownPreview content={articleContent} />
                            </ResizablePanel>
                        </ResizablePanelGroup>

                </div>
            </TabsContent>
            <TabsContent value="default">
                <div className="flex h-full flex-col space-y-4">
                    <Textarea
                        onChange={(e) => setArticleContent(e.target.value)}
                        value={articleContent}
                        placeholder="Start writing your article here..."
                        className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px] "
                    />
                </div>
            </TabsContent>
            <TabsContent value="preview" className="mt-0 border-0">
                <div className="flex h-full flex-col space-y-4">
                    <MarkdownPreview content={articleContent} />
                </div>
            </TabsContent>
        </Tabs>
    </>)
}