import {checkHTML} from "../src";

test('correct simple tags', () => {
    const input = 'The following text<C><B>is centred and in boldface</B></C>';
    const output = 'Correctly tagged paragraph';

    expect(checkHTML(input)).toMatch(output);
});

test('correct ignore bad tags', () => {
    const input = '<B>This <\\g>is <B>boldface</B> in <<*> a</B> <\\6> <<d>sentence';
    const output = 'Correctly tagged paragraph';

    expect(checkHTML(input)).toMatch(output);
});

test('detect wrong tag nesting', () => {
    const input = '<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>';
    const output = 'Expected </C> found </B>';

    expect(checkHTML(input)).toMatch(output);
});

test('detect wrong extra closing tag', () => {
    const input = '<B>This should be in boldface, but there is an extra closing tag</B></C>';
    const output = 'Expected # found </C>';

    expect(checkHTML(input)).toMatch(output);
});

test('detect missing close tag', () => {
    const input = '<B><C>This should be centred and in boldface, but there is a missing closing tag</C>';
    const output = 'Expected </B> found #';

    expect(checkHTML(input)).toMatch(output);
});
