import { api as API } from './api';

export const followingServices = {
  fetchFollowing: async (userId: string, followingUserId: string) => {
    const graphqlQuery = {
      query: `
              query fetchFollowing($userId: ID!, $followingUserId: ID!){
                following(userId: $userId, followingUserId: $followingUserId){
                  userId
                  followingUserId
                }
              }
            `,
      variables: {
        userId,
        followingUserId,
      },
    };

    return await API({
      data: graphqlQuery,
    });
  },

  deleteFollowing: async (userId: string, followingUserId: string) => {
    const graphqlQuery = {
      query: `
                  mutation DeleteFollowing($userId: ID!, $followingUserId: ID!){
                    deleteFollowing(userId: $userId, followingUserId: $followingUserId)
                  }
                  `,
      variables: {
        userId,
        followingUserId,
      },
    };

    await API({
      data: graphqlQuery,
    });
  },

  createFollowing: async (userId: string, followingUserId: string) => {
    const graphqlQuery = {
      query: `
                  mutation CreateFollowing($userId: ID!, $followingUserId: ID!){
                    createFollowing(userId: $userId, followingUserId: $followingUserId)
                  }
                  `,
      variables: {
        userId,
        followingUserId,
      },
    };

    return await API({
      data: graphqlQuery,
    });
  },

  fetchFollowingUsers: async (userId: string) => {
    const graphqlQuery = {
      query: `
              query GetFollowingUsers($userId: ID!){
                getFollowingUsers(userId: $userId){
                  id
                  name
                  imageUrl
                  isFollowing
                }
              }
              `,
      variables: {
        userId,
      },
    };

    return await API({
      data: graphqlQuery,
    });
  },
};
