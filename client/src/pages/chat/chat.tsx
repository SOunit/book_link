import { FC, useEffect, useRef, useState, FormEvent, useContext } from 'react';
import { useParams } from 'react-router';
import { ChatServices } from '../../services';
import { Message as MessageType, Chat as ChatType } from '../../models';
import { AuthContext } from '../../store';
import classes from './chat.module.css';
import { ChatHeader } from '../../components/organisms/chat/chat-header';
import { MyChatMessage } from '../../components/organisms/chat/chat-message';

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
  const messageInputRef = useRef<HTMLInputElement>(null);
  const messagesBoxDivRef = useRef<HTMLDivElement>(null);

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

      if (messages.find((msg: MessageType) => msg.id === message.id)) {
        return prevState;
      }

      const newMessages = [...messages, message];
      newChat.messages = newMessages;
      return newChat;
    });
  };

  const sendMessageHandler = (event: FormEvent) => {
    event.preventDefault();

    if (chat && loginUser) {
      const text = messageInputRef.current!.value;
      ChatServices.createMessage(chat.id, loginUser.id, text).then((res) => {
        const message = res.data.data.createMessage;
        socket.emit('create:message', {
          loginUserId: loginUser.id,
          userId,
          message,
        });

        messageInputRef.current!.value = '';
      });
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
        <MyChatMessage
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
      <div className={classes['form-wrapper']}>
        <form
          onSubmit={(event) => sendMessageHandler(event)}
          className={classes['message-form']}>
          <input
            ref={messageInputRef}
            className={classes['message-input']}
            type="text"
            placeholder="Enter a message"
          />
        </form>
      </div>
    </div>
  );
};
