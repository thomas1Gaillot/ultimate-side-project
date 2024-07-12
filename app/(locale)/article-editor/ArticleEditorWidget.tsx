import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Textarea} from "@/components/ui/textarea";
import {SquareIcon, TabletSmartphoneIcon} from "lucide-react";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable";

export default function ArticleEditorWidget() {
    return (<>
        <Tabs defaultValue="withPreview" className="flex-1 p-4">
            <div className="w-full flex  justify-end mb-4">
                <TabsList className="grid grid-cols-2 max-w-sm">
                    <TabsTrigger value="withPreview">
                        <TabletSmartphoneIcon className={'h-5 w-5 mr-2'}/>
                        <span>Editor + Preview</span>
                    </TabsTrigger>
                    <TabsTrigger value="default">

                        <SquareIcon className="h-5 w-5 mr-2"/>
                        <span>Editor</span>
                    </TabsTrigger>

                </TabsList>
            </div>

            <TabsContent value="withPreview" className="mt-0 border-0 p-0">
                <div className="flex flex-col space-y-4">
                        <ResizablePanelGroup direction="horizontal">
                            <ResizablePanel className={"rounded-l-md border"}>
                                <Textarea
                                    placeholder="Start writing your article here..."
                                    className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px] rounded-none border-none"
                                />
                            </ResizablePanel>
                            <ResizableHandle withHandle/>
                            <ResizablePanel className="rounded-r-md bg-muted">
                            </ResizablePanel>
                        </ResizablePanelGroup>

                </div>
            </TabsContent>
            <TabsContent value="default" className="mt-0 border-0">
                <div className="flex h-full flex-col space-y-4">
                    <Textarea
                        placeholder="Write a tagline for an ice cream shop"
                        className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                    />
                </div>
            </TabsContent>
        </Tabs>
    </>)
}