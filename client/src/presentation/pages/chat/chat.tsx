import { FC, useEffect, useRef, useState, FormEvent, ChangeEvent } from 'react';
import { useParams } from 'react-router';
import { useAuthStorage, useChatStorage } from '../../../services';
import { Message, Chat as ChatType } from '../../../domain';
import { ChatForm, ChatHeader, ChatMessage } from '../../components/organisms';
import classes from './chat.module.css';
import { useCreateMessage } from '../../../application/chat/create-message';
import { useAddMessageToChat } from '../../../application/chat/add-message-to-chat';

type Props = {
  socket: any;
};

type Params = {
  chatId: string;
};

export const Chat: FC<Props> = ({ socket }) => {
  const { loginUser } = useAuthStorage();
  const { chatId } = useParams<Params>();
  const { chatList } = useChatStorage();

  const [chat, setChat] = useState<ChatType | null>(null);
  const messagesBoxDivRef = useRef<HTMLDivElement>(null);
  const [messageInput, setMessageInput] = useState('');

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

  // const addMessageToChat = (message: Message) => {
  //   setChat((prevState: any) => {
  //     const newChat = { ...prevState };
  //     const messages = newChat.messages!;

  //     // stop duplicate id
  //     if (messages.find((msg: Message) => msg.id === message.id)) {
  //       return prevState;
  //     }

  //     const newMessages = [...messages, message];
  //     newChat.messages = newMessages;
  //     return newChat;
  //   });
  // };

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
    const chat = chatList.find((chat) => chat.id === chatId);
    if (chat) {
      setChat(chat);
    }
    scrollToBottom();

    // return cleanup function to avoid memory leak error
    return () => {
      setChat(null);
    };
  }, [chatId, chatList]);

  useEffect(() => {
    console.log('socket', socket);

    if (socket) {
      socket.on('update:chat', (message: Message) => {
        console.log('socket.on update:chat');

        addMessageToChat(chatId, message);
        scrollToBottom();
      });
    }
  }, [socket, addMessageToChat, chatId]);

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
