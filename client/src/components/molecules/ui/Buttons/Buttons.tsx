import { FC } from 'react';
import classes from './Buttons.module.css';

const Buttons: FC = (props) => {
  return <div className={classes['button-container']}>{props.children}</div>;
};

export default Buttons;
