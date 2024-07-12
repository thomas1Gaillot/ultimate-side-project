import React from 'react';
import {
    TypographyBlockquote,
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyH4,
    TypographyInlineCode,
    TypographyP,
    TypographySmall
} from '@/components/ui/typography';
import Link from "next/link";
import { marked } from 'marked';

const renderTokens = (tokens:any) => {
    return tokens.map((token:any, index:number) => {
        switch (token.type) {
            case 'heading':
                switch (token.depth) {
                    case 1:
                        return <TypographyH1 key={index}>{token.text}</TypographyH1>;
                    case 2:
                        return <TypographyH2 key={index}>{token.text}</TypographyH2>;
                    case 3:
                        return <TypographyH3 key={index}>{token.text}</TypographyH3>;
                    case 4:
                        return <TypographyH4 key={index}>{token.text}</TypographyH4>;
                    default:
                        return <TypographyP key={index}>{token.text}</TypographyP>;
                }
            case 'paragraph':
                return <TypographyP key={index}>{renderInlineTokens(token.tokens)}</TypographyP>;
            case 'blockquote':
                return <TypographyBlockquote key={index}>{renderInlineTokens(token.tokens)}</TypographyBlockquote>;
            case 'list':
                return (
                    <ul key={index} className="ml-6 list-disc text-gray-800 [&>li]:mt-2">
                        {token.items.map((item:any, itemIndex:number) => (
                            <li key={itemIndex}>{renderInlineTokens(item.tokens)}</li>
                        ))}
                    </ul>
                );
            case 'code':
                return <TypographyInlineCode key={index}>{token.text}</TypographyInlineCode>;
            default:
                return <TypographyP key={index}>{token.text}</TypographyP>;
        }
    });
};

const renderInlineTokens = (tokens:any) => {
    return tokens.map((token:any, index:number) => {
        switch (token.type) {
            case 'text':
                return token.text;
            case 'strong':
                return <strong key={index}>{renderInlineTokens(token.tokens)}</strong>;
            case 'link':
                return (
                    <Link key={index} href={token.href} className="text-indigo-500 hover:underline" target="_blank" rel="noopener noreferrer">
                        {renderInlineTokens(token.tokens)}
                    </Link>
                );
            case 'codespan':
                return <TypographyInlineCode key={index}>{token.text}</TypographyInlineCode>;
            default:
                return token.text;
        }
    });
};

const parseMarkdown = (markdown: string) => {
    const tokens = marked.lexer(markdown);
    return renderTokens(tokens);
};

const MarkdownPreview = ({ content }: { content: string }) => {
    const parsedContent = parseMarkdown(content);

    return (
        <div className={'grid'}>
            {parsedContent}
        </div>
    );
};

export default MarkdownPreview;
