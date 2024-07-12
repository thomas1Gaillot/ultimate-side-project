import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";
import {SquareIcon, TabletSmartphoneIcon} from "lucide-react";

export default function ArticleEditorWidget() {
    return (<>
        <Tabs defaultValue="complete" className="flex-1 p-4">
                <div className="w-full flex  justify-end mb-4">
                    <TabsList className="grid grid-cols-2 max-w-sm">
                        <TabsTrigger value="complete">

                            <SquareIcon className="h-5 w-5 mr-2"/>
                            <span>Editor</span>
                        </TabsTrigger>
                        <TabsTrigger value="insert">
                            <TabletSmartphoneIcon className={'h-5 w-5 mr-2'}/>
                            <span>Editor + Preview</span>
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="complete" className="mt-0 border-0">
                    <div className="flex h-full flex-col space-y-4">
                        <Textarea
                            placeholder="Write a tagline for an ice cream shop"
                            className="min-h-[400px] flex-1 p-4 md:min-h-[700px] lg:min-h-[700px]"
                        />
                    </div>
                </TabsContent>
                <TabsContent value="insert" className="mt-0 border-0 p-0">
                    <div className="flex flex-col space-y-4">
                        <div className="grid h-full grid-rows-2 gap-6 lg:grid-cols-2 lg:grid-rows-1">
                            <Textarea
                                placeholder="We're writing to [inset]. Congrats from OpenAI!"
                                className="h-full min-h-[300px] lg:min-h-[700px] xl:min-h-[700px]"
                            />
                            <div className="rounded-md border bg-muted"></div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="edit" className="mt-0 border-0 p-0">
                    <div className="flex flex-col space-y-4">
                        <div className="grid h-full gap-6 lg:grid-cols-2">
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-1 flex-col space-y-2">
                                    <Label htmlFor="input">Input</Label>
                                    <Textarea
                                        id="input"
                                        placeholder="We is going to the market."
                                        className="flex-1 lg:min-h-[580px]"
                                    />
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="instructions">Instructions</Label>
                                    <Textarea
                                        id="instructions"
                                        placeholder="Fix the grammar."
                                    />
                                </div>
                            </div>
                            <div
                                className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[700px]"/>
                        </div>
                    </div>
                </TabsContent>
        </Tabs>
    </>)
}