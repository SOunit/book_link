import { FC, MouseEventHandler } from 'react';
import classes from './icon-button.module.css';

type Props = {
  iconName: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

const IconButton: FC<Props> = ({ iconName, onClick }) => {
  return (
    <button onClick={onClick} className={classes['icon-button']}>
      <i className={iconName}></i>
    </button>
  );
};

export default IconButton;
