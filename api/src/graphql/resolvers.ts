import { v4 as uuidv4 } from 'uuid';
import { Op, QueryTypes } from 'sequelize';
import CreateItemInput from '../models/ts/CreateItemInput';
import Item from '../models/sequelize/item';
import UserType from '../models/ts/User';
import sequelize from '../util/database';
import User from '../models/sequelize/user';
import ItemType from '../models/ts/Item';
import UserItem from '../models/sequelize/userItem';
import Following from '../models/sequelize/following';

const resolvers = {
  // FIXME: any type to something
  itemsByTitle: async (args: any, req: any) => {
    const titleQuery = args.title;

    const items = await Item.findAll({
      where: { title: { [Op.iLike]: `${titleQuery}%` } },
      limit: 10,
    });

    let itemList = [];
    itemList = items.map((elm: any) => {
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
      }
    );

    return fetchedUsers;
  },

  user: async (args: { id: string }) => {
    // const result = await User.findByPk(args.id);
    const user = await User.findOne({
      where: { id: args.id },
      include: Item,
    });

    if (!user) {
      throw new Error('User not found');
    }

    const userData = user.get({ row: true });

    let items: ItemType[] = [];
    items = userData.items.map((elm: any) => {
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
      }
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
};

export default resolvers;
