import React, { FC, useCallback, useEffect, useState } from 'react';
import User from '../models/User';
import userServices from '../services/userServices';
import keys from '../util/keys';

// fetch token from local storage
// save it in context so that other component can use token
const AuthContext = React.createContext<{
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string | null) => void;
  logout: () => void;
  loginUser: User | null;
  setLoginUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  token: '',
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  loginUser: null,
  setLoginUser: () => {},
});

export const AuthContextProvider: FC = (props) => {
  const initialToken = localStorage.getItem(keys.TOKEN_KEY);
  const [token, setToken] = useState<string | null>(initialToken);
  const [loginUser, setLoginUser] = useState<User | null>(null);

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem(keys.TOKEN_KEY);
  };

  const createNewUser = async (id: string) => {
    return userServices.createUser(id);
  };

  const getUserCount = async (id: string) => {
    return userServices.getUserCount(id);
  };

  const loginHandler = useCallback((token: string | null) => {
    setToken(token);
    if (token) {
      localStorage.setItem(keys.TOKEN_KEY, token);

      // check if user exists
      getUserCount(token).then((result) => {
        const amount = result.data.data.getUserCount;

        if (amount <= 0) {
          createNewUser(token).then((response) => {
            // set new user to state
            console.log('response', response);

            setLoginUser({ ...response.data.data.createUser, items: [] });
          });
        } else {
          // fetch user
          userServices.fetchUser(token).then((response) => {
            setLoginUser(response.data.data.user);
          });
        }
      });
    }
  }, []);

  const contextValue = {
    token,
    isLoggedIn: userIsLoggedIn,
    loginUser,
    login: loginHandler,
    logout: logoutHandler,
    setLoginUser,
  };

  // auto login
  useEffect(() => {
    if (initialToken) {
      loginHandler(initialToken);
    }
  }, [initialToken, loginHandler]);

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
