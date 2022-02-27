import { FC } from 'react';
import { useHistory } from 'react-router';
import { Chat as ChatType } from '../../../models';
import { Image } from '../../atoms';
import classes from './chat-list-item.module.css';

type ChatListItemProps = {
  chat: ChatType;
};

export const ChatListItem: FC<ChatListItemProps> = ({ chat }) => {
  const history = useHistory();
  const chatPartnerUser = chat.users[0];

  const clickHandler = () => {
    history.push(`/chats/${chatPartnerUser.id}`);
  };

  const getLatestMessage = (text: string) => {
    let latestMessage = text;

    const words = text.split(' ');
    let changed = false;

    let maxCount = 10;
    if (words.length > maxCount) {
      words.splice(maxCount);
      latestMessage = words.join(' ');
      changed = true;
    }

    maxCount = 50;
    if (latestMessage.length > maxCount) {
      latestMessage = text.substr(0, maxCount);
      changed = true;
    }

    if (changed) {
      latestMessage += '...';
    }

    return latestMessage;
  };

  let latestMessage = null;
  if (chat.messages && chat.messages.length > 0) {
    latestMessage = getLatestMessage(chat.messages[0].text);
  }

  return (
    <div className={classes.chatListItem} onClick={clickHandler}>
      <div className={classes['image-wrapper']}>
        <Image
          src={chatPartnerUser.imageUrl}
          alt={chatPartnerUser.name}
          className={classes['chat-list-item__image']}
        />
      </div>
      <div className={classes['chatListItem__details']}>
        <div className={classes['chatListItem__name']}>
          {chatPartnerUser.name}
        </div>
        <div className={classes['chatListItem__text']}>{latestMessage}</div>
      </div>
      <div className={classes['chatListItem__time']}>19:47</div>
    </div>
  );
};
