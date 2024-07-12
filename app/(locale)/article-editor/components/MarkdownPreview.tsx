import React from 'react';
import {
    TypographyBlockquote,
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyH4,
    TypographyInlineCode, TypographyList,
    TypographyP,
    TypographySmall
} from '@/components/ui/typography';
import Link from "next/link";

const parseMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const boldRegex = /\*\*(.*?)\*\*/g;
    const codeBlockRegex = /```([\s\S]*?)```/g;

    const elements: JSX.Element[] = [];

    let isInCodeBlock = false;
    let codeBlockContent:string[] = [];

    lines.forEach((line, index) => {
        if (codeBlockRegex.test(line)) {
            if (!isInCodeBlock) {
                isInCodeBlock = true;
                codeBlockContent.push(line.replace(/```/, ''));
            } else {
                isInCodeBlock = false;
                codeBlockContent.push(line.replace(/```/, ''));
                elements.push(
                    <TypographyInlineCode key={index}>
                        {codeBlockContent.join('\n')}
                    </TypographyInlineCode>
                );
                codeBlockContent = [];
            }
        } else if (isInCodeBlock) {
            codeBlockContent.push(line);
        } else if (/^#\s/.test(line)) {
            elements.push(<TypographyH1 key={index}>{line.replace(/^#\s/, '')}</TypographyH1>);
        } else if (/^##\s/.test(line)) {
            elements.push(<TypographyH2 key={index}>{line.replace(/^##\s/, '')}</TypographyH2>);
        } else if (/^###\s/.test(line)) {
            elements.push(<TypographyH3 key={index}>{line.replace(/^###\s/, '')}</TypographyH3>);
        } else if (/^####\s/.test(line)) {
            elements.push(<TypographyH4 key={index}>{line.replace(/^####\s/, '')}</TypographyH4>);
        } else if (/^>\s/.test(line)) {
            elements.push(<TypographyBlockquote key={index}>{line.replace(/^>\s/, '')}</TypographyBlockquote>);
        } else if (/^`/.test(line)) {
            elements.push(<TypographyInlineCode className={"w-max"} key={index}>{line.replace(/^`/, '').replace(/`$/, '')}</TypographyInlineCode>);
        } else if (/^\*\s/.test(line)) {
            elements.push(<TypographySmall>{line.replace(/^\*\s/, '')}</TypographySmall>);
        } else if (/^\-\s/.test(line)) {
            elements.push(<ul className="ml-6 list-disc text-gray-800 [&>li]:mt-2">
                    <li key={index}>{line.replace(/^\-\s/, '')}</li>
            </ul>
        )
            ;
        } else if (linkRegex.test(line) || boldRegex.test(line)) {
            const parts = [];
            let lastIndex = 0;
            line.replace(linkRegex, (match, text, url, offset) => {
                parts.push(line.substring(lastIndex, offset));
                parts.push(<Link className="text-indigo-500 hover:underline" target="_blank" rel="noopener noreferrer" href={url} key={offset}>{text}</Link>);
                lastIndex = offset + match.length;
                return match;
            });
            line.replace(boldRegex, (match, text, offset) => {
                parts.push(line.substring(lastIndex, offset));
                parts.push(<strong key={offset}>{text}</strong>);
                lastIndex = offset + match.length;
                return match;
            });
            parts.push(line.substring(lastIndex));
            elements.push(<TypographyP key={index}>{<>parts</>}</TypographyP>);
        } else {
            elements.push(<TypographyP key={index}>{line}</TypographyP>);
        }
    });

    return elements;
};

const MarkdownPreview = ({content}: { content: string }) => {
    const parsedContent = parseMarkdown(content);

    return (
        <div className={'grid'}>
            {parsedContent}
        </div>
    );
};

export default MarkdownPreview;
