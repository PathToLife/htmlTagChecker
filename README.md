# HTML Tag Checker <>(^_^)</>

Validates <> </> tags according to a problem brief

### Warning
This package was created for the purposes of a interview,
there exists much better validation tools on the npm package website already :)

This tag checker won't validate tags with more than one character in the name..

`<A></A> will be checked, but <AA></AA> is ignored` 

### Commands

You can replace `npm` with `yarn`

**Run Tests**

 `npm run test`

### Usage

```typescript
import {checkHTML} from "../src";

const input = 'The following text has <B>';

//prints: Expected </B> found #
console.log(checkHTML(input))
```
 
