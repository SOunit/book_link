import { FC } from 'react';
import classes from './icon-text-button.module.css';

type Props = {
  iconName: string;
  text: string;
  className?: string;
  onClick: any;
};

export const IconTextButton: FC<Props> = ({
  iconName,
  text,
  className,
  onClick,
}) => {
  return (
    <button
      className={`${classes['icon-text-button']} ${className}`}
      onClick={onClick}>
      <i className={`${iconName} ${classes['icon-text-button__icon']}`} />
      <p className={`${classes['icon-text-button__text']}`}>{text}</p>
    </button>
  );
};
