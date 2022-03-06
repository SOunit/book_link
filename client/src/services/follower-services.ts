import { api as API } from './api';

export const followerServices = {
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

  deleteFollower: async (userId: string, followerUserId: string) => {
    const graphqlQuery = {
      query: `
                  mutation DeleteFollower($userId: ID!, $followerUserId: ID!){
                    deleteFollower(userId: $userId, followerUserId: $followerUserId)
                  }
                  `,
      variables: {
        userId,
        followerUserId,
      },
    };

    await API({
      data: graphqlQuery,
    });
  },

  createFollower: async (userId: string, followerUserId: string) => {
    const graphqlQuery = {
      query: `
                  mutation CreateFollower($userId: ID!, $followerUserId: ID!){
                    createFollower(userId: $userId, followerUserId: $followerUserId)
                  }
                  `,
      variables: {
        userId,
        followerUserId,
      },
    };

    return await API({
      data: graphqlQuery,
    });
  },
};
