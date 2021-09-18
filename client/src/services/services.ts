import API from './api';

const services = {
  fetchUser: async (userId: string) => {
    const graphqlQuery = {
      query: `
                query fetchUser($id: ID!){
                  user(id: $id){
                    id
                    name
                    about
                    imageUrl
                    items{
                      id
                      title
                      imageUrl
                    }
                  }
                }
              `,
      variables: {
        id: userId,
      },
    };

    const data = await API({
      data: graphqlQuery,
    });

    return data;
  },

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

    const result = await API({
      data: graphqlQuery,
    });

    return result;
  },
};

export default services;
