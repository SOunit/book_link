import { FC, Fragment, useState } from 'react';
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
  initialValue = '',
  placeholder,
  className,
  onChange,
  errorMessage,
}) => {
  const [inputState, setInputState] = useState({
    value: initialValue || '',
    isValid: false,
  });

  return (
    <div className={`${classes['input-wrapper']} ${className}`}>
      <input
        placeholder={placeholder}
        type={type}
        value={initialValue}
        onChange={onChange}
        className={`${classes['input']}`}
      />
      {errorMessage && (
        <p className={classes['error-message']}>{errorMessage}</p>
      )}
    </div>
  );
};
