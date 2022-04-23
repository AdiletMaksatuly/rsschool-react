import { FormInputs } from '../types';

export const joinClasses = (...args: string[]) => {
  return args.join(' ');
};

export const haveSomeNonEmptyValues = (formValues: FormInputs) => {
  const conditions = Object.values(formValues).some((value) => {
    if (Array.isArray(value) && value.length === 0) {
      return false;
    }

    return !!value;
  });
  console.log(conditions);
  return conditions;
};
