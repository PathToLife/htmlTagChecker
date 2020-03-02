import {TagValidator} from "./Validator/Validator";

export const checkHTML = (html: string) => {

    const checker = new TagValidator(html);

    return checker.GetResultString();
};
