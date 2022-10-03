

export class StringBuffer {
    s: string;
    i: number;

    constructor(_s: string) {
        this.s = _s;
        this.i = 0;
    }

    public GetNextChar = (): string | null => {
        if (this.i < this.s.length) {
            const c = this.s[this.i];
            this.i += 1;
            return c;
        }
        return null;
    };

    public PeekNextChar = (): string | null => {
        if (this.i < this.s.length) {
            return this.s[this.i];
        }
        return null;
    };

    public SetCursor = (i: number) => {
        this.i = i;
    };

    public CanGetNextChar = (): boolean => this.i < this.s.length;
}
