import { FC, useEffect } from 'react';
import useLoginUser from '../hooks/use-login-user';
import ChatServices from '../services/chatServices';

const ChatList: FC = () => {
  const { loginUser } = useLoginUser();

  useEffect(() => {
    if (loginUser) {
      console.log(loginUser.id);
    }
  }, []);
  return <div>ChatList</div>;
};

export default ChatList;
