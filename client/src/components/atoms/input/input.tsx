import { ChangeEvent, FC, useState } from 'react';
import { validate, VALIDATOR_REQUIRE } from '../../../util';
import classes from './input.module.scss';

type Props = {
  onChange: any;
  initialValue?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  errorMessage?: string;
};

export const Input: FC<Props> = ({
  type = 'text',
  initialValue,
  placeholder,
  className,
  onChange,
  errorMessage,
}) => {
  const [inputState, setInputState] = useState({
    value: initialValue || '',
    isValid: true,
  });

  const { value, isValid } = inputState;

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    // update parent state
    onChange(event);

    // update component state
    setInputState((prevState) => ({
      ...prevState,
      value: event.target.value,
      isValid: validate(event.target.value, [VALIDATOR_REQUIRE()]),
    }));
  };

  return (
    <div className={`${classes['input-wrapper']} ${className}`}>
      <input
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={inputChangeHandler}
        className={`${classes['input']} ${
          !isValid && classes['input--invalid']
        }`}
      />
      {!isValid && <p className={classes['error-message']}>{errorMessage}</p>}
    </div>
  );
};
