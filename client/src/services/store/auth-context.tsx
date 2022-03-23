import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { User } from '../../models';
import { userServices } from '..';
import { keys } from '../../util';

// 1. this logic is implementation of 3rd party library redux
// 2. this logic depends on 3rd party library redux
// so this logic belongs to services

// FIXME
// 1. review logic
// 2. make this to reducer?
type AuthContextType = {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string | null) => void;
  logout: () => void;
  loginUser: User | null;
  updateLoginUser: (user: User | null) => void;
};

export const AuthContext = React.createContext<AuthContextType>({
  token: '',
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  loginUser: null,
  updateLoginUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider: FC = (props) => {
  const initialToken = localStorage.getItem(keys.TOKEN_KEY!);
  const [token, setToken] = useState<string | null>(initialToken);
  const [loginUser, setLoginUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const logoutHandler = () => {
    setToken(null);
    setLoginUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem(keys.TOKEN_KEY!);
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
      localStorage.setItem(keys.TOKEN_KEY!, token);
      setIsLoggedIn(true);

      // check if user exists
      getUserCount(token)
        .then((result) => {
          const amount = result.data.data.getUserCount;

          if (amount <= 0) {
            createNewUser(token).then((response) => {
              // set new user to state
              setLoginUser({ ...response.data.data.createUser, items: [] });
            });
          } else {
            // fetch user
            userServices.fetchUser(token).then((response) => {
              setLoginUser(response.data.data.user);
            });
          }
        })
        .catch((err) => {
          console.log('loginHandler err', err);
        });
    }
  }, []);

  const updateLoginUser = (user: User | null) => {
    setLoginUser((prevState) => ({ ...prevState!, ...user }));
  };

  const contextValue = {
    token,
    isLoggedIn,
    loginUser,
    login: loginHandler,
    logout: logoutHandler,
    updateLoginUser,
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
