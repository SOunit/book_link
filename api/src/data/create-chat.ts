import { Chat, Message, UserChat } from '../models/sequelize';

export const createChat = async () => {
  await Chat.create({
    id: '1',
  });

  await UserChat.create({
    UserId: '1',
    ChatId: '1',
  });
  await UserChat.create({
    UserId: '2',
    ChatId: '1',
  });

  await Message.create({
    id: '1',
    ChatId: '1',
    UserId: '1',
    text: 'test message from user 1',
  });
  await Message.create({
    id: '2',
    ChatId: '1',
    UserId: '2',
    text: 'test message from user 2',
  });

  await Message.create({
    id: '7',
    ChatId: '1',
    UserId: '1',
    text: 'user1!!! Lorem ipsum dolor sit. Mollitia voluptate illum provident alias eius quam quod dolor nobis tenetur aperiam, voluptates nesciunt debitis at molestiae ex cum? Aspernatur, porro est?',
  });
  await Message.create({
    id: '8',
    ChatId: '1',
    UserId: '2',
    text: 'user2!!! Lorem ipsum dolor, sit. Perferendis quis atque, voluptas enim dolorem optio quos minima ad facere sunt voluptatem cupiditate excepturi aliquid quibusdam cumque nobis mollitia blanditiis corrupti!',
  });
  await Message.create({
    id: '9',
    ChatId: '1',
    UserId: '2',
    text: 'how are you?',
  });
};
