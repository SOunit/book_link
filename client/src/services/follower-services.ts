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
};
