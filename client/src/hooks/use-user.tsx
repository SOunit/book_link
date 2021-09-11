import axios from 'axios';
import { useState, useContext, useCallback, useEffect } from 'react';
import AuthContext from '../store/auth-context';
import UserType from '../models/User';

const useUser = () => {
  const [user, setUser] = useState<UserType>();
  const authCtx = useContext(AuthContext);

  const fetchUser = useCallback(async () => {
    const graphqlQuery = {
      query: `
              query FetchUser($id: ID!){
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
        id: authCtx.token,
      },
    };

    const result = await axios({
      url: '/api/graphql',
      method: 'post',
      data: graphqlQuery,
    });

    setUser(result.data.data.user);
  }, [authCtx.token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, setUser };
};

export default useUser;
