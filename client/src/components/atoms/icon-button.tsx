import { FC, MouseEventHandler } from 'react';
import classes from './icon-button.module.css';

type Props = {
  iconName: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const IconButton: FC<Props> = ({ iconName, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${classes['icon-button']} ${className}`}>
      <i className={iconName}></i>
    </button>
  );
};

export default IconButton;
