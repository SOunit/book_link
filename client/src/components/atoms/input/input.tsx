import { FC } from 'react';
import classes from './input.module.scss';

type Props = {
  onChange: any;
  value?: string;
  type?: string;
  placeholder?: string;
  className?: string;
};

export const Input: FC<Props> = ({
  type = 'text',
  value = '',
  placeholder,
  className,
  onChange,
}) => {
  return (
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className={`${classes['input']} ${className}`}
    />
  );
};
