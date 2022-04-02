import { QueryTypes } from 'sequelize';
import { Item, User } from '../../models/sequelize';
import sequelize from '../../util/database';

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
};
