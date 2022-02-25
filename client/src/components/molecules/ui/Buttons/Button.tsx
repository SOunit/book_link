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
  FOLLOW: 'FOLLOW',
  FOLLOWING: 'FOLLOWING',
};

const Button: FC<ButtonProps> = (props) => {
  const classList = [classes['button']];
  if (props.buttonType === ButtonTypes.DELETE) {
    classList.push(classes['button--delete']);
  }
  if (props.buttonType === ButtonTypes.FOLLOW) {
    classList.push(classes['button--follow']);
  }
  if (props.buttonType === ButtonTypes.FOLLOWING) {
    classList.push(classes['button--following']);
  }
  if (props.buttonType === ButtonTypes.IN_ACTIVE) {
    classList.push(classes['button--inactive']);
  }

  return (
    <button
      className={classList.join(' ')}
      onClick={props.onButtonClick}
      disabled={props.buttonType === ButtonTypes.IN_ACTIVE && true}
    >
      {props.buttonText}
    </button>
  );
};

export { ButtonTypes };
export default Button;
