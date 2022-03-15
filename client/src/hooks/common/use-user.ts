import { useEffect, useState } from 'react';
import { User } from '../../models';
import { userServices } from '../../services';

export const useUser = (userId: string) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    userServices
      .fetchUser(userId)
      .then((res) => {
        setUser(res.data.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  return { user, setUser };
};
