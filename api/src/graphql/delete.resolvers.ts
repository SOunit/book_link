import { v4 as uuidV4 } from 'uuid';
import { Op, QueryTypes, literal } from 'sequelize';
import CreateItemInput from '../models/ts/CreateItemInput';
import Item from '../models/sequelize/item';
import UserType from '../models/ts/User';
import sequelize from '../util/database';
import User from '../models/sequelize/user';
import UserItem from '../models/sequelize/userItem';
import Follow from '../models/sequelize/follow';
import Chat from '../models/sequelize/chat';
import Message from '../models/sequelize/message';
import UserChat from '../models/sequelize/userChat';

const resolvers = {
  Query: {
    // only for login user
    user: async (_: any, args: { id: string }) => {
      const user = await User.findOne({
        where: { id: args.id },
        include: [{ model: Item }],
      });

      if (!user) {
        throw new Error('User not found');
      }

      const userData = user.get({ row: true });

      const items = userData.items.map((elm: any) => {
        const itemData = elm.get({ row: true });
        return {
          id: itemData.id,
          title: itemData.title,
          author: itemData.author,
          imageUrl: itemData.imageUrl,
        };
      });

      return {
        id: userData.id,
        name: userData.name,
        about: userData.about,
        imageUrl: userData.imageUrl,
        items,
      };
    },

    item: async (_: any, args: { id: string }) => {
      const result = await Item.findByPk(args.id);
      const itemData = result.dataValues;

      return {
        id: itemData.id,
        title: itemData.title,
        author: itemData.author,
        imageUrl: itemData.imageUrl,
        users: [],
      };
    },

    getUserCount: async (_: any, args: any) => {
      console.log('getUserCount args.id', args.id);

      try {
        console.log('User.count');

        const amount = await User.count({ where: { id: args.id } });
        console.log('amount', amount);

        return amount;
      } catch (err) {
        console.log('getUserCount error', err);
      }
    },

    getFollowingUsers: async (
      _: any,
      args: {
        targetUserId: string;
        loginUserId: string;
      },
    ) => {
      const users = await sequelize.query(
        `
      SELECT USERS.ID,
        USERS.NAME,
        USERS."imageUrl",
        CASE
                WHEN LOGIN_USER_FOLLOWS."userId" IS NOT NULL THEN TRUE
                ELSE FALSE
        END AS "isFollowing"
      FROM FOLLOWS
      JOIN USERS ON FOLLOWS."userId" = USERS.ID
      LEFT JOIN FOLLOWS AS LOGIN_USER_FOLLOWS ON LOGIN_USER_FOLLOWS."userId" = FOLLOWS."userId"
      AND LOGIN_USER_FOLLOWS."followingUserId" = :loginUserId
      WHERE FOLLOWS."followingUserId" = :targetUserId
      LIMIT 10
      OFFSET 0
      `,
        {
          replacements: {
            targetUserId: args.targetUserId,
            loginUserId: args.loginUserId,
          },
          type: QueryTypes.SELECT,
        },
      );

      return users;
    },

    getFollowerUsers: async (
      _: any,
      args: {
        targetUserId: string;
        loginUserId: string;
      },
    ) => {
      const users = await sequelize.query(
        `
      SELECT USERS.ID,
        USERS.NAME,
        USERS."imageUrl",
        CASE
                WHEN LOGIN_USER_FOLLOWS."followingUserId" IS NOT NULL THEN TRUE
                WHEN FOLLOWS."followingUserId" = :loginUserId THEN TRUE
                ELSE FALSE
        END AS "isFollowing"
      FROM FOLLOWS
      JOIN USERS ON FOLLOWS."followingUserId" = USERS.ID
      LEFT JOIN FOLLOWS AS LOGIN_USER_FOLLOWS ON LOGIN_USER_FOLLOWS."followingUserId" = :loginUserId
      AND LOGIN_USER_FOLLOWS."userId" = USERS.ID
      WHERE FOLLOWS."userId" = :targetUserId
      LIMIT 10
      OFFSET 0
      `,
        {
          replacements: {
            targetUserId: args.targetUserId,
            loginUserId: args.loginUserId,
          },
          type: QueryTypes.SELECT,
        },
      );

      return users;
    },

    following: async (
      _: any,
      args: { userId: string; followingUserId: string },
    ) => {
      const following = await Follow.findOne({
        where: {
          userId: args.userId,
          followingUserId: args.followingUserId,
        },
      });

      if (!following) {
        return {
          userId: null,
          followingUserId: null,
        };
      }

      const followingData = following.get({ row: true });
      return {
        userId: followingData.userId,
        followingUserId: followingData.followingUserId,
      };
    },

    getUserChat: async (_: any, args: { userIds: string[] }) => {
      // fetch data
      const [userId1, userId2] = args.userIds;
      const user = await User.findOne({
        where: { id: userId1 },
        include: {
          model: Chat,
          include: [
            { model: Message, limit: 20, order: [['createdAt', 'DESC']] },
            { model: User, where: { id: userId2 } },
          ],
        },
      });

      // change data for return
      const chats = user.chats.map((chat: any) => {
        const messages = chat.messages.map((message: any) => {
          return message;
        });
        messages.reverse();

        const users = chat.users.map((user: UserType) => {
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
      const user = await User.findOne({
        where: { id: args.userId },
        include: {
          model: Chat,
          include: [
            { model: Message, order: [['createdAt', 'DESC']], limit: 1 },
            { model: User, where: { [Op.not]: { id: args.userId } } },
          ],
        },
      });

      // change data for return
      const chats = user.chats.map((chat: any) => {
        const messages = chat.messages.map((message: any) => {
          return message;
        });

        const users = chat.users.map((user: UserType) => {
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

    fetchRandomItems: async () => {
      const items = await Item.findAll({
        limit: 1,
      });

      const itemList = items.map((elm: any) => ({
        id: elm.id,
        title: elm.title,
        author: elm.author,
        imageUrl: elm.imageUrl,
      }));

      return itemList;
    },
  },

  Mutation: {
    createItem: async (_: any, args: { data: CreateItemInput }) => {
      const id = uuidV4();
      const { title, author, imageUrl } = args.data;
      const newItem = { id, title, author, imageUrl };

      await Item.create(newItem);

      return newItem;
    },

    createUser: (_: any, args: { id: string }) => {
      const newUser = User.create({
        id: args.id,
        name: 'new user',
        about: ``,
        imageUrl: '',
      });
      return newUser;
    },

    updateUser: async (_: any, args: { data: UserType }) => {
      const userInstance = await User.findByPk(args.data.id);
      if (!userInstance) {
        throw new Error('User not found!');
      }

      // update
      if (args.data && args.data.name) {
        userInstance.name = args.data.name;
        userInstance.about = args.data.about;
        userInstance.imageUrl = args.data.imageUrl;

        // save
        userInstance.save();
      }

      return {
        id: userInstance.id,
        about: userInstance.about,
        imageUrl: userInstance.imageUrl,
        name: userInstance.name,
      };
    },

    deleteUserItem: async (
      _: any,
      args: {
        data: { userId: string; itemId: string };
      },
    ) => {
      const userItemInstance = await UserItem.findOne({
        where: { userId: args.data.userId, itemId: args.data.itemId },
      });
      if (userItemInstance) {
        await userItemInstance.destroy();
      }

      // create return value
      const userInstance = await User.findOne({
        where: { id: args.data.userId },
        include: Item,
      });

      return {
        id: userInstance.id,
        name: userInstance.name,
        about: userInstance.about,
        imageUrl: userInstance.imageUrl,
        items: userInstance.items,
      };
    },

    addUserItem: async (
      _: any,
      args: { data: { userId: string; itemId: string } },
    ) => {
      // FIXME: check if user and item exists

      await UserItem.create({
        userId: args.data.userId,
        itemId: args.data.itemId,
      });

      // create return value
      const userInstance = await User.findOne({
        where: { id: args.data.userId },
        include: Item,
      });

      return {
        id: userInstance.id,
        name: userInstance.name,
        about: userInstance.about,
        imageUrl: userInstance.imageUrl,
        items: userInstance.items,
      };
    },

    createFollowing: async (
      _: any,
      args: {
        userId: string;
        followingUserId: string;
      },
    ) => {
      await Follow.create({
        userId: args.userId,
        followingUserId: args.followingUserId,
      });

      return true;
    },

    deleteFollowing: async (
      _: any,
      args: {
        userId: string;
        followingUserId: string;
      },
    ) => {
      const followingInstance = await Follow.findOne({
        where: {
          userId: args.userId,
          followingUserId: args.followingUserId,
        },
      });

      followingInstance.destroy();

      return true;
    },

    createChat: async (_: any, args: { userId: string; targetId: string }) => {
      if (args.userId === args.targetId) {
        throw new Error('both user ids are same!');
      }

      const existingChat = await Chat.count({
        where: {
          '$users.id$': { [Op.in]: [args.userId, args.targetId] },
        },
        include: {
          model: User,
          as: 'users',
        },
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
        const chatId = chat.get({ row: true }).id;

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

        const user = await User.findOne({
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

export default resolvers;
