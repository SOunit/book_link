import { QueryTypes } from 'sequelize';
import { Chat, Item, User } from '../../models/sequelize';
import { db } from '../../config';
import UserType from '../../models/ts/User';

export = {
  Query: {
    user: async (_: any, args: { id: string }) => {
      const user = await User.findOne({
        where: { id: args.id },
        include: [{ model: Item }, { model: Chat }],
      });

      if (!user) {
        throw new Error('User not found');
      }

      return user.get({ plain: true });
    },

    getUserCount: async (_: any, args: any) => {
      try {
        const amount = await User.count({ where: { id: args.id } });
        return amount;
      } catch (err) {
        console.log('getUserCount error', err);
      }
    },

    getUsersByItems: async (
      _: any,
      args: { itemIds: string[]; userId: string },
    ) => {
      const fetchedUsers = await db.query(
        `
        SELECT ID ,
            NAME ,
            ABOUT ,
            "imageUrl"
          FROM
            (SELECT "UserId" ,
                COUNT("ItemId")
              FROM "UserItems"
              WHERE "ItemId" in (:itemIds)
              GROUP BY "UserItems"."UserId"
              HAVING COUNT("ItemId") = :itemIdsLength) AS "targetUsers"
          JOIN "Users" ON "Users".ID = "targetUsers"."UserId"
          WHERE "Users".ID <> :userId
            AND "Users".ID not in
              (SELECT "UserId"
                FROM "Follows"
                WHERE "Follows"."followingUserId" = :userId )
          LIMIT 10
          OFFSET 0
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

      console.log('fetchedUsers', fetchedUsers);

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
      const user = (await User.findByPk(args.data.id)) as any;

      if (!user) {
        throw new Error('User not found!');
      }

      // update
      if (args.data && args.data.name) {
        user.name = args.data.name;
        user.about = args.data.about;
        user.imageUrl = args.data.imageUrl;

        // save
        user.save();
      }

      return {
        id: user.id,
        about: user.about,
        imageUrl: user.imageUrl,
        name: user.name,
      };
    },
  },
};
