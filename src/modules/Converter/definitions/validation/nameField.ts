// import {NameValidation} from '../types/index';

export const checkNameField = () => {
  return {
    validate: {
      //  Max length after replacing start space and replace inner spaces with one space
      maxLength: (value: string) =>
        value.trimStart().replace(/  +/g, ' ').length <= 32 ||
        'Company name length  should be between 3 and 32 characters.',

      //  check length after replacing start space and replace inner spaces with one space
      required: (value: string) =>
        value.trimStart().replace(/  +/g, ' ').length !== 0 || 'Company name field is required.',

      //  Min length after replacing start space and replace inner spaces with one space
      minLength: (value: string) =>
        value.trimStart().replace(/  +/g, ' ').length >= 3 ||
        'Company name length should be between 3 and 32 characters.',

      // error on two characters with final space
      endSpace: (value: string) =>
        value.trim().length >= 3 || 'Company name length should be between 3 and 32 characters.',

      // error on two characters with final space
      hasInvalidCharacter: (value: string) =>
        !value.includes('\\') || 'Topic name contains invalid character!',

      // // Check if name already exists
      // duplicationValidate: (value: string) =>
      //   data.checkCompanyName({name: value.trim().replace(/  +/g, ' ')}) ||
      //   'This Company name is already used in your project.',
    },
  };
};
