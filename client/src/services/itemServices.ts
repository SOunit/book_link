import API from './api';

const userServices = {
  addUserItem: async (userId: string, itemId: string) => {
    const graphqlQuery = {
      query: `
              mutation AddUserItem($userId: ID!, $itemId: ID!){
                addUserItem(data: {userId: $userId, itemId: $itemId}){
                  id
                }
              }
              `,
      variables: {
        userId,
        itemId,
      },
    };

    return await API({
      data: graphqlQuery,
    });
  },

  deleteUserItem: async (userId: string, itemId: string) => {
    const graphqlQuery = {
      query: `
                mutation DeleteUserItem($userId: ID!, $itemId: ID!) {
                  deleteUserItem(data: {userId: $userId, itemId: $itemId}){
                    id
                  }
                }
              `,
      variables: {
        userId,
        itemId,
      },
    };

    return API({
      data: graphqlQuery,
    });
  },

  fetchItemsByTitle: async (title: string) => {
    const graphqlQuery = {
      query: `
              query fetchItems ($title: String){
                itemsByTitle(title: $title){
                  id
                  title
                  author
                  imageUrl
                }
              }
            `,
      variables: {
        title,
      },
    };

    return await API({
      data: graphqlQuery,
    });
  },
};

export default userServices;