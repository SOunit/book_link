import { FC, Fragment, useContext } from 'react';
import { UserInfo } from '../../components/molecules';
import { EditUserForm } from '../../components/organisms';
import { useFollow } from '../../hooks';
import { AuthContext } from '../../store';

export const EditUser: FC = () => {
  const { loginUser } = useContext(AuthContext);
  const { followings, followers } = useFollow(loginUser);

  return (
    <Fragment>
      {loginUser && (
        <UserInfo
          user={loginUser}
          followersCount={followers.length}
          followingsCount={followings.length}
        />
      )}
      {loginUser && <EditUserForm />}
    </Fragment>
  );
};
