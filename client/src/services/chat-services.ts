import { api as API } from './api';

export const ChatServices = {
  fetchChat: async (userIds: string[]) => {
    const graphqlQuery = {
      query: `
              query GetUserChat($userIds: [ID!]!){
                getUserChat(userIds: $userIds){
                  id
                  users{
                    id
                    name
                    imageUrl
                  }
                  messages{
                    id
                    chatId
                    userId
                    text
                    createdAt
                  }
                }
              }
            `,
      variables: {
        userIds,
      },
    };

    return await API({
      data: graphqlQuery,
    });
  },

  fetchChatList: async (userId: string) => {
    const graphqlQuery = {
      query: `
              query GetUserChatList($userId: ID!){
                getUserChatList(userId: $userId){
                  id
                  users{
                    id
                    name
                    imageUrl
                  }
                  messages{
                    id
                    userId
                    text
                    createdAt
                  }
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

  createChat: async (userId: string, targetId: string) => {
    const graphqlQuery = {
      query: `
              mutation CreateChat($targetId: ID!, $userId: ID!){
                createChat(targetId: $targetId, userId: $userId)
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

  createMessage: async (chatId: string, userId: string, text: string) => {
    const graphqlQuery = {
      query: `
              mutation CreateMessage($chatId: ID!, $userId: ID!, $text: String!){
                createMessage(chatId: $chatId, userId: $userId, text: $text){
                  id
                  chatId
                  userId
                  text
                }
              }
            `,
      variables: {
        chatId,
        userId,
        text,
      },
    };

    return await API({
      data: graphqlQuery,
    });
  },
};
