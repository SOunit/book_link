import { FC, Fragment, useContext, useEffect } from 'react';
import { UserInfo } from '../../components/molecules';
import { EditUserForm } from '../../components/organisms';
import { AuthContext } from '../../../services/store';
import { useInitFollow } from '../../../application';
import { useFollowStorage } from '../../../services';

export const EditUser: FC = () => {
  const { loginUser } = useContext(AuthContext);
  const { initFollow, initIsLoaded } = useInitFollow();
  const { followings, followers, isFollowersLoaded, isFollowingsLoaded } =
    useFollowStorage();

  useEffect(() => {
    initIsLoaded();
  }, [initIsLoaded]);

  useEffect(() => {
    if (loginUser) {
      initFollow(loginUser.id, loginUser.id);
    }
  }, [loginUser, initFollow, isFollowersLoaded, isFollowingsLoaded]);

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
