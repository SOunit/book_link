import { QueryTypes } from 'sequelize';
import { Item, User } from '../../models/sequelize';
import sequelize from '../../util/database';
import UserType from '../../models/ts/User';

export = {
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

    getUsersByItems: async (
      _: any,
      args: { itemIds: string[]; userId: string },
    ) => {
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
            "userId"
          FROM
            follows
          WHERE
            follows."followingUserId" = :userId
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
  },

  Mutation: {
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
  },
};
