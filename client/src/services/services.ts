import API from './api';

const services = {
  createUser: async (id: string) => {
    const graphqlQuery = {
      query: `
          mutation CreateUser($id: ID!){
            createUser(id: $id){
              id
              name
            }
          }
        `,
      variables: {
        id,
      },
    };

    API({
      data: graphqlQuery,
    });
  },

  getUserCount: async (id: string) => {
    // check user
    const graphqlQuery = {
      query: `
              query GetUserCount($id: ID!){
                getUserCount(id: $id)
              }
            `,
      variables: {
        id,
      },
    };

    return await API({
      data: graphqlQuery,
    });
  },

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

    return await API({
      data: graphqlQuery,
    });
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

  fetchUsersByItems: async (itemIds: string[], userId: string) => {
    const graphqlQuery = {
      query: `
              query fetchUsersByItems($itemIds: [String!]!, $userId: String!){
                getUsersByItems(itemIds: $itemIds, userId: $userId){
                  id
                  name
                  about
                  imageUrl
                }
              }
            `,
      variables: {
        itemIds,
        userId,
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

export default services;
