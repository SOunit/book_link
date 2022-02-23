import { FC } from 'react';
import classes from './not-found-message.module.css';

type Props = {
  title: string;
  text?: string;
};

const NotFoundMessage: FC<Props> = ({ title, text }) => {
  return (
    <div className={classes['message-box']}>
      <h2 className={classes['message__title']}>{title}</h2>
      <p className={classes['message__text']}>{text}</p>
    </div>
  );
};

export default NotFoundMessage;
