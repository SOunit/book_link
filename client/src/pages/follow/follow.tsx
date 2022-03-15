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
  const [isFollowings, setIsFollowings] = useState(
    pathSegments.includes('followings'),
  );

  const detailClickHandler = (userId: string) => {
    history.push(`/users/${userId}`);
  };

  useEffect(() => {
    setIsFollowings(pathSegments.includes('followings'));
  }, [pathSegments]);

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
          <IconButton
            iconName={user.isFollowing ? 'fa fa-user-minus' : 'fa fa-user-plus'}
            onClick={
              user.isFollowing
                ? () =>
                    unFollowUserInFollowers(
                      user.id,
                      loginUser.id,
                      params.userId,
                    )
                : () =>
                    followUserInFollowers(user.id, loginUser.id, params.userId)
            }
          />
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
          <IconButton
            iconName={user.isFollowing ? 'fa fa-user-minus' : 'fa fa-user-plus'}
            onClick={
              user.isFollowing
                ? () => unFollowUserInFollowings(user.id)
                : () => followUserInFollowings(user.id)
            }
          />
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
            </Buttons>
          }
        />
      )}
      <FollowHeader userId={params.userId} />
      {!isFollowings && followers && followers.length > 0 && followerUsers}
      {!isFollowings && followers && followers.length <= 0 && (
        <NotFoundMessage title="" text="Nobody is following you!" />
      )}
      {isFollowings && followings && followings.length > 0 && followingUsers}
      {isFollowings && followings && followings.length <= 0 && (
        <NotFoundMessage title="" text="You are following nobody!" />
      )}
    </Fragment>
  );
};
