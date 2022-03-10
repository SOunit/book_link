import { useState } from 'react';

type EditUserFormInput = {
  name: { value: string; isValid: boolean };
  about?: { value: string; isValid: boolean };
  isValid: boolean;
};

export const useValidateForm = () => {
  const [formInputs, setFormInputs] = useState<EditUserFormInput>();

  const updateFormInputs = (id: string, value: string, isValid: boolean) => {
    let formIsValid = true;

    formIsValid = formIsValid && isValid;

    setFormInputs((prevState) => ({
      ...prevState!,
      [id]: {
        value,
        isValid,
      },
      isValid: formIsValid,
    }));
  };

  return {
    formInputs,
    updateFormInputs,
    setFormInputs,
  };
};
