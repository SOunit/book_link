import {
  FC,
  useEffect,
  useRef,
  useState,
  FormEvent,
  useContext,
  ChangeEvent,
} from 'react';
import { useParams } from 'react-router';
import { ChatServices } from '../../../services';
import {
  Message as MessageType,
  Chat as ChatType,
} from '../../../domain/models';
import { AuthContext } from '../../../services/store';
import { ChatForm, ChatHeader } from '../../components/organisms';
import { ChatMessage } from '../../components/organisms';
import classes from './chat.module.css';

type ChatProps = {
  socket: any;
};

type UserDetailParams = {
  userId: string;
};

export const Chat: FC<ChatProps> = ({ socket }) => {
  const { loginUser } = useContext(AuthContext);
  const { userId } = useParams<UserDetailParams>();
  const [chat, setChat] = useState<ChatType | null>(null);
  const messagesBoxDivRef = useRef<HTMLDivElement>(null);
  const [messageInput, setMessageInput] = useState('');

  const fetchChat = (userIds: string[]) => {
    const [loginUserId, chatPartnerUserId] = userIds;
    ChatServices.fetchChat([loginUserId, chatPartnerUserId]).then((res) => {
      const chat = res.data.data.getUserChat;
      setChat(chat);
    });
  };

  const scrollToBottom = () => {
    // wait 100 ms to run after rendering
    setTimeout(() => {
      const htmlTag = document.querySelector('html');
      if (
        htmlTag &&
        messagesBoxDivRef.current &&
        messagesBoxDivRef.current.scrollHeight
      ) {
        htmlTag.scrollTop = messagesBoxDivRef.current.scrollHeight;
      }
    }, 100);
  };

  const addMessageToChat = (message: MessageType) => {
    setChat((prevState: any) => {
      const newChat = { ...prevState };
      const messages = newChat.messages!;

      // stop duplicate id
      if (messages.find((msg: MessageType) => msg.id === message.id)) {
        return prevState;
      }

      const newMessages = [...messages, message];
      newChat.messages = newMessages;
      return newChat;
    });
  };

  const changeMessageInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(event.target.value);
  };

  const sendMessageHandler = (event: FormEvent) => {
    event.preventDefault();
    if (messageInput === '') {
      return;
    }

    if (chat && loginUser) {
      ChatServices.createMessage(chat.id, loginUser.id, messageInput).then(
        (res) => {
          // fetch message from backend
          const message = res.data.data.createMessage;

          socket.emit('create:message', {
            loginUserId: loginUser.id,
            userId,
            message,
          });

          setMessageInput('');
        },
      );
    }
  };

  useEffect(() => {
    if (loginUser) {
      fetchChat([loginUser.id, userId]);
      scrollToBottom();
    }
    // return cleanup function to avoid memory leak error
    return () => {
      setChat(null);
    };
  }, [loginUser, userId]);

  useEffect(() => {
    if (socket) {
      socket.on('update:chat', (message: MessageType) => {
        addMessageToChat(message);
        scrollToBottom();
      });
    }
  }, [socket]);

  let messages;
  if (chat && loginUser) {
    messages = chat.messages.map((message: MessageType) => {
      let isMine = false;
      if (loginUser.id === message.userId) {
        isMine = true;
      }
      return (
        <ChatMessage
          key={message.id}
          chat={chat}
          isMine={isMine}
          loginUserId={loginUser.id}
          message={message}
        />
      );
    });
  }

  return (
    <div>
      {chat && <ChatHeader partnerUser={chat.users[0]} />}
      <div ref={messagesBoxDivRef} className={classes['messages-box']}>
        {messages}
      </div>

      <ChatForm
        value={messageInput}
        onChange={changeMessageInputHandler}
        onSubmit={sendMessageHandler}
      />
    </div>
  );
};
