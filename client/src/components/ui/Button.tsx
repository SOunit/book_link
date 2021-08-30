import { FC } from 'react';
import classes from './Button.module.css';

type ButtonProps = {
  buttonText: String;
  disabled: boolean;
  onButtonClick: () => any;
};

const Button: FC<ButtonProps> = (props) => {
  const classList = [classes['button']];
  if (props.disabled) {
    classList.push(classes['button--inactive']);
  }

  return (
    <button
      className={classList.join(' ')}
      onClick={props.onButtonClick}
      disabled={props.disabled}
    >
      {props.buttonText}
    </button>
  );
};

export default Button;
