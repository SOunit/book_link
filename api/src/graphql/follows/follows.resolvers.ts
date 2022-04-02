import { QueryTypes } from 'sequelize';
import { Follow } from '../../models/sequelize';
import { sequelize } from '../../util';

export = {
  Query: {
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
  },

  Mutation: {
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
  },
};
