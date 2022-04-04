import { v4 as uuidV4 } from 'uuid';
import { Op } from 'sequelize';
import { Item, User, UserItem } from '../../models/sequelize';
import CreateItemInput from '../../models/ts/CreateItemInput';

export = {
  Query: {
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

    // FIXME: any type to something
    itemsByTitle: async (_: any, args: any) => {
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
      const user: any = await User.findOne({
        where: { id: args.data.userId },
        include: Item,
      });

      return {
        id: user.id,
        name: user.name,
        about: user.about,
        imageUrl: user.imageUrl,
        items: user.items,
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
      const user: any = await User.findOne({
        where: { id: args.data.userId },
        include: Item,
      });

      return {
        id: user.id,
        name: user.name,
        about: user.about,
        imageUrl: user.imageUrl,
        items: user.items,
      };
    },
  },
};
