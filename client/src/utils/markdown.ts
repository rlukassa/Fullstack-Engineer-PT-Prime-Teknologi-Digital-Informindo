import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked options
marked.setOptions({
    breaks: true,        // Convert \n to <br>
    gfm: true,          // GitHub Flavored Markdown
});

/**
 * Parse markdown to HTML and sanitize output
 */
export const parseMarkdown = (markdown: string): string => {
    if (!markdown) return '';
    
    try {
        const html = marked.parse(markdown) as string;
        // Sanitize to prevent XSS
        return DOMPurify.sanitize(html, {
            ALLOWED_TAGS: [
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'p', 'br', 'hr',
                'ul', 'ol', 'li',
                'strong', 'em', 'del', 's',
                'blockquote', 'pre', 'code',
                'a', 'img',
                'table', 'thead', 'tbody', 'tr', 'th', 'td',
                'span', 'div'
            ],
            ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'target', 'rel']
        });
    } catch (error) {
        console.error('Markdown parsing error:', error);
        return markdown;
    }
};

/**
 * Check if content contains markdown syntax
 */
export const hasMarkdown = (text: string): boolean => {
    const markdownPatterns = [
        /^#{1,6}\s/m,           // Headers
        /\*\*.+\*\*/,           // Bold
        /\*.+\*/,               // Italic
        /~~.+~~/,               // Strikethrough
        /`[^`]+`/,              // Inline code
        /```[\s\S]*```/,        // Code blocks
        /^\s*[-*+]\s/m,         // Unordered lists
        /^\s*\d+\.\s/m,         // Ordered lists
        /\[.+\]\(.+\)/,         // Links
        /!\[.*\]\(.+\)/,        // Images
        /^\s*>/m,               // Blockquotes
        /^\s*---\s*$/m,         // Horizontal rule
    ];
    
    return markdownPatterns.some(pattern => pattern.test(text));
};

export default {
    parseMarkdown,
    hasMarkdown
};
