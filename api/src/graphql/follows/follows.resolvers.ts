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
        SELECT "Users".ID,
          "Users".NAME,
          "Users"."imageUrl",
          CASE
                  WHEN LOGIN_USER_FOLLOWS."UserId" IS NOT NULL THEN TRUE
                  ELSE FALSE
          END AS "isFollowing"
        FROM "Follows"
        JOIN "Users" ON "Follows"."UserId" = "Users".ID
        LEFT JOIN "Follows" AS LOGIN_USER_FOLLOWS ON LOGIN_USER_FOLLOWS."UserId" = "Follows"."UserId"
        AND LOGIN_USER_FOLLOWS."followingUserId" = :loginUserId
        WHERE "Follows"."followingUserId" = :targetUserId
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
        SELECT "Users".ID,
          "Users".NAME,
          "Users"."imageUrl",
          CASE
                  WHEN LOGIN_USER_FOLLOWS."followingUserId" IS NOT NULL THEN TRUE
                  WHEN "Follows"."followingUserId" = :loginUserId THEN TRUE
                  ELSE FALSE
          END AS "isFollowing"
        FROM "Follows"
        JOIN "Users" ON "Follows"."followingUserId" = "Users".ID
        LEFT JOIN "Follows" AS LOGIN_USER_FOLLOWS ON LOGIN_USER_FOLLOWS."followingUserId" = :loginUserId
        AND LOGIN_USER_FOLLOWS."UserId" = "Users".ID
        WHERE "Follows"."UserId" = :targetUserId
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
        UserId: args.userId,
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
          UserId: args.userId,
          followingUserId: args.followingUserId,
        },
      });

      followingInstance.destroy();

      return true;
    },
  },
};
