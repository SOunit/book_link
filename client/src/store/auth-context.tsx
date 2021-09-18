import React, { FC, useState } from 'react';
import services from '../services/services';
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
    services.createUser(id);
  };

  const getUserCount = async (id: string) => {
    return services.getUserCount(id);
  };

  const loginHandler = (token: string | null) => {
    setToken(token);
    if (token) {
      localStorage.setItem(keys.TOKEN_KEY, token);

      // check if user exists
      getUserCount(token).then((result) => {
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
