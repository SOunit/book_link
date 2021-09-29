import API from './api';

const ChatServices = {
  fetchChat: async (userIds: string[]) => {
    const graphqlQuery = {
      query: `
              query GetUserChats($userIds: [ID!]!){
                getUserChats(userIds: $userIds){
                  id
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
};

export default ChatServices;
