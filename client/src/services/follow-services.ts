import { api as API } from './api';

export const followServices = {
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

  deleteFollowing: async (followingUserId: string, userId: string) => {
    const graphqlQuery = {
      query: `
                  mutation DeleteFollowing($userId: ID!, $followingUserId: ID!){
                    deleteFollowing(userId: $userId, followingUserId: $followingUserId)
                  }
                  `,
      variables: {
        followingUserId,
        userId,
      },
    };

    await API({
      data: graphqlQuery,
    });
  },

  createFollowing: async (followingUserId: string, userId: string) => {
    const graphqlQuery = {
      query: `
                  mutation CreateFollowing($userId: ID!, $followingUserId: ID!){
                    createFollowing(userId: $userId, followingUserId: $followingUserId)
                  }
                  `,
      variables: {
        followingUserId,
        userId,
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

  fetchFollowerUsers: async (userId: string) => {
    const graphqlQuery = {
      query: `
              query GetFollowerUsers($userId: ID!){
                getFollowerUsers(userId: $userId){
                  id
                  name
                  imageUrl
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
