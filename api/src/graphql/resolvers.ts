import { v4 as uuidV4 } from 'uuid';
import { Op, QueryTypes, literal } from 'sequelize';
import CreateItemInput from '../models/ts/CreateItemInput';
import Item from '../models/sequelize/item';
import UserType from '../models/ts/User';
import sequelize from '../util/database';
import User from '../models/sequelize/user';
import UserItem from '../models/sequelize/userItem';
import Following from '../models/sequelize/following';
import Chat from '../models/sequelize/chat';
import Message from '../models/sequelize/message';
import UserChat from '../models/sequelize/userChat';

const resolvers = {
  // FIXME: any type to something
  itemsByTitle: async (args: any, req: any) => {
    const titleQuery = args.title;

    const items = await Item.findAll({
      where: { title: { [Op.iLike]: `${titleQuery}%` } },
      limit: 10,
    });

    const itemList = items.map((elm: any) => {
      return {
        id: elm.id,
        title: elm.title,
        author: elm.author,
        imageUrl: elm.imageUrl,
      };
    });

    return itemList;
  },

  createItem: async (args: { data: CreateItemInput }) => {
    const id = uuidV4();
    const { title, author, imageUrl } = args.data;
    const newItem = { id, title, author, imageUrl };

    await Item.create(newItem);

    return newItem;
  },

  createUser: (args: { id: string }) => {
    const newUser = User.create({
      id: args.id,
      name: 'new user',
      about: ``,
      imageUrl: '',
    });
    return newUser;
  },

  updateUser: async (args: { data: UserType }) => {
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

  addUserItem: async (args: { data: { userId: string; itemId: string } }) => {
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

  deleteUserItem: async (args: {
    data: { userId: string; itemId: string };
  }) => {
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

  getUsersByItems: async (args: { itemIds: string[]; userId: string }) => {
    const fetchedUsers = await sequelize.query(
      `
      SELECT
        id
        , name
        , about
        , "imageUrl"
      FROM
        (
          SELECT
            "userId"
            , count("itemId")
          FROM
            "userItems"
          WHERE
            "itemId" in (:itemIds)
          GROUP BY 
            "userItems"."userId"
          HAVING 
            count("itemId") = :itemIdsLength
        ) as "targetUsers"
      JOIN
        users
      ON 
        users.id = "targetUsers"."userId"
      WHERE 
        users.id <> :userId
      AND
        users.id not in (
          SELECT
            "targetId"
          FROM
            followings
          WHERE
            followings."userId" = :userId
        )
      LIMIT
        10
      OFFSET
        0
      `,
      {
        replacements: {
          itemIds: args.itemIds,
          itemIdsLength: args.itemIds.length,
          userId: args.userId,
        },
        type: QueryTypes.SELECT,
      },
    );

    return fetchedUsers;
  },

  // only for login user
  user: async (args: { id: string }) => {
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

  item: async (args: { id: string }) => {
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

  getUserCount: async (args: { id: string }) => {
    const amount = await User.count({ where: { id: args.id } });
    return amount;
  },

  getFollowingUsers: async (args: { userId: string }) => {
    const users = await sequelize.query(
      `
      SELECT
        users.id
        , users.name
        , users."imageUrl"
        , true as "isFollowing"
      FROM
        followings
      JOIN
        users
      ON
        followings."targetId" = users.id
      WHERE
        followings."userId" = :userId
      LIMIT
        10
      OFFSET
        0
      `,
      {
        replacements: {
          userId: args.userId,
        },
        type: QueryTypes.SELECT,
      },
    );

    return users;
  },

  createFollowing: async (args: { userId: string; targetId: string }) => {
    await Following.create({
      userId: args.userId,
      targetId: args.targetId,
    });

    return true;
  },

  deleteFollowing: async (args: { userId: string; targetId: string }) => {
    const followingInstance = await Following.findOne({
      where: {
        userId: args.userId,
        targetId: args.targetId,
      },
    });

    followingInstance.destroy();

    return true;
  },

  following: async (args: { userId: string; targetId: string }) => {
    const following = await Following.findOne({
      where: {
        userId: args.userId,
        targetId: args.targetId,
      },
    });

    if (!following) {
      return {
        userId: null,
        targetId: null,
      };
    }

    const followingData = following.get({ row: true });
    return {
      userId: followingData.userId,
      targetId: followingData.targetId,
    };
  },

  getUserChat: async (args: { userIds: string[] }) => {
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

  getUserChatList: async (args: { userId: string }) => {
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

  createChat: async (args: { userId: string; targetId: string }) => {
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
    try {
      const chat = await Chat.create({ id: uuidV4() }, { transaction });
      const chatId = chat.get({ row: true }).id;

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

      await transaction.commit();
    } catch (err: any) {
      await transaction.rollback();
      console.log({ status: 'Error', message: err.message });
      return false;
    }

    return true;
  },

  createMessage: async (args: {
    chatId: string;
    userId: string;
    text: string;
  }) => {
    const result = await Message.create({
      id: uuidV4(),
      chatId: args.chatId,
      userId: args.userId,
      text: args.text,
    });

    return result;
  },

  fetchRandomItems: async (args: any, req: any) => {
    const items = await Item.findAll({
      limit: 3,
    });

    const itemList = items.map((elm: any) => ({
      id: elm.id,
      title: elm.title,
      author: elm.author,
      imageUrl: elm.imageUrl,
    }));

    return itemList;
  },
};

export default resolvers;
