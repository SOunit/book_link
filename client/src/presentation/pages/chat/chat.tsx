import { FC, useEffect, useRef, useState, FormEvent, ChangeEvent } from 'react';
import { useParams } from 'react-router';
import { useAuthStorage, useChatStorage } from '../../../services';
import { Message } from '../../../domain';
import { ChatForm, ChatHeader, ChatMessage } from '../../components/organisms';
import classes from './chat.module.css';
import {
  useCreateMessage,
  useAddMessageToChat,
  useInitChat,
} from '../../../application';

type Props = {
  socket: any;
};

type Params = {
  userId: string;
};

export const Chat: FC<Props> = ({ socket }) => {
  const { loginUser } = useAuthStorage();
  const { userId } = useParams<Params>();
  const { chat } = useChatStorage();

  const messagesBoxDivRef = useRef<HTMLDivElement>(null);
  const [messageInput, setMessageInput] = useState('');

  const { initChat } = useInitChat();
  const { createMessage } = useCreateMessage();
  const { addMessageToChat } = useAddMessageToChat();

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

  const changeMessageInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setMessageInput(event.target.value);
  };

  const sendMessageHandler = (event: FormEvent) => {
    event.preventDefault();
    if (messageInput === '') {
      return;
    }

    if (chat && loginUser) {
      createMessage(chat.id, chat.users[0].id, messageInput, loginUser.id);
      setMessageInput('');
    }
  };

  useEffect(() => {
    if (userId && loginUser) {
      initChat([loginUser.id, userId]);
    }

    scrollToBottom();
  }, [userId, loginUser, initChat]);

  useEffect(() => {
    if (socket && chat) {
      socket.on('update:chat', (message: Message) => {
        addMessageToChat(message);
        scrollToBottom();
      });
    }
  }, [socket, addMessageToChat, chat]);

  let messages;
  if (chat && loginUser) {
    messages = chat.messages.map((message: Message) => {
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
