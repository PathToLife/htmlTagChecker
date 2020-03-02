interface TagValidatorOptions {

}

const DEFAULT_OPTIONS: TagValidatorOptions = {

};

class TagValidator {

    options: TagValidatorOptions;
    tagStack = [];
    html: string;

    constructor(html: string, options?: Partial<TagValidatorOptions>) {
        this.html = html;
        this.options = {
            options,
            ...DEFAULT_OPTIONS
        }
    }

    public IsValid = (): boolean => {
        return true;
    };

    public GetResultString = (): string => {
        return '';
    };
}
