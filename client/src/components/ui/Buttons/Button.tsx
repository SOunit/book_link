import { FC } from 'react';
import classes from './Button.module.css';

type ButtonProps = {
  buttonText: string;
  buttonType: string;
  // FIXME: any
  onButtonClick: () => any;
};

const ButtonTypes = {
  NORMAL: 'NORMAL',
  DELETE: 'DELETE',
  IN_ACTIVE: 'IN_ACTIVE',
};

const Button: FC<ButtonProps> = (props) => {
  const classList = [classes['button']];
  if (props.buttonType === ButtonTypes.DELETE) {
    classList.push(classes['button--delete']);
  }
  if (props.buttonType === ButtonTypes.IN_ACTIVE) {
    classList.push(classes['button--inactive']);
  }

  return (
    <button
      className={classList.join(' ')}
      onClick={props.onButtonClick}
      disabled={props.buttonType === ButtonTypes.IN_ACTIVE && false}
    >
      {props.buttonText}
    </button>
  );
};

export { ButtonTypes };
export default Button;
