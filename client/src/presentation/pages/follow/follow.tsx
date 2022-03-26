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
import {
  useCountFollowings,
  useUserUseCase,
  useFollowUserInFollowers,
  useUnFollowUserInFollowers,
  useUnFollowUserInFollowings,
  useFollowUserInFollowings,
  useFollowUserInPageUser,
  useUnFollowUserInPageUser,
} from '../../../application';
import { User } from '../../../domain';
import { useFollowStorage } from '../../../services';
import classes from './follow.module.scss';

type Props = {};
type FollowParams = {
  userId: string;
};

export const Follow: FC<Props> = () => {
  // hooks
  const params = useParams<FollowParams>();
  const history = useHistory();
  const { pathname } = useLocation();
  const { getLoginUser, getUser } = useUserUseCase();
  const { countFollowings } = useCountFollowings();
  const { followUserInFollowers } = useFollowUserInFollowers();
  const { unFollowUserInFollowers } = useUnFollowUserInFollowers();
  const { unFollowUserInFollowings } = useUnFollowUserInFollowings();
  const { followUserInFollowings } = useFollowUserInFollowings();
  const { followUserInPageUser } = useFollowUserInPageUser();
  const { unFollowUserInPageUser } = useUnFollowUserInPageUser();
  const followStorage = useFollowStorage();
  const [pageUser, setPageUser] = useState<User>();
  const [isPageUserFollowing, setIsPageUserFollowing] = useState<boolean>();

  // page state
  const { followers, followings } = followStorage;
  const loginUser = getLoginUser();
  const pathSegments = pathname.split('/');
  const [isFollowingsPage, setIsFollowingsPage] = useState(
    pathSegments.includes('followings'),
  );
  const { userId } = params;

  const detailClickHandler = (userId: string) => {
    history.push(`/users/${userId}`);
  };

  console.log('followers', followers);
  console.log('followings', followings);

  const followClickHandlerInFollowers = (
    user: User,
    loginUser: User,
    pageUser: User,
  ) => {
    console.log('followClickHandlerInFollowers');

    if (user.isFollowing) {
      unFollowUserInFollowers(loginUser, user);
    } else {
      followUserInFollowers(loginUser, user, pageUser, loginUser);
    }
  };

  const followClickHandlerInFollowings = (user: User, loginUser: User) => {
    if (user.isFollowing) {
      unFollowUserInFollowings(loginUser, user);
    } else {
      followUserInFollowings(loginUser, user);
    }
  };

  const followClickHandlerInPageUser = (pageUser: User, loginUser: User) => {
    if (isPageUserFollowing) {
      setIsPageUserFollowing(false);
      unFollowUserInPageUser(loginUser, pageUser);
    } else {
      setIsPageUserFollowing(true);
      followUserInPageUser(loginUser, pageUser);
    }
  };

  useEffect(() => {
    setIsFollowingsPage(pathSegments.includes('followings'));
  }, [pathSegments]);

  useEffect(() => {
    if (!pageUser) {
      getUser(userId).then((res) => {
        const user = res.data.data.user;
        setPageUser(user);
      });
    }
  }, [getUser, userId, pageUser]);

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
              onClick={() =>
                followClickHandlerInFollowers(user, loginUser, pageUser)
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
              onClick={() => followClickHandlerInFollowings(user, loginUser)}
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
                  onClick={() =>
                    followClickHandlerInPageUser(pageUser, loginUser)
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
