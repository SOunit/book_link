import { useState, useContext, useCallback, useEffect } from 'react';
import AuthContext from '../store/auth-context';
import UserType from '../models/User';
import userServices from '../services/userServices';

const useUser = () => {
  const [user, setUser] = useState<UserType>();
  const authCtx = useContext(AuthContext);

  const fetchUser = useCallback(() => {
    userServices.fetchUser(authCtx.token!).then((result) => {
      setUser(result.data.data.user);
    });
  }, [authCtx.token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { loginUser: user, setLoginUser: setUser };
};

export default useUser;
