import { FC, Fragment, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Buttons,
  NotFoundMessage,
  UserCard,
  FollowHeader,
} from '../../components/molecules';
import { IconButton } from '../../components/atoms';
import { AuthContext } from '../../store';
import { useFollow, useUser } from '../../hooks';
import classes from './follow.module.scss';

type FollowProps = {};
type FollowParams = {
  userId: string;
};

export const Follow: FC<FollowProps> = () => {
  const params = useParams<FollowParams>();
  const history = useHistory();
  const { loginUser } = useContext(AuthContext);
  const {
    followers,
    followings,
    followUserInFollowers,
    unFollowUserInFollowers,
    followUserInFollowings,
    unFollowUserInFollowings,
  } = useFollow(params.userId, loginUser?.id);
  const { user } = useUser(params.userId);
  const { pathname } = useLocation();
  const pathSegments = pathname.split('/');
  const [isFollowingsPage, setIsFollowingsPage] = useState(
    pathSegments.includes('followings'),
  );
  const [isPageUserFollowing, setIsPageUserFollowing] = useState<boolean>();

  const detailClickHandler = (userId: string) => {
    history.push(`/users/${userId}`);
  };

  useEffect(() => {
    setIsFollowingsPage(pathSegments.includes('followings'));
  }, [pathSegments]);

  useEffect(() => {
    if (followers && loginUser) {
      const isFollowing = followers.some(
        (follower) => follower.id === loginUser.id && follower.isFollowing,
      );

      setIsPageUserFollowing(isFollowing);
    }
  }, [loginUser, followers]);

  console.log('isPageUserFollowing', isPageUserFollowing);
  console.log('followings', followings);
  console.log('followers', followers);

  let followerUsers = null;
  if (followers && loginUser) {
    followerUsers = followers.map((user) => {
      const buttons = (
        <Buttons>
          <IconButton
            iconName="fas fa-info"
            onClick={() => detailClickHandler(user.id)}
            className={classes['followers__info-icon']}
          />
          {loginUser.id !== user.id && (
            <IconButton
              iconName={
                user.isFollowing ? 'fa fa-user-minus' : 'fa fa-user-plus'
              }
              onClick={
                user.isFollowing
                  ? () =>
                      unFollowUserInFollowers(user.id, loginUser, params.userId)
                  : () =>
                      followUserInFollowers(user.id, loginUser, params.userId)
              }
            />
          )}
        </Buttons>
      );
      return (
        <UserCard
          user={user}
          actions={buttons}
          key={user.id}
          imageClassName={classes['followers__image']}
        />
      );
    });
  }

  let followingUsers = null;
  if (followings && loginUser) {
    followingUsers = followings.map((user) => {
      const buttons = (
        <Buttons>
          <IconButton
            iconName="fas fa-info"
            onClick={() => detailClickHandler(user.id)}
            className={classes['followers__info-icon']}
          />
          {loginUser.id !== user.id && (
            <IconButton
              iconName={
                user.isFollowing ? 'fa fa-user-minus' : 'fa fa-user-plus'
              }
              onClick={
                user.isFollowing
                  ? () => unFollowUserInFollowings(user.id)
                  : () => followUserInFollowings(user.id)
              }
            />
          )}
        </Buttons>
      );
      return (
        <UserCard
          user={user}
          actions={buttons}
          key={user.id}
          imageClassName={classes['followers__image']}
        />
      );
    });
  }

  return (
    <Fragment>
      {user && (
        <UserCard
          user={user}
          imageClassName={classes['followers__image']}
          actions={
            <Buttons>
              <IconButton
                iconName="fas fa-info"
                onClick={() => detailClickHandler(user.id)}
                className={classes['followers__info-icon']}
              />
              {loginUser && loginUser.id !== user.id && (
                <IconButton
                  iconName={
                    isPageUserFollowing ? 'fa fa-user-minus' : 'fa fa-user-plus'
                  }
                  onClick={
                    isPageUserFollowing
                      ? () => {
                          console.log(
                            'setIsPageUserFollowing true',
                            isPageUserFollowing,
                          );
                          setIsPageUserFollowing(false);

                          unFollowUserInFollowers(
                            user.id,
                            loginUser,
                            params.userId,
                          );
                        }
                      : () => {
                          console.log(
                            'setIsPageUserFollowing false',
                            isPageUserFollowing,
                          );
                          setIsPageUserFollowing(true);

                          followUserInFollowers(
                            user.id,
                            loginUser,
                            params.userId,
                          );
                        }
                  }
                />
              )}
            </Buttons>
          }
        />
      )}
      <FollowHeader userId={params.userId} />
      {!isFollowingsPage && followers && followers.length > 0 && followerUsers}
      {!isFollowingsPage && followers && followers.length <= 0 && (
        <NotFoundMessage title="" text="Nobody is following you!" />
      )}
      {isFollowingsPage &&
        followings &&
        followings.length > 0 &&
        followingUsers}
      {isFollowingsPage && followings && followings.length <= 0 && (
        <NotFoundMessage title="" text="You are following nobody!" />
      )}
    </Fragment>
  );
};
