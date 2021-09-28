import API from './api';

const ChatServices = {
  fetchChat: () => {
    return {
      id: 1,
      users: [
        { id: 1, name: 'login user' },
        { id: 2, name: 'test user' },
      ],
      messages: [
        { id: 1, chatId: 1, userId: 1, text: 'how are you?' },
        { id: 2, chatId: 1, userId: 2, text: 'good. thank you' },
      ],
    };
  },
};

export default ChatServices;
