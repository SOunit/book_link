import { FC } from 'react';
import classes from './button.module.css';

type Props = {
  title: string;
  onClick: any;
  className?: string;
};

const Button: FC<Props> = ({ title, onClick, className }) => {
  return (
    <button className={`${classes['button']} ${className}`} onClick={onClick}>
      {title}
    </button>
  );
};

export default Button;
