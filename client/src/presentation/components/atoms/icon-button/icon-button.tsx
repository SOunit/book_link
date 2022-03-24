import { FC, MouseEventHandler } from 'react';
import classes from './icon-button.module.scss';

type Props = {
  iconName: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

export const IconButton: FC<Props> = ({ iconName, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`${classes['icon-button']} ${className}`}>
      <i className={iconName}></i>
    </button>
  );
};
