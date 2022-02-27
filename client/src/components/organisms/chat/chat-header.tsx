import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { User } from '../../../models';
import classes from './chat-header.module.css';

type Props = {
  partnerUser: User;
};

export const ChatHeader: FC<Props> = ({ partnerUser }) => {
  const history = useHistory();

  const chatHeaderClickHandler = () => {
    history.push('/chats');
  };

  return (
    <div className={classes['chat-header']} onClick={chatHeaderClickHandler}>
      {`< ${partnerUser.name}`}
    </div>
  );
};
