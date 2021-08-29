import { FC } from 'react';
import classes from './Button.module.css';

type ButtonProps = {
  buttonText: String;
  onButtonClick: () => any;
};

const Button: FC<ButtonProps> = (props) => {
  return (
    <button className={classes['button']} onClick={props.onButtonClick}>
      {props.buttonText}
    </button>
  );
};

export default Button;
