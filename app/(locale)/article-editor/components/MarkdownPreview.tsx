import React from 'react';
import {
    TypographyBlockquote,
    TypographyCodeBlock,
    TypographyH1,
    TypographyH2,
    TypographyH3,
    TypographyH4,
    TypographyInlineCode,
    TypographyP
} from '@/components/ui/typography';
import Link from "next/link";
import {marked} from 'marked';
import he from 'he';

const renderTokens = (tokens: any) => {
    return tokens.map((token: any, index: number) => {
        switch (token.type) {
            case 'heading':
                switch (token.depth) {
                    case 1:
                        return <TypographyH1 key={index}>{renderInlineTokens(token.tokens)}</TypographyH1>;
                    case 2:
                        return <TypographyH2 key={index}>{renderInlineTokens(token.tokens)}</TypographyH2>;
                    case 3:
                        return <TypographyH3 key={index}>{renderInlineTokens(token.tokens)}</TypographyH3>;
                    case 4:
                        return <TypographyH4 key={index}>{renderInlineTokens(token.tokens)}</TypographyH4>;
                    default:
                        return <TypographyP key={index}>{renderInlineTokens(token.tokens)}</TypographyP>;
                }
            case 'paragraph':
                return <TypographyP key={index}>{renderInlineTokens(token.tokens)}</TypographyP>;
            case 'blockquote':
                return <TypographyBlockquote key={index}>{renderInlineTokens(token.tokens)}</TypographyBlockquote>;
            case 'list':
                return (
                    <ul key={index} className="ml-6 list-disc text-gray-800 [&>li]:mt-2">
                        {token.items.map((item: any, itemIndex: number) => (
                            <li key={itemIndex}>{renderInlineTokens(item.tokens)}</li>
                        ))}
                    </ul>
                );
            case 'code':
                if (token.text.includes('\n')) {
                    return <TypographyCodeBlock key={index}>{he.decode(token.text)}</TypographyCodeBlock>;
                } else {
                    return <TypographyInlineCode key={index}>{he.decode(token.text)}</TypographyInlineCode>;
                }
            case 'image':
                return (
                    <div key={index} className="relative w-full h-auto">
                        <img
                            src={token.href}
                            alt={he.decode(token.text)}
                            className="w-full h-auto"
                        />
                    </div>
                );
            default:
                return <TypographyP key={index}>{renderInlineTokens(token.tokens)}</TypographyP>;
        }
    });
};

const renderInlineTokens = (tokens: any) => {
    return tokens?.map((token: any, index: number) => {
        switch (token.type) {
            case 'text':
                if (token.tokens && token.tokens.length > 0) {
                    return <span key={index}>{renderInlineTokens(token.tokens)}</span>;
                }
                return he.decode(token.text);
            case 'strong':
                return <strong key={index}>{renderInlineTokens(token.tokens)}</strong>;
            case 'link':
                return (
                    <Link key={index} href={token.href} className="text-primary hover:underline" target="_blank"
                          rel="noopener noreferrer">
                        {renderInlineTokens(token.tokens)}
                    </Link>
                );
            case 'codespan':
                return <TypographyInlineCode key={index}>{he.decode(token.text)}</TypographyInlineCode>;
            case 'image':
                return (
                    <span key={index} className="relative inline-block w-auto h-auto">
                        <img
                            src={token.href}
                            alt={he.decode(token.text)}
                            className="inline w-auto h-auto"
                        />
                    </span>
                );
            default:
                return he.decode(token.text);
        }
    });
};

const parseMarkdown = (markdown: string) => {
    const tokens = marked.lexer(markdown);
    return renderTokens(tokens);
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
