export class Message {
  id: string;
  userId: string;
  chatId: string;
  text: string;
  createdAt?: string;

  constructor(userId: string, chatId: string, text: string) {
    this.id = Math.random().toString();
    this.userId = userId;
    this.chatId = chatId;
    this.text = text;
  }

  static getDisplayTime = (createdAt: string) => {
    const items = new Date(createdAt).toLocaleTimeString().split(':');
    items.splice(-1, 1);

    return items.join(':');
  };
}
