import {checkHTML} from "../src";

test('correct no tags', () => {
    const input = 'The following text has no tags';
    const output = 'Correctly tagged paragraph';

    expect(checkHTML(input)).toMatch(output);
});

test('correct no tags', () => {
    const input = 'The following text has <dwadwaaaaaaaaaaaaaaa> </dwadwaaaaaaaaaaaaaaa> one long tag';
    const output = 'Correctly tagged paragraph';

    expect(checkHTML(input)).toMatch(output);
});

