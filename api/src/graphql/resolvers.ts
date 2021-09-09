import { v4 as uuidv4 } from 'uuid';
import { Op, QueryTypes } from 'sequelize';
import CreateItemInput from '../models/ts/CreateItemInput';
import Item from '../models/sequelize/item';
import UserType from '../models/ts/User';
import sequelize from '../util/database';
import User from '../models/sequelize/user';
import ItemType from '../models/ts/Item';

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

  getUsersByItems: async (args: { ids: String[] }) => {
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
        `,
      {
        replacements: { itemIds: args.ids, itemIdsLength: args.ids.length },
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
};

export default resolvers;
