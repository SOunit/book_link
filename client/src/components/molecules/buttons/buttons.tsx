import { FC } from 'react';
import classes from './buttons.module.css';

export const Buttons: FC = (props) => {
  return <div className={classes['button-container']}>{props.children}</div>;
};
