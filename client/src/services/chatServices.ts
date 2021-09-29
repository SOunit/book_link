import API from './api';

const ChatServices = {
  fetchChat: async (userIds: string[]) => {
    const graphqlQuery = {
      query: `
              query GetUserChat($userIds: [ID!]!){
                getUserChat(userIds: $userIds){
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
