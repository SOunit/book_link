import { FC, useEffect, useRef, useState, FormEvent } from 'react';
import { useHistory, useParams } from 'react-router';
import useLoginUser from '../hooks/use-login-user';
import ChatServices from '../services/chatServices';
import ChatType from '../models/Chat';
import MessageType from '../models/Message';
import classes from './Chat.module.css';
import ImageContainer from '../components/ui/ImageContainer/ImageContainer';

type ChatProps = {
  socket: any;
};

type UserDetailParams = {
  userId: string;
};

const Chat: FC<ChatProps> = (props) => {
  const history = useHistory();
  const { loginUser } = useLoginUser();
  const { userId } = useParams<UserDetailParams>();
  const [chat, setChat] = useState<ChatType | null>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  const fetchChat = (userIds: string[]) => {
    const [userId1, userId2] = userIds;
    ChatServices.fetchChat([userId1, userId2]).then((res) => {
      const chat = res.data.data.getUserChat;
      setChat(chat);
    });
  };

  useEffect(() => {
    if (loginUser) {
      fetchChat([loginUser.id, userId]);
    }
  }, [loginUser, userId]);

  const addMessageToChat = (message: MessageType) => {
    setChat((prevState: any) => {
      const newChat = { ...prevState };
      const newMessages = [...newChat.messages!, message];
      newChat.messages = newMessages;
      return newChat;
    });
  };

  useEffect(() => {
    if (props.socket) {
      props.socket.on('update:chat', (message: MessageType) => {
        addMessageToChat(message);
      });
    }
  }, [props.socket]);

  const chatHeaderClickHandler = () => {
    history.push('/chats');
  };

  const sendMessageHandler = (event: FormEvent) => {
    event.preventDefault();

    if (chat && loginUser) {
      const text = messageInputRef.current!.value;
      ChatServices.createMessage(chat.id, loginUser.id, text).then((res) => {
        const message = res.data.data.createMessage;
        props.socket.emit('create:message', {
          loginUserId: loginUser.id,
          userId,
          message,
        });

        messageInputRef.current!.value = '';
      });
    }
  };

  let messages;
  if (chat && loginUser) {
    messages = chat.messages.map((message: MessageType) => {
      let isImageHidden = null;
      if (loginUser.id === message.userId) {
        isImageHidden = classes['image-hidden'];
      }

      return (
        <div className={classes['message']} key={message.id}>
          <div className={`${classes['image-container']} ${isImageHidden}`}>
            <ImageContainer
              src={chat.users[0].imageUrl}
              alt={chat.users[0].name}
            />
          </div>
          <div
            className={
              message.userId === loginUser.id
                ? `${classes['message__text']} ${classes['message__text--mine']}`
                : classes['message__text']
            }
          >
            {message.text}
          </div>
          <div className={classes['message__time']}>12:00PM</div>
        </div>
      );
    });
  }

  return (
    <div>
      <div className={classes['chat-header']} onClick={chatHeaderClickHandler}>
        {`< ${chat?.users[0].name}`}
      </div>
      <div className={classes['messages-box']}>{messages}</div>
      <div className={classes['form-wrapper']}>
        <form
          onSubmit={(event) => sendMessageHandler(event)}
          className={classes['message-form']}
        >
          <input
            ref={messageInputRef}
            className={classes['message-input']}
            type='text'
            placeholder='Enter a message'
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
