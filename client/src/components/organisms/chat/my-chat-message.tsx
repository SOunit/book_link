import { FC } from 'react';
import { Chat, Message } from '../../../models';
import { ImageContainer } from '../../molecules';
import classes from './my-chat-message.module.css';

type Props = {
  message: Message;
  className: string;
  chat: Chat;
  loginUserId: string;
};

export const MyChatMessage: FC<Props> = ({
  message,
  className,
  chat,
  loginUserId,
}) => {
  return (
    <div className={classes['message']} key={message.id}>
      <div className={`${classes['image-container']} ${className}`}>
        <ImageContainer src={chat.users[0].imageUrl} alt={chat.users[0].name} />
      </div>
      <div
        className={
          message.userId === loginUserId
            ? `${classes['message__text']} ${classes['message__text--mine']}`
            : classes['message__text']
        }>
        {message.text}
      </div>
      <div className={classes['message__time']}>22:00</div>
    </div>
  );
};
