import React, { FC } from 'react';
import classes from './slider-card.module.css';

type Props = {
  iconClass: string;
  title: string;
  text: string;
};

export const SliderCard: FC<Props> = ({ iconClass, title, text }) => {
  return (
    <div className={classes['slider-card']}>
      <i className={`${iconClass} ${classes['slider-card__icon']}`}></i>
      <h2 className={classes['slider-card__title']}>{title}</h2>
      <p className={classes['slider-card__text']}>{text}</p>
    </div>
  );
};
