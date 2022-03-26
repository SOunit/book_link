import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { User } from '../../domain';
import { useUserAdapter } from '..';
import { keys } from '../../presentation/util';

// FIXME: move logic to application layer, createUser, getUser etc.
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
  const { createUser, getUserCount, fetchUser } = useUserAdapter();

  const logoutHandler = () => {
    setToken(null);
    setLoginUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem(keys.TOKEN_KEY!);
  };

  const loginHandler = useCallback(
    (token: string | null) => {
      setToken(token);
      if (token) {
        localStorage.setItem(keys.TOKEN_KEY!, token);
        setIsLoggedIn(true);

        // check if user exists
        getUserCount(token)
          .then((result) => {
            const amount = result.data.data.getUserCount;

            if (amount <= 0) {
              createUser(token).then((response) => {
                // set new user to state
                setLoginUser({ ...response.data.data.createUser, items: [] });
              });
            } else {
              // fetch user
              fetchUser(token).then((response) => {
                setLoginUser(response.data.data.user);
              });
            }
          })
          .catch((err) => {
            console.log('loginHandler err', err);
          });
      }
    },
    [createUser, getUserCount, fetchUser],
  );

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
