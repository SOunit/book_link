import { User } from './user';
import { Message } from './message';

export class Chat {
  id: string;
  users: User[];
  messages: Message[];

  constructor(id: string, users: User[], messages: Message[]) {
    this.id = Math.random().toString();
    this.users = [];
    this.messages = [];
  }
}
