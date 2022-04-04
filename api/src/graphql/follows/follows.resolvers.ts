import { QueryTypes } from 'sequelize';
import { Follow } from '../../models/sequelize';
import { db } from '../../config/database.config';

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

      const followingData: any = following.get({ plain: true });
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
      const users = await db.query(
        `
        SELECT USERS.ID,
          USERS.NAME,
          USERS."imageUrl",
          CASE
                  WHEN LOGIN_USER_FOLLOWS."UserId" IS NOT NULL THEN TRUE
                  ELSE FALSE
          END AS "isFollowing"
        FROM FOLLOWS
        JOIN USERS ON FOLLOWS."UserId" = USERS.ID
        LEFT JOIN FOLLOWS AS LOGIN_USER_FOLLOWS ON LOGIN_USER_FOLLOWS."UserId" = FOLLOWS."UserId"
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
      const users = await db.query(
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
        AND LOGIN_USER_FOLLOWS."UserId" = USERS.ID
        WHERE FOLLOWS."UserId" = :targetUserId
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
      const followingInstance: any = await Follow.findOne({
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
