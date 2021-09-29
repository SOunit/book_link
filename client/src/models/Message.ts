class Message {
  id: string;
  userId: string;
  chatId: string;
  text: string;

  constructor(userId: string, chatId: string, text: string) {
    this.id = Math.random().toString();
    this.userId = userId;
    this.chatId = chatId;
    this.text = text;
  }
}

export default Message;
