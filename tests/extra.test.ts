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

test('massive listings', () => {
    const input = '<A><B><C><D></D></C></B></A>';
    const output = 'Correctly tagged paragraph';

    expect(checkHTML(input)).toMatch(output);

    const input1 = '<A><B></B><C></C></A>';
    const output1 = 'Correctly tagged paragraph';

    expect(checkHTML(input1)).toMatch(output1);

    const input2 = '<A><B><C></C></B></A>';
    const output2 = 'Correctly tagged paragraph';

    expect(checkHTML(input2)).toMatch(output2);

});
