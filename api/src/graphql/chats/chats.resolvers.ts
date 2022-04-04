import { v4 as uuidV4 } from 'uuid';
import { Op, literal } from 'sequelize';
import { Chat, Message, User, UserChat } from '../../models/sequelize';
import UserType from '../../models/ts/User';
import { sequelize } from '../../util';

export = {
  Query: {
    getUserChat: async (_: any, args: { userIds: string[] }) => {
      // fetch data
      const [userId1, userId2] = args.userIds;
      const user: any = await User.findOne({
        where: { id: userId1 },
        include: [
          {
            model: Chat,
            include: [
              { model: Message, limit: 20, order: [['createdAt', 'DESC']] },
              { model: User, where: { id: userId2 } },
            ],
          },
        ],
      });

      // change data for return
      const chats = user.get({ plain: true }).Chats.map((chat: any) => {
        const messages = chat.Messages.map((message: any) => {
          return message;
        });
        messages.reverse();

        const users = chat.Users.map((user: UserType) => {
          return {
            id: user.id,
            name: user.name,
            imageUrl: user.imageUrl,
          };
        });

        return {
          id: chat.id,
          users,
          messages,
        };
      });

      return chats[0];
    },

    getUserChatList: async (_: any, args: { userId: string }) => {
      // fetch data
      const user: any = await User.findOne({
        where: { id: args.userId },
        include: [
          {
            model: Chat,
            include: [
              { model: Message, order: [['createdAt', 'DESC']], limit: 1 },
              {
                model: User,
                where: { [Op.not]: { id: args.userId } } as any,
              },
            ],
          },
        ],
      });

      // change data for return
      const chats = user.get({ plain: true }).Chats.map((chat: any) => {
        const messages = chat.Messages.map((message: any) => {
          return message;
        });

        const users = chat.Users.map((user: UserType) => {
          return {
            id: user.id,
            name: user.name,
            imageUrl: user.imageUrl,
          };
        });

        return {
          id: chat.id,
          users,
          messages,
        };
      });

      return chats;
    },
  },

  Mutation: {
    createChat: async (_: any, args: { userId: string; targetId: string }) => {
      if (args.userId === args.targetId) {
        throw new Error('both user ids are same!');
      }

      const existingChat = await Chat.findAll({
        where: {
          '$users.id$': { [Op.in]: [args.userId, args.targetId] },
        },
        include: [
          {
            model: User,
            as: 'users',
          },
        ],
        group: 'chat.id',
        having: literal('count(chat.id) = 2'),
      });

      if (existingChat.length === 1) {
        throw new Error('Chat already exists');
      }

      const transaction = await sequelize.transaction();

      type Response = {
        id: string;
        users: UserType[];
        messages: [];
      };
      const response: Response = {
        id: '',
        users: [],
        messages: [],
      };

      try {
        const chat = await Chat.create({ id: uuidV4() }, { transaction });
        const chatData: any = chat.get({ plain: true });
        const { chatId } = chatData;

        response.id = chatId;

        await UserChat.create(
          {
            id: uuidV4(),
            chatId,
            userId: args.userId,
          },
          { transaction },
        );

        await UserChat.create(
          {
            id: uuidV4(),
            chatId,
            userId: args.targetId,
          },
          { transaction },
        );

        console.log('args.targetId', args.targetId);

        const user: any = await User.findOne({
          where: { id: args.targetId },
        });

        console.log('user', user);
        const userData = {
          id: user.id,
          name: user.name,
          imageUrl: user.imageUrl,
          about: user.about,
        } as UserType;
        console.log('userData', userData);

        response.users = [userData];
        console.log('response', response);

        await transaction.commit();
      } catch (err: any) {
        await transaction.rollback();
        console.log({ status: 'Error', message: err.message });
        return;
      }

      return response;
    },

    createMessage: async (
      _: any,
      args: {
        chatId: string;
        userId: string;
        text: string;
      },
    ) => {
      const result = await Message.create({
        id: uuidV4(),
        chatId: args.chatId,
        userId: args.userId,
        text: args.text,
      });

      return result;
    },
  },
};
