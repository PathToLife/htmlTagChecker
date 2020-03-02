import {checkHTML} from "../src";

test('correct no tags', () => {
    const input = 'The following text has no tags';
    const output = 'Correctly tagged paragraph';

    expect(checkHTML(input)).toMatch(output);
});

test('correct ignore invalid tags', () => {
    const input = 'The following text has <ddawda> </dda> random invalid tags';
    const output = 'Correctly tagged paragraph';

    expect(checkHTML(input)).toMatch(output);
});

test('detect missing tag end', () => {
    const input = 'The following text has <B>';
    const output = 'Expected </B> found #';

    expect(checkHTML(input)).toMatch(output);
});

test('empty string valid', () => {
    const input = '';
    const output = 'Correctly tagged paragraph';

    expect(checkHTML(input)).toMatch(output);
});

