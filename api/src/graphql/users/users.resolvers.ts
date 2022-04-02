import { QueryTypes } from 'sequelize';
import sequelize from '../../util/database';

export = {
  Query: {
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
