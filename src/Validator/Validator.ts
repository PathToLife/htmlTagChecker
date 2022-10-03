import {StringBuffer} from "./StringBuffer";

interface TagValidatorOptions {
    openSymbol: string,
    closeSymbol: string,
    closingTagSymbol: '/'
}

const DEFAULT_OPTIONS: TagValidatorOptions = {
    openSymbol: '<',
    closeSymbol: '>',
    closingTagSymbol: '/'
};

interface Tag {
    isClosing: boolean,
    name: string
}

// Buffer parser like system
export class TagValidator extends StringBuffer {

    options: TagValidatorOptions;
    tagStack: string[] = [];

    constructor(html: string, _options?: Partial<TagValidatorOptions>) {
        super(html);
        this.options = DEFAULT_OPTIONS;

        if (_options)
            this.options = {
                ...this.options,
                ..._options
            }
    }

    // Only returns true is name is a single length string of upper case letters
    private isValidTagName = (name: string): boolean => {
        return name.match(/^[A-Z]$/g) !== null;
    };

    // Checks if the open tag starting at position i is a real tag, else returns false
    private isNextATag = (): Tag | false => {

        // Check if Open Tag symbol
        if (this.GetNextChar() !== this.options.openSymbol) return false;

        // Check is Tag is closing
        let isClosing = false;
        if (this.PeekNextChar() === this.options.closingTagSymbol) {
            isClosing = true;
            this.GetNextChar();
        }

        // Get Tag Name
        let tagName = this.GetNextChar();
        if (!tagName || !this.isValidTagName(tagName)) return false;


        // Check is we have a closing tag;
        if (this.GetNextChar() !== this.options.closeSymbol) return false;

        return {
            isClosing: isClosing,
            name: tagName
        }
    };

    // Returns if a html string is valid or not in string format with reasons
    public GetResultString = (): string => {
        while (this.CanGetNextChar()) {
            const tag = this.isNextATag();
            if (!tag) continue;

            if (tag.isClosing) {
                const popped = this.tagStack.pop();
                if (popped !== tag.name) {
                    return `Expected ${popped ? `</${popped}>` : '#'} found </${tag.name}>`
                }
            } else {
                this.tagStack.push(tag.name)
            }
        }

        if (this.tagStack.length !== 0) {
            const tagName = this.tagStack.pop();
            return `Expected ${tagName ? `</${tagName}>` : '#'} found #`
        }

        return 'Correctly tagged paragraph';
    };

    // Returns if a html string is valid or not
    public IsValid = (): boolean => {
        return this.GetResultString() === 'Correctly tagged paragraph';
    };
}
