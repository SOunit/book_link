import { FC } from 'react';
import { useHistory } from 'react-router';
import ImageContainer from '../../components/ui/ImageContainer/ImageContainer';
import ChatType from '../../models/Chat';
import classes from './ChatListItem.module.css';

type ChatListItemProps = {
  chat: ChatType;
};

const ChatListItem: FC<ChatListItemProps> = ({ chat }) => {
  const history = useHistory();

  const clickHandler = () => {
    history.push(`/chats/${chat.users[0].id}`);
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
        <ImageContainer src={chat.users[0].imageUrl} alt={chat.users[0].name} />
      </div>
      <div className={classes['chatListItem__details']}>
        <div className={classes['chatListItem__name']}>
          {chat.users[0].name}
        </div>
        <div className={classes['chatListItem__text']}>{latestMessage}</div>
      </div>
      <div className={classes['chatListItem__time']}>9:47 PM</div>
    </div>
  );
};

export default ChatListItem;
