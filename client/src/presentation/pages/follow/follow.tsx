import { FC, Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import {
  Buttons,
  NotFoundMessage,
  UserCard,
  FollowHeader,
} from '../../components/molecules';
import { IconButton } from '../../components/atoms';
import { useFollow } from '../../../application/hooks';
import classes from './follow.module.scss';
import { useUserUseCase } from '../../../application';
import { User } from '../../../domain';

type Props = {};
type FollowParams = {
  userId: string;
};

export const Follow: FC<Props> = () => {
  const params = useParams<FollowParams>();
  const { userId } = params;
  const history = useHistory();
  const { pathname } = useLocation();
  const userUseCase = useUserUseCase();
  const loginUser = userUseCase.getLoginUser();
  const [pageUser, setPageUser] = useState<User>();
  const {
    followers,
    followings,
    addFollowerUserToFollowers,
    removeFollowerUserFromFollowers,
    addFollowingUserToFollowings,
    removeFollowingUserFromFollowings,
    countFollowings,
  } = useFollow(params.userId, loginUser?.id);
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
    if (!pageUser) {
      userUseCase.getUser(userId).then((res) => {
        const user = res.data.data.user;
        setPageUser(user);
      });
    }
  }, [userUseCase, userId, pageUser]);

  useEffect(() => {
    if (followers && loginUser) {
      // following is true if login user exist in followers
      const isFollowing = followers.some(
        (follower) => follower.id === loginUser.id,
      );

      setIsPageUserFollowing(isFollowing);
    }
  }, [loginUser, followers]);

  let followerUsers = null;
  if (followers && loginUser && pageUser) {
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
                      removeFollowerUserFromFollowers(user, loginUser, pageUser)
                  : () =>
                      addFollowerUserToFollowers(
                        user,
                        loginUser,
                        pageUser,
                        loginUser,
                      )
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
                  ? () => removeFollowingUserFromFollowings(user)
                  : () => addFollowingUserToFollowings(user)
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
      {pageUser && loginUser && (
        <UserCard
          user={pageUser}
          imageClassName={classes['followers__image']}
          followersCount={followers?.length}
          followingsCount={
            pageUser.id !== loginUser.id
              ? followings?.length
              : countFollowings(followings)
          }
          actions={
            <Buttons>
              <IconButton
                iconName="fas fa-info"
                onClick={() => detailClickHandler(pageUser.id)}
                className={classes['followers__info-icon']}
              />
              {loginUser && loginUser.id !== pageUser.id && (
                <IconButton
                  iconName={
                    isPageUserFollowing ? 'fa fa-user-minus' : 'fa fa-user-plus'
                  }
                  onClick={
                    isPageUserFollowing
                      ? () => {
                          setIsPageUserFollowing(false);
                          removeFollowerUserFromFollowers(
                            pageUser,
                            loginUser,
                            pageUser,
                          );
                        }
                      : () => {
                          setIsPageUserFollowing(true);
                          addFollowerUserToFollowers(
                            pageUser,
                            loginUser,
                            pageUser,
                            loginUser,
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