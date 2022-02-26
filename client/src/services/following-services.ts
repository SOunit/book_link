import { api as API } from './api';

export const followingServices = {
  fetchFollowing: async (userId: string, targetId: string) => {
    const graphqlQuery = {
      query: `
              query fetchFollowing($userId: ID!, $targetId: ID!){
                following(userId: $userId, targetId: $targetId){
                  userId
                  targetId
                }
              }
            `,
      variables: {
        userId,
        targetId,
      },
    };

    return await API({
      data: graphqlQuery,
    });
  },

  deleteFollowing: async (userId: string, targetId: string) => {
    const graphqlQuery = {
      query: `
                  mutation DeleteFollowing($userId: ID!, $targetId: ID!){
                    deleteFollowing(userId: $userId, targetId: $targetId)
                  }
                  `,
      variables: {
        userId,
        targetId,
      },
    };

    await API({
      data: graphqlQuery,
    });
  },

  createFollowing: async (userId: string, targetId: string) => {
    const graphqlQuery = {
      query: `
                  mutation CreateFollowing($userId: ID!, $targetId: ID!){
                    createFollowing(userId: $userId, targetId: $targetId)
                  }
                  `,
      variables: {
        userId,
        targetId,
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
