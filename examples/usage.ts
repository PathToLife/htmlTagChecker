import {checkHTML} from "../src";

const input = 'The following text has <B>';

//prints: Expected </B> found #
console.log(checkHTML(input));
