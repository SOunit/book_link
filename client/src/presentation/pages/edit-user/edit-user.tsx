import { FC, Fragment, useContext } from 'react';
import { UserInfo } from '../../components/molecules';
import { EditUserForm } from '../../components/organisms';
import { useFollow } from '../../../application/hooks';
import { AuthContext } from '../../../services/store';

export const EditUser: FC = () => {
  const { loginUser } = useContext(AuthContext);
  const { followings, followers } = useFollow(loginUser?.id, loginUser?.id);

  return (
    <Fragment>
      {loginUser && followers && followings && (
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
