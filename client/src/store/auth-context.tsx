import axios from 'axios';
import React, { FC, useState } from 'react';
import keys from '../util/keys';

const AuthContext = React.createContext<{
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string | null) => void;
  logout: () => void;
}>({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider: FC = (props) => {
  const initialToken = localStorage.getItem(keys.TOKEN_KEY);
  const [token, setToken] = useState<string | null>(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem(keys.TOKEN_KEY);
  };

  const createNewUser = async (id: string) => {
    console.log('create new user', id);

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

    axios({
      url: keys.GRAPHQL_REQUEST_URL,
      method: 'post',
      data: graphqlQuery,
    });
  };

  const fetchUser = async (id: string) => {
    // check user
    const graphqlQuery = {
      query: `
          query FetchUser($id: ID!){
            getUserCount(id: $id)
          }
        `,
      variables: {
        id,
      },
    };

    return axios({
      url: keys.GRAPHQL_REQUEST_URL,
      method: 'post',
      data: graphqlQuery,
    });
  };

  const loginHandler = (token: string | null) => {
    setToken(token);
    if (token) {
      localStorage.setItem(keys.TOKEN_KEY, token);

      // check if user exists
      fetchUser(token).then((result) => {
        const amount = result.data.data.getUserCount;

        if (amount <= 0) {
          createNewUser(token);
        }
      });
    }
  };

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
