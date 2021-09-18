import { useState, useContext, useCallback, useEffect } from 'react';
import AuthContext from '../store/auth-context';
import UserType from '../models/User';
import services from '../services/services';

const useUser = () => {
  const [user, setUser] = useState<UserType>();
  const authCtx = useContext(AuthContext);

  const fetchUser = useCallback(() => {
    services.fetchUser(authCtx.token!).then((result) => {
      setUser(result.data.data.user);
    });
  }, [authCtx.token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { loginUser: user, setLoginUser: setUser };
};

export default useUser;
