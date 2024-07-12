import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    Heading4Icon,
    BoldIcon,
    CodeIcon,
    ListIcon,
    LinkIcon,
    QuoteIcon,
    CaseLowerIcon
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function MarkdownButtons({ textareaRef, articleContent, setArticleContent }: {
    textareaRef: React.RefObject<HTMLTextAreaElement>,
    articleContent: string,
    setArticleContent(content: string): void
}) {
    const addMarkdownToCursorPosition = (markdown: string) => {
        const textarea = textareaRef.current;
        if (textarea) {
            const startPos = textarea.selectionStart;
            const endPos = textarea.selectionEnd;
            const newValue = articleContent.substring(0, startPos) + `\n${markdown}\n` + articleContent.substring(endPos);
            setArticleContent(newValue);

            // Move the cursor after the inserted text
            setTimeout(() => {
                textarea.setSelectionRange(startPos + `\n${markdown}\n`.length, startPos + `\n${markdown}\n`.length);
                textarea.focus();
            }, 0);
        }
    };

    return (
        <>
            <div className={"flex flex-wrap gap-1 p-2"}>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={() => addMarkdownToCursorPosition('# An H1 title')} variant="ghost" size="icon">
                                <Heading1Icon className="size-4" />
                                <span className="sr-only">Add Heading 1 Title</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Add Heading 1 Title</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={() => addMarkdownToCursorPosition('## An H2 title')} variant="ghost" size="icon">
                                <Heading2Icon className="size-4" />
                                <span className="sr-only">Add Heading 2 Title</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Add Heading 2 Title</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={() => addMarkdownToCursorPosition('### An H3 title')} variant="ghost" size="icon">
                                <Heading3Icon className="size-4" />
                                <span className="sr-only">Add Heading 3 Title</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Add Heading 3 Title</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={() => addMarkdownToCursorPosition('#### An H4 title')} variant="ghost" size="icon">
                                <Heading4Icon className="size-4" />
                                <span className="sr-only">Add Heading 4 Title</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Add Heading 4 Title</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={() => addMarkdownToCursorPosition('**bold text**')} variant="ghost" size="icon">
                                <BoldIcon className="size-4" />
                                <span className="sr-only">Add Bold Text</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Add Bold Text</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={() => addMarkdownToCursorPosition('`inline code`')} variant="ghost" size="icon">
                                <CodeIcon className="size-4" />
                                <span className="sr-only">Add Inline Code</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Add Inline Code</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={() => addMarkdownToCursorPosition('- list item')} variant="ghost" size="icon">
                                <ListIcon className="size-4" />
                                <span className="sr-only">Add List Item</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Add List Item</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={() => addMarkdownToCursorPosition('[link](https://example.com)')} variant="ghost" size="icon">
                                <LinkIcon className="size-4" />
                                <span className="sr-only">Add Link</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Add Link</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button onClick={() => addMarkdownToCursorPosition('> blockquote')} variant="ghost" size="icon">
                                <QuoteIcon className="size-4" />
                                <span className="sr-only">Add Blockquote</span>
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Add Blockquote</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <Separator />
        </>
    );
}
