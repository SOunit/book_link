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
};

export default services;
