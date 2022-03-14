import { FC, Fragment, useContext } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import {
  Buttons,
  NotFoundMessage,
  SectionTitle,
  UserCard,
} from '../../components/molecules';
import { IconButton } from '../../components/atoms';
import classes from './followings.module.css';
import { AuthContext } from '../../store';
import { useFollow } from '../../hooks';

type FollowingsProps = {};
type FollowingsParams = {
  userId: string;
};

export const Followings: FC<FollowingsProps> = () => {
  const params = useParams<FollowingsParams>();
  const history = useHistory();
  const { loginUser } = useContext(AuthContext);
  const { followUser, unFollowUser, followings, setFollowings } = useFollow(
    params.userId,
    loginUser?.id,
  );

  const followClickHandler = (targetUserId: string) => {
    if (followings && loginUser) {
      // update state
      const newFollowings = followings.map((user) => {
        if (user.id === targetUserId) {
          user.isFollowing = true;
        }
        return user;
      });
      setFollowings(newFollowings);

      // update db
      followUser(loginUser.id, targetUserId);
    }
  };

  const followingClickHandler = (targetUserId: string) => {
    if (followings && loginUser) {
      // update state
      const newFollowings = followings.map((user) => {
        if (user.id === targetUserId) {
          user.isFollowing = false;
        }
        return user;
      });

      setFollowings(newFollowings);

      // update db
      unFollowUser(loginUser.id, targetUserId);
    }
  };

  const detailClickHandler = (userId: string) => {
    history.push(`/users/${userId}`);
  };

  let followingUsers = null;
  if (followings) {
    followingUsers = followings.map((user) => {
      const buttons = (
        <Buttons>
          <IconButton
            iconName="fas fa-info"
            onClick={() => detailClickHandler(user.id)}
            className={classes['followings__info-icon']}
          />
          <IconButton
            iconName={user.isFollowing ? 'fa fa-user-minus' : 'fa fa-user-plus'}
            onClick={
              user.isFollowing
                ? () => followingClickHandler(user.id)
                : () => followClickHandler(user.id)
            }
          />
        </Buttons>
      );
      return (
        <UserCard
          user={user}
          actions={buttons}
          key={user.id}
          imageClassName={classes['followings__image']}
        />
      );
    });
  }

  return (
    <Fragment>
      <SectionTitle>Followings</SectionTitle>
      {followings && followings.length > 0 && followingUsers}
      {followings && followings.length <= 0 && (
        <NotFoundMessage title="" text="You are following nobody!" />
      )}
    </Fragment>
  );
};
