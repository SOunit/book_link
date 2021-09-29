import API from './api';

const ChatServices = {
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
};

export default ChatServices;
