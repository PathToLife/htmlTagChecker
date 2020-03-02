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
export class TagValidator {

    options: TagValidatorOptions;
    tagStack: string[] = [];

    html: string; // Buffer context
    i: number; // Buffer index

    constructor(html: string, _options?: Partial<TagValidatorOptions>) {
        this.html = html;
        this.i = 0;
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
        if (this.html[this.i] !== this.options.openSymbol) return false;
        this.i += 1;

        // Check is Tag is closing
        let isClosing = false;
        if (this.html[this.i] === this.options.closingTagSymbol) {
            isClosing = true;
            this.i += 1;
        }

        // Check is we have a valid tag name
        if (!this.isValidTagName(this.html[this.i])) return false;
        const tagName = this.html[this.i];
        this.i += 1;

        // Check is we have a closing tag;
        if (this.html[this.i] !== this.options.closeSymbol) return false;

        
    };


    private processTag = (): boolean => {
        // check if is tag, then add or pop from queue
        const tagName = this.isNextATag();
        if (!tagName) return true;


    };

    // Returns if a html string is valid or not
    public IsValid = (): boolean => {

        for (this.i; this.i < this.html.length; this.i++) {
            const s = this.html[this.i];

            if (s == this.options.openSymbol) {
                const res = this.processTag();
                if (!res) return false;
            }
        }

        return this.tagStack.length === 0;
    };

    public GetResultString = (): string => {
        return '';
    };
}
