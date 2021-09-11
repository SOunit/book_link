import { v4 as uuidv4 } from 'uuid';
import { Op, QueryTypes } from 'sequelize';
import CreateItemInput from '../models/ts/CreateItemInput';
import Item from '../models/sequelize/item';
import UserType from '../models/ts/User';
import sequelize from '../util/database';
import User from '../models/sequelize/user';
import ItemType from '../models/ts/Item';
import UserItem from '../models/sequelize/userItem';

const resolvers = {
  // FIXME: any type to something
  itemsByTitle: async (args: any, req: any) => {
    const titleQuery = args.title;

    const result = await Item.findAll({
      where: { title: { [Op.iLike]: `${titleQuery}%` } },
    });

    const itemList: any[] = [];
    result.map((elm: any) =>
      itemList.push({
        id: elm.id,
        title: elm.title,
        author: elm.author,
        imageUrl: elm.imageUrl,
      })
    );

    return itemList;
  },

  createItem: async (args: { data: CreateItemInput }) => {
    const id = uuidv4();
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
    if (args.data.name && args.data.name.length > 0) {
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

  deleteUserItem: async (args: {
    data: { userId: string; itemId: string };
  }) => {
    const userItemInstance = await UserItem.findAll({
      where: { userId: args.data.userId, itemId: args.data.itemId },
    });
    if (userItemInstance && userItemInstance.length > 0) {
      await userItemInstance[0].destroy();
    }

    // create return value
    const userInstance = await User.findAll({
      where: { id: args.data.userId },
      include: Item,
    });

    return {
      id: userInstance[0].id,
      name: userInstance[0].name,
      about: userInstance[0].about,
      imageUrl: userInstance[0].imageUrl,
      items: userInstance[0].items,
    };
  },

  getUsersByItems: async (args: { itemIds: string[]; userId: string }) => {
    const fetchedUsers = await sequelize.query(
      `select
        id
        , name
        , about
        , "imageUrl"
        from
        (
          select
          "userId"
          , count("itemId")
          from "userItems"
          where
          "itemId" in (:itemIds)
          group by "userItems"."userId"
          having count("itemId") = :itemIdsLength
        ) as "targetUsers"
        join users
        on users.id = "targetUsers"."userId"
        where users.id <> :userId
        `,
      {
        replacements: {
          itemIds: args.itemIds,
          itemIdsLength: args.itemIds.length,
          userId: args.userId,
        },
        type: QueryTypes.SELECT,
      }
    );

    const users: UserType[] = [];
    fetchedUsers.map((fetchedUser: UserType) => {
      users.push(fetchedUser);
    });

    return users;
  },

  user: async (args: { id: string }) => {
    // const result = await User.findByPk(args.id);
    const result = await User.findAll({
      where: { id: args.id },
      include: Item,
    });

    if (result.length <= 0) {
      throw new Error('User not found');
    }

    const userData = result[0].dataValues;

    const items: ItemType[] = [];
    userData.items.map((elm: any) => {
      const itemData = elm.dataValues;
      return items.push({
        id: itemData.id,
        title: itemData.title,
        author: itemData.author,
        imageUrl: itemData.imageUrl,
      });
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
};

export default resolvers;
