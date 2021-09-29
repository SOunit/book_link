import Message from './Message';

class Chat {
  id: string;
  messages: Message[];

  constructor(id: string, messages: Message[]) {
    this.id = Math.random().toString();
    this.messages = [];
  }
}

export default Chat;
