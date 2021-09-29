import { FC } from 'react';
import { useHistory } from 'react-router';
import ImageContainer from '../../components/ui/ImageContainer/ImageContainer';
import ChatType from '../../models/Chat';
import UserType from '../../models/User';
import classes from './ChatListItem.module.css';

type ChatListItemProps = {
  chat: ChatType;
  chatUser: UserType;
};

const ChatListItem: FC<ChatListItemProps> = ({ chat, chatUser }) => {
  const history = useHistory();

  const clickHandler = () => {
    history.push(`/chats/${chatUser.id}`);
  };

  let latestMessage = null;
  if (chat.messages && chat.messages.length > 0) {
    latestMessage = chat.messages[0].text;
  }

  return (
    <div className={classes.chatListItem} onClick={clickHandler}>
      <div className={classes['image-wrapper']}>
        <ImageContainer src={chatUser.imageUrl} alt={chatUser.name} />
      </div>
      <div className={classes['chatListItem__details']}>
        <p className={classes['chatListItem__name']}>{chatUser.name}</p>
        <p className={classes['chatListItem__text']}>{latestMessage}</p>
      </div>
      <div className={classes['chatListItem__time']}>9:47 PM</div>
    </div>
  );
};

export default ChatListItem;
