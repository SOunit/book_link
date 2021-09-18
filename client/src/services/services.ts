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

  updateUser: async (
    id: string,
    name: string,
    about: string,
    imageUrl: string
  ) => {
    const graphqlQuery = {
      query: `
              mutation UpdateUser($id: ID!, $name: String!, $about: String!, $imageUrl: String!){
                updateUser(data: {
                  id: $id
                  name: $name
                  about: $about
                  imageUrl: $imageUrl
                }){
                  id
                }
              }
            `,
      variables: {
        id,
        name,
        about,
        imageUrl,
      },
    };

    return await API({
      data: graphqlQuery,
    });
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

export default services;
