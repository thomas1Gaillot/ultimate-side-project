import React from 'react';
import {
    TypographyBlockquote,
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyH4,
    TypographyInlineCode,
    TypographyLarge,
    TypographyLead,
    TypographyMuted,
    TypographyList,
    TypographyP,
    TypographySmall,
    TypographyTable
} from '@/components/ui/typography';

const parseMarkdown = (markdown: string) => {
    const lines = markdown.split('\n');

    return lines.map((line, index) => {
        if (/^#\s/.test(line)) {
            return <TypographyH1 key={index}>{line.replace(/^#\s/, '')}</TypographyH1>;
        } else if (/^##\s/.test(line)) {
            return <TypographyH2 key={index}>{line.replace(/^##\s/, '')}</TypographyH2>;
        } else if (/^###\s/.test(line)) {
            return <TypographyH3 key={index}>{line.replace(/^###\s/, '')}</TypographyH3>;
        } else if (/^####\s/.test(line)) {
            return <TypographyH4 key={index}>{line.replace(/^####\s/, '')}</TypographyH4>;
        } else if (/^>\s/.test(line)) {
            return <TypographyBlockquote key={index}>{line.replace(/^>\s/, '')}</TypographyBlockquote>;
        } else if (/^`/.test(line)) {
            return <TypographyInlineCode key={index}>{line.replace(/^`/, '').replace(/`$/, '')}</TypographyInlineCode>;
        } else if (/^\*\s/.test(line)) {
            return <li key={index}><TypographySmall>{line.replace(/^\*\s/, '')}</TypographySmall></li>;
        } else {
            return <TypographyP key={index}>{line}</TypographyP>;
        }
    });
};

const MarkdownPreview = ({ content }:{content : string}) => {
    const parsedContent = parseMarkdown(content);

    return (
        <div>
            {parsedContent}
        </div>
    );
};

export default MarkdownPreview;
