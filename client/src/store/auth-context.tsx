import React, { FC, useState } from 'react';

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
  const [token, setToken] = useState<string | null>(null);

  const userIsLoggedIn = !!token;

  const logoutHandler = () => {
    setToken(null);
  };

  const loginHandler = (token: string | null) => {
    setToken(token);
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
