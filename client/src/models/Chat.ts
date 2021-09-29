import Message from './Message';
import User from './User';

class Chat {
  id: string;
  users: User[];
  messages: Message[];

  constructor(id: string, users: User[], messages: Message[]) {
    this.id = Math.random().toString();
    this.users = [];
    this.messages = [];
  }
}

export default Chat;
